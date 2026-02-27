import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonButton, IonIcon, IonInput, IonButtons, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, add, pencilOutline } from 'ionicons/icons';
import { DataService } from '../../services/data.service';
import { Category, Task } from '../../models/task.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonInput
  ],
})
export class CategoriesPage {
  categories: Category[] = [];
  tasks: Task[] = [];
  newCategoryName: string = '';

  private dataService = inject(DataService);
  private alertCtrl = inject(AlertController);

  constructor() {
    addIcons({ trashOutline, add, pencilOutline });
  }

  async ionViewWillEnter() {
    this.categories = await this.dataService.getCategories();
    this.tasks = await this.dataService.getTasks();
  }

  async addCategory() {
    if (!this.newCategoryName.trim()) return;
    const newCat: Category = { id: Date.now(), name: this.newCategoryName.trim() };
    this.categories.push(newCat);
    this.newCategoryName = '';
    await this.dataService.saveCategories(this.categories);
  }

  async editCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: category.name,
          placeholder: 'Nombre de la categoría'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.name && data.name.trim()) {
              category.name = data.name.trim();
              await this.dataService.saveCategories(this.categories);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCategory(category: Category) {
    this.categories = this.categories.filter(c => c.id !== category.id);
    await this.dataService.saveCategories(this.categories);

    // Limpiar tareas que tenían esta categoría asignada
    let tasksChanged = false;
    this.tasks.forEach(t => {
      if (t.categoryId === category.id) {
        delete t.categoryId;
        tasksChanged = true;
      }
    });

    if (tasksChanged) {
      await this.dataService.saveTasks(this.tasks);
    }
  }
}
