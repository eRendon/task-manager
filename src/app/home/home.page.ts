import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonCheckbox,
  IonButton, IonIcon, IonInput, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, add } from 'ionicons/icons';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon, IonInput, IonButtons],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private dataService: DataService) {
    addIcons({ trashOutline, add });
  }

  async ngOnInit() {
    this.tasks = await this.dataService.getTasks();
  }

  async addTask() {
    if (!this.newTaskTitle.trim()) return;
    const newTask: Task = { id: Date.now(), title: this.newTaskTitle, completed: false };
    this.tasks.push(newTask);
    this.newTaskTitle = '';
    await this.dataService.saveTasks(this.tasks);
  }

  async toggleTask(task: Task) {
    await this.dataService.saveTasks(this.tasks);
  }

  async deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    await this.dataService.saveTasks(this.tasks);
  }
}
