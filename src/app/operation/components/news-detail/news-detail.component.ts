import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../service/publication/publication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  id: string | null = null;
  publication: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly publicationService: PublicationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.handlerGetPublicationById(this.id);
    }
  }

  handlerGetPublicationById(id: string) {
    this.publicationService.getById(id).subscribe({
      next: response => {
        this.publication = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
