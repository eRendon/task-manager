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

  /**
   * Inicializa el servicio de almacenamiento.
   */
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Obtiene la lista de tareas almacenadas.
   * @returns Un array de tareas.
   */
  async getTasks(): Promise<Task[]> {
    const tasks = await this._storage?.get(this.TASKS_KEY);
    if (tasks) {
      // Migración: asegurar que todas las tareas tengan estado
      return tasks.map((t: any) => ({ ...t, status: t.status || (t.completed ? 'closed' : 'new') }));
    }
    return [];
  }

  /**
   * Guarda una lista de tareas en el almacenamiento.
   * @param tasks La lista de tareas a guardar.
   */

  async saveTasks(tasks: Task[]) {
    await this._storage?.set(this.TASKS_KEY, tasks);
  }

  /**
 * Obtiene la lista de categorías almacenadas.
 * @returns Un array de categorías.
 */

  async getCategories(): Promise<Category[]> {
    const categories = await this._storage?.get(this.CATEGORIES_KEY);
    return categories || [];
  }

  /**
   * Guarda una lista de categorías en el almacenamiento.
   * @param categories La lista de categorías a guardar.
   */

  async saveCategories(categories: Category[]) {
    await this._storage?.set(this.CATEGORIES_KEY, categories);
  }
}
