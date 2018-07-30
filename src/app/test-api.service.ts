import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { User } from './user';
import { Product } from './product';
import { IResponse } from './response';
import { catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TestAPIService {
  /* apiUrl: string = "http://localhost:50637/api/"; */
  apiUrl: string = "http://localhost:7885/api/";
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  public AuthenticateUser(user: User) {
    var data = `username=${user.Username}&password=${user.Password}&grant_type=password`;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(`${this.apiUrl}token`, data, { headers: reqHeader }).pipe(catchError(this.handleError<any>('AuthenticateUser')));
  }

  public getUserClaims(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}GetUserClaims`).pipe(catchError(this.handleError<User>('getUserClaims')));
  }

  public GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}Products`).pipe(catchError(this.handleError<Product[]>('GetProducts')));
  }

  public GetProductByID(ID: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}Products/${ID}`).pipe(catchError(this.handleError<Product>('GetProductByID')));
  }

  public SaveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}SaveProduct`, product, { headers: this.headers }).pipe(catchError(this.handleError<Product>('SaveProduct')));
  }

  public DeleteProduct(ID: number): Observable<IResponse> {    
    return this.http.delete<IResponse>(`${this.apiUrl}Product/${ID}`).pipe(catchError(this.handleError<IResponse>('DeleteProduct')));
  }

  private handleError<T>(operation='operation', result?:T)
  {
    return (error:any):Observable<T>=>{     
      console.log(`Method: ${operation}, Error Message:${error.message}`);
      return of(result as T);      
    }
  }
}
