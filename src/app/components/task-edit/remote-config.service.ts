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

  async initialize(): Promise<void> {
    await fetchAndActivate(this.remoteConfig);
  }

  getEnableAddTask(): boolean {
    return getBoolean(this.remoteConfig, 'enable_add_task');
  }
}
