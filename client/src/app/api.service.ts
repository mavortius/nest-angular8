import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from './article';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(apiUrl)
      .pipe(tap(article => console.log('Fetched articles')),
        catchError(this.handleError('getArticles', [])));
  }

  getArticle(id: string): Observable<Article> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Article>(url)
      .pipe(tap(_ => console.log(`Fetched article id = ${id}`)),
        catchError(this.handleError<Article>(`getArticle id = ${id}`)));
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(apiUrl, article, httpOptions)
      .pipe(tap((art: Article) => console.log(`added aarticle w/ id = ${art._id}`)),
        catchError(this.handleError<Article>('addArticle')));
  }

  updateArticle(id: any, article: Article): Observable<Article> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<Article>(url, article, httpOptions)
      .pipe(tap(_ => console.log(`updated article id = ${id}`)),
        catchError(this.handleError<Article>('updateArticle')));
  }

  deleteArticle(id: any): Observable<void> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(tap(_ => console.log(`deleted article id = ${id}`)),
        catchError(this.handleError<any>('deleteArticle')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
