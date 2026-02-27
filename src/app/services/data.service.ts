import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task, Category } from '@/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _storage: Storage | null = null;
    private readonly TASKS_KEY = 'my-tasks';
  private readonly CATEGORIES_KEY = 'my-categories';

    constructor(private storage: Storage) {
      this.init();
    }

    async init() {
      const storage = await this.storage.create();
      this._storage = storage;
    }

    async getTasks(): Promise<Task[]> {
      const tasks = await this._storage?.get(this.TASKS_KEY);
      if (tasks) {
        // Migración: asegurar que todas las tareas tengan estado
        return tasks.map((t: any) => ({ ...t, status: t.status || (t.completed ? 'closed' : 'new') }));
      }
      return [];
    }

    async saveTasks(tasks: Task[]) {
      await this._storage?.set(this.TASKS_KEY, tasks);
    }

  async getCategories(): Promise<Category[]> {
    const categories = await this._storage?.get(this.CATEGORIES_KEY);
    return categories || [];
  }

  async saveCategories(categories: Category[]) {
    await this._storage?.set(this.CATEGORIES_KEY, categories);
  }
}
