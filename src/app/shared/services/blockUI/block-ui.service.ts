import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BlockUIService {
  @BlockUI() blockUI!: NgBlockUI;

  constructor(private readonly translate: TranslateService) {}

  start(): void {
    this.translate.get('utils.loading').subscribe((message: string) => {
      this.blockUI.start(message);
    });
  }

  stop(): void {
    this.blockUI.stop();
  }
}
