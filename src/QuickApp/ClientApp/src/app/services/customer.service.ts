import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICustomer } from '../models/customer'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(url: string): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(url).pipe(catchError(this.handleError));
  }
  add(url: string, contact: ICustomer): Observable<any> {
    return this.http.post(url, JSON.stringify(contact), httpOptions).pipe(catchError(this.handleError));
  }
  update(url: string, id: number, contact: ICustomer): Observable<any> {
    const newurl = `${url}/${id}`;
    return this.http.put(newurl, contact, httpOptions).pipe(catchError(this.handleError));
  }
  delete(url: string, id: number): Observable<any> {
    const newurl = `${url}/${id}`; // DELETE api/contact?id=42    
    return this.http.delete(newurl, httpOptions).pipe(catchError(this.handleError));
  }
  // custom handler    
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.    
      console.error('An error occurred:', error.error.message);
    } else {
      // the backend returned an unsuccessful response code.    
      // the response body may contain clues as to what went wrong,    
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message    
    return throwError('Something bad happened; please try again later.');
  }
}
