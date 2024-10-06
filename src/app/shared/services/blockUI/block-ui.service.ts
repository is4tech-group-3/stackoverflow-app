import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class BlockUIService {
  @BlockUI() blockUI!: NgBlockUI;

  constructor() {}

  start(message: string = 'Please wait...'): void {
    console.log("🚀 ~ BlockUIService ~ start ~ message:", message)
    this.blockUI.start(message);
  }

  stop(): void {
    this.blockUI.stop();
  }
}
