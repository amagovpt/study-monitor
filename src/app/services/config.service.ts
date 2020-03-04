import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  getServer(service: string): string {
    return 'http://localhost:3000' + service;
  }
}
