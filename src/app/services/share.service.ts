import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  // TODO: Use proper typings when Angular supports Typescript 3.9.
  canShare(): boolean {
    return !!(navigator as any).share;
  }

  async share(data: any): Promise<void> {
    return (navigator as any).share(data);
  }
}
