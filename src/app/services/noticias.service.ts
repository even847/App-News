import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  getTopHeadlines() {
    return this.http.get( `https://newsapi.org/v2/top-headlines?country=us&apiKey=b33a1b1f02cb48e3b87c258eb98eabaa` );
  }
}
