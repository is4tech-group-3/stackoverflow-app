import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PublicationService } from '../../service/publication/publication.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  publications: any[] = [];

  constructor(
    private publicationService: PublicationService,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.publicationService.getAll().subscribe({
      next: (response: any) => {
        console.table(response);
        this.publications = response.content;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
