import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonContent, IonFab, IonFabButton, IonIcon, ModalController, IonSearchbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, add, createOutline, menuOutline, searchOutline, notificationsOutline, ellipsisHorizontalOutline, closeOutline } from 'ionicons/icons';
import { DataService } from '../../services/data.service';
import { Task, Category, TaskStatus, TaskModel } from '../../models/task.model';
import { TaskComponent } from '../../components/task/task.component';
import { TaskEditComponent } from '@/components/task-edit/task-edit.component';
import { TaskDetailComponent } from '@/components/task-detail/task-detail.component';
import { RemoteConfigService } from '@/services/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonContent, IonFab, IonFabButton, IonIcon, TaskComponent, IonSearchbar
  ],
})
export class HomePage {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];

  showSearch: boolean = false;
  searchQuery: string = '';
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

  editingTask: Task | null = null;
  detailTask: Task | null = null;
  private dataService: DataService = inject(DataService);
  private remoteConfigService: RemoteConfigService = inject(RemoteConfigService);
  private modalCtrl: ModalController = inject(ModalController);
  showAddTaskButton: boolean = true;

  constructor() {
    addIcons({ trashOutline, add, createOutline, menuOutline, searchOutline, notificationsOutline, ellipsisHorizontalOutline, closeOutline });
  }

  async ionViewWillEnter() {
    this.tasks = await this.dataService.getTasks();
    this.categories = await this.dataService.getCategories();
    await this.remoteConfigService.initialize();
    this.showAddTaskButton = this.remoteConfigService.getEnableAddTask();
    this.applyFilter();
  }

  setActiveStatus(status: TaskStatus) {
    this.activeStatus = status;
  }

  async addTask(): Promise<void> {
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
    await this.dataService.saveTasks(this.tasks);
    this.applyFilter();
  }

  /** Cambia el estado de una tarea y actualiza su estado de completado en consecuencia.
   * @param task La tarea a actualizar.
   */
  async onStatusChange(task: Task): Promise<void> {
    task.completed = task.status === 'closed';
    await this.dataService.saveTasks(this.tasks);
  }

  /** Elimina una tarea de la lista y actualiza el almacenamiento.
   * @param task La tarea a eliminar.
   */
  async deleteTask(task: Task): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    await this.dataService.saveTasks(this.tasks);
    this.applyFilter();
  }

  /** Abre el modal de edición para una tarea existente.
   * @param task La tarea a editar.
   */
  async openEditTask(task: Task): Promise<void> {
    const modelEdit = await this.modalCtrl.create({
      component: TaskEditComponent,
      componentProps: {
        task,
        categories: this.categories,
      },
    })

    await modelEdit.present();

    const { data } = await modelEdit.onWillDismiss();
    if (data?.task) {
      this.editingTask = data.task;
      this.saveEdit();
    }
  }

  /** Abre el modal para crear una nueva tarea. */
  async openCreateTask(): Promise<void> {
    const modalCreate = await this.modalCtrl.create({
      component: TaskEditComponent,
      componentProps: {
        categories: this.categories,
      },
    })

    await modalCreate.present();

    const { data } = await modalCreate.onWillDismiss();
    if (data?.task) {
      this.editingTask = data.task;
      this.addTask();
    }
  }

  /** Guarda los cambios realizados en una tarea editada. */
  async saveEdit(): Promise<void> {
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
  }

  /** Aplica los filtros de categoría y búsqueda a la lista de tareas. */
  applyFilter(): void {
    let tasks = [...this.tasks];

    // Filtro por categoría
    if (this.filterCategoryId) {
      tasks = tasks.filter(t => t.categoryId === this.filterCategoryId);
    }

    // Filtro por búsqueda (ID)
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      tasks = tasks.filter(t => t.id.toString().includes(this.searchQuery));
    }

    this.filteredTasks = tasks;
  }

  /** Cierra el modal de búsqueda. */
  closeSearch(): void {
    this.showSearch = false;
    this.searchQuery = '';
    this.applyFilter();
  }

  /** Obtiene el nombre de una categoría por su ID. */
  getCategoryName(id?: number): string {
    if (!id) return '';
    return this.categories.find(c => c.id === id)?.name || '';
  }

  /** Obtiene las tareas de un estado específico. */
  getTasksByStatus(status: TaskStatus): Task[] {
    return this.filteredTasks.filter(t => t.status === status);
  }

  /** Obtiene el color de un estado de tarea. */
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

  /** Abre el modal de detalle de una tarea. */
  async openDetailTask(task: Task): Promise<void> {
    const modalDetail = await this.modalCtrl.create({
      component: TaskDetailComponent,
      componentProps: {
        task,
        categories: this.categories
      }
    });
    await modalDetail.present()
    const { data } = await modalDetail.onWillDismiss();
    if (data?.task) {
      this.editingTask = data.task;
      this.saveEdit();
    }
  }
}
