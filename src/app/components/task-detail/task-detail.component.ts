import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonFooter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkOutline, chevronDownOutline, gridOutline, chevronForwardOutline, calendarOutline, createOutline, pricetagOutline, addOutline, personOutline, sendOutline } from 'ionicons/icons';
import { Task, Category } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonFooter],
})
export class TaskDetailComponent {
  @Input() task!: Task;
  @Input() categories: Category[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  constructor() {
    addIcons({ arrowBackOutline, checkmarkOutline, chevronDownOutline, gridOutline, chevronForwardOutline, calendarOutline, createOutline, pricetagOutline, addOutline, personOutline, sendOutline });
  }
}
