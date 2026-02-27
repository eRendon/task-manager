import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { Task, Category } from '../../models/task.model';
import { IonChip } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonChip ]
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() categories: Category[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() detail = new EventEmitter<Task>();

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  getCategoryName(id?: number): string {
    if (!id) return '';
    return this.categories.find(c => c.id === id)?.name || '';
  }
}
