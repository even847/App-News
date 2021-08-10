import { Component, OnInit } from '@angular/core';
import { Article, RespuestaTopHeadlines } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];

  constructor(private newsService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticia();
  }

  loadData(event) {

    console.log( event );
    this.cargarNoticia( event );
  }

  cargarNoticia( event? ) {
    this.newsService.getTopHeadlines().subscribe((resp) => {
      // console.log('Noticias', resp);
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
      }
      // this.noticias = resp.articles;
      this.noticias.push( ...resp.articles );

      if (event) {
        event.target.complete();
      }
    });
  }
}
