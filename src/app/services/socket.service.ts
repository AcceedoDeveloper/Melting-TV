import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://103.5.113.101:9006/', {   
      transports: ['websocket'],               
      upgrade: false
    });

    this.socket.on('connect', () => {
      console.log(' Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log(' Socket disconnected');
    });
  }

  on<T>(event: string): Observable<T> {
    return new Observable(observer => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
      });
      return () => this.socket.off(event);
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
