import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias: string[] = [
    'general',
    'business',
    'sports',
    'health',
    'sciences',
    'technology',
    'entertainment',
  ];

  noticias: Article[] = [];

  constructor(private newsService: NoticiasService) {}

  ngOnInit(): void {
    this.segment.value = this.categorias[0];

    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event) {
    this.noticias = [];

    this.cargarNoticias(event.detail.value);
    // console.log(this.noticias);
  }

  cargarNoticias(categoria: string, event?) {
    this.newsService.getTopHeadlinesCategoria(categoria).subscribe((resp) => {
      // console.log('Encabezados', resp);
      this.noticias.push(...resp.articles);
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
      }

      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }
}
