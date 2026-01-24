import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly STORAGE_KEY = 'SERVER_IP';

  setIp(ip: string): void {
    localStorage.setItem(this.STORAGE_KEY, ip);
  }

  getIp(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  getApiBaseUrl(): string {
    const ip = this.getIp();
    return ip ? `http://${ip}` : '';
  }

  clearIp(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
