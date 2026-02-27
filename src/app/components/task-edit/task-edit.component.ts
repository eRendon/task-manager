import { Component, inject, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, ModalController, IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkOutline, chevronDownOutline, gridOutline, leaf } from 'ionicons/icons';
import { Task, Category, TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon,
    IonItem, IonList, IonSelect, IonSelectOption
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent implements OnInit{
  @Input() task?: Task;
  @Input() categories: Category[] = [];

  private modalCtrl: ModalController = inject(ModalController);

  model = new TaskModel({
    title: '',
    description: '',
    completed: false,
    status: 'new',
    priority: 'medium'
  });

  constructor() {
    addIcons({ arrowBackOutline, checkmarkOutline, chevronDownOutline, gridOutline, leaf });
  }

  ngOnInit(): void {
    if (this.task) {
      this.model = new TaskModel({...this.task});
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({
      task: this.model
    });
  }

}
