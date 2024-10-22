import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as SimpleMDE from 'simplemde';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { PublicationService } from '../../service/publication/publication.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  publications: any[] = [];
  selectedPhoto = '';
  isDragging = false;
  simpleMDE: SimpleMDE | undefined;

  constructor(
    private readonly publicationService: PublicationService,
    private readonly blockUIService: BlockUIService,
    private readonly translateServices: TranslateService
  ) {}

  ngOnInit(): void {
    this.handlerGetPublications();
  }

  sanitizeDescription(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent ?? div.innerText ?? '';
  }

  handlerGetPublications(params?: Params) {
    this.blockUIService.start();
    this.publicationService.getAll(params).subscribe({
      next: (response: any) => {
        this.publications = response.content.map((publication: any) => ({
          ...publication,
          description: this.sanitizeDescription(publication.description)
        }));

        this.blockUIService.stop();
      },
      error: error => {
        console.log(error);
        this.blockUIService.stop();
      }
    });
  }
}
