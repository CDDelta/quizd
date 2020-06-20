import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  canShare(): boolean {
    return !!navigator.share;
  }

  async share(data: ShareData): Promise<void> {
    return navigator.share(data);
  }
}
