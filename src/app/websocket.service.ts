import { Injectable } from '@angular/core';

import io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  constructor() {}

  connect() {
    return io('http://localhost:5000');
  }
}
