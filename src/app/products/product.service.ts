import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[];
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (this.products) {
      return of(this.products);
    }
    return this.http.get<Product[]>("../assets/product-data.json")
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.products = data),
        catchError(this.handleError)
      );
  }


  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
