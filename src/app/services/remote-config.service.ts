import { Injectable, inject } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getBoolean } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  private remoteConfig = inject(RemoteConfig);

  constructor() {
    // Configuración opcional: intervalo de actualización mínimo
    this.remoteConfig.settings.minimumFetchIntervalMillis = 300000; // 5 minutos
  }

  /**
   * Inicializa la configuración remota.
   */

  async initialize(): Promise<void> {
    await fetchAndActivate(this.remoteConfig);
  }

  /**
   * Obtiene el valor de una configuración booleana.
   * @param key La clave de la configuración a obtener.
   * @returns El valor booleano de la configuración.
   */
  getEnableAddTask(): boolean {
    return getBoolean(this.remoteConfig, 'enable_add_task');
  }
}
