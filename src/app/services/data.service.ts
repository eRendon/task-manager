import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '@/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _storage: Storage | null = null;
    private readonly TASKS_KEY = 'my-tasks';

    constructor(private storage: Storage) {
      this.init();
    }

    async init() {
      const storage = await this.storage.create();
      this._storage = storage;
    }

    async getTasks(): Promise<Task[]> {
      const tasks = await this._storage?.get(this.TASKS_KEY);
      return tasks || [];
    }

    async saveTasks(tasks: Task[]) {
      await this._storage?.set(this.TASKS_KEY, tasks);
    }
}
