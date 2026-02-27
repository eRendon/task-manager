import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonFooter, ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkOutline, chevronDownOutline, gridOutline, chevronForwardOutline, calendarOutline, createOutline, pricetagOutline, addOutline, personOutline, sendOutline } from 'ionicons/icons';
import { Task, Category, TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonFooter
  ]
})
export class TaskDetailComponent implements OnInit {
  @Input() task!: Task;
  @Input() categories: Category[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  private modalCtrl: ModalController = inject(ModalController);

  model = new TaskModel({});

  constructor() {
    addIcons({ arrowBackOutline, checkmarkOutline, chevronDownOutline, gridOutline, chevronForwardOutline, calendarOutline, createOutline, pricetagOutline, addOutline, personOutline, sendOutline });
  }

  ngOnInit(): void {
    this.model = new TaskModel({...this.task});
  }


  closeModal(): void {
    this.modalCtrl.dismiss({
      task: this.model
    });
  }

  closeWithoutSave(): void {
    this.modalCtrl.dismiss();
  }

  getCategoryName(id?: number): string {
    if (!id) return '';
    return this.categories.find(c => c.id === id)?.name || '';
  }
}
