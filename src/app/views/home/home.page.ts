import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonContent, IonFab, IonFabButton, IonIcon, ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, add, createOutline, menuOutline, searchOutline, notificationsOutline, ellipsisHorizontalOutline } from 'ionicons/icons';
import { DataService } from '../../services/data.service';
import { Task, Category, TaskStatus, TaskModel } from '../../models/task.model';
import { TaskComponent } from '../../components/task/task.component';
import { TaskEditComponent } from '@/components/task-edit/task-edit.component';
import { TaskDetailComponent } from '@/components/task-detail/task-detail.component';
import { RemoteConfigService } from '@/components/task-edit/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader,   IonContent, IonFab, IonFabButton, IonIcon, TaskComponent
  ],
})
export class HomePage {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];

  newTaskTitle: string = '';
  selectedCategoryId: number | null = null; // Para nueva tarea
  filterCategoryId: number | null = null;   // Para filtrar lista

  activeStatus: TaskStatus = 'new'; // Estado activo para las pestañas

  columns: { value: TaskStatus, label: string }[] = [
    { value: 'backlog', label: 'Backlog' },
    { value: 'new', label: 'Nuevo' },
    { value: 'active', label: 'Activo' },
    { value: 'impediment', label: 'Impedimento' },
    { value: 'closed', label: 'Cerrado' }
  ];

  isModalOpen: boolean = false;
  editingTask: Task | null = null;
  isDetailModal: boolean = false; // Para diferenciar entre edición y detalle
  detailTask: Task | null = null;
  private dataService: DataService = inject(DataService);
  private remoteConfigService: RemoteConfigService = inject(RemoteConfigService);
  private modalCtrl: ModalController = inject(ModalController);
  showAddTaskButton: boolean = true;

  constructor() {
    addIcons({ trashOutline, add, createOutline, menuOutline, searchOutline, notificationsOutline, ellipsisHorizontalOutline });
  }

  async ionViewWillEnter() {
    this.tasks = await this.dataService.getTasks();
    this.categories = await this.dataService.getCategories();
    await this.remoteConfigService.initialize();
    this.showAddTaskButton = this.remoteConfigService.getEnableAddTask();
    console.log('showAddTaskButton', this.showAddTaskButton)
    this.applyFilter();
  }

  setActiveStatus(status: TaskStatus) {
    this.activeStatus = status;
  }

  async addTask() {
    // Usamos editingTask para crear también
    if (!this.editingTask || !this.editingTask.title!.trim()) return;

    const newTask = new TaskModel({
      title: this.editingTask.title,
      completed: false,
      categoryId: this.selectedCategoryId ?? undefined,
      status: 'new'
    })

    this.tasks.push(newTask);
    this.newTaskTitle = '';
    this.editingTask = null;
    this.isModalOpen = false;
    await this.dataService.saveTasks(this.tasks);
    this.applyFilter();
  }

  async toggleTask(task: Task) {
    task.status = task.completed ? 'closed' : 'active';
    await this.dataService.saveTasks(this.tasks);
  }

  async onStatusChange(task: Task) {
    task.completed = task.status === 'closed';
    await this.dataService.saveTasks(this.tasks);
  }

  async deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    await this.dataService.saveTasks(this.tasks);
    this.applyFilter();
  }

  async openEditTask(task: Task) {
    const modelEdit = await this.modalCtrl.create({
      component: TaskEditComponent,
      componentProps: {
        task,
        categories: this.categories,
      },
    })

    await modelEdit.present();

    const { data } = await modelEdit.onWillDismiss();
    console.log('openEditTask', data)
    if (data?.task) {
      this.editingTask = data.task;
      this.saveEdit();
    }
  }

  async openCreateTask() {
    const modalCreate = await this.modalCtrl.create({
      component: TaskEditComponent,
      componentProps: {
        categories: this.categories,
        close: (event: Task) => {
          console.log('openCreateTask', event)
        }
      },
    })

    await modalCreate.present();

    const { data } = await modalCreate.onWillDismiss();
    console.log('openCreateTask', data)
    if (data?.task) {
      this.editingTask = data.task;
      this.addTask();
    }
  }


  async saveEdit() {
    if (!this.editingTask) return;

    if (this.editingTask.id === '0') {
      this.addTask();
      return;
    }

    const index = this.tasks.findIndex(t => t.id === this.editingTask!.id);
    if (index !== -1) {
      this.tasks[index] = this.editingTask;
      await this.dataService.saveTasks(this.tasks);
      this.applyFilter();
    }
    this.isModalOpen = false;
    this.editingTask = null;
  }

  applyFilter() {
    if (this.filterCategoryId) {
      this.filteredTasks = this.tasks.filter(t => t.categoryId === this.filterCategoryId);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  getCategoryName(id?: number): string {
    if (!id) return '';
    return this.categories.find(c => c.id === id)?.name || '';
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.filteredTasks.filter(t => t.status === status);
  }

  getStatusColor(status: TaskStatus): string {
    switch (status) {
      case 'backlog': return 'medium';
      case 'new': return 'bg-blue-500';
      case 'active': return 'tertiary';
      case 'impediment': return 'warning';
      case 'closed': return 'success';
      default: return 'medium';
    }
  }

  closeDetail() {
    this.isDetailModal = false;
    this.editingTask = null;
  }

  async openDetailTask(task: Task) {
    const modalDetail = await this.modalCtrl.create({
      component: TaskDetailComponent,
      componentProps: {
        task,
        categories: this.categories,
        close: (event: Task) => {
          console.log(event)
        }
      }
    });
    await modalDetail.present()
  }
}
