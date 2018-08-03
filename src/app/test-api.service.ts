import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { User } from './user';
import { Product } from './product';
import { catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TestAPIService {  
  apiUrl: string = "http://localhost:8026/api/Product";
  tokenUrl: string = "http://localhost:8026/api/token"; 
  constructor(private http: HttpClient) { }
  public AuthenticateUser(user: User) {
    /* var data = `username=${user.Username}&password=${user.Password}&grant_type=password`;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(`${this.apiUrl}token`, data, { headers: reqHeader }).pipe(catchError(this.handleError<any>('AuthenticateUser'))); */      
    var reqHeader = new HttpHeaders({'No-Auth': 'True','Content-Type':'application/json'});
    return this.http.post(this.tokenUrl, user, { headers: reqHeader }).pipe(catchError(this.handleError<any>('AuthenticateUser')));
  }

  /* public getUserClaims(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}GetUserClaims`).pipe(catchError(this.handleError<User>('getUserClaims')));
  } */

  public GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(catchError(this.handleError<Product[]>('GetProducts')));
  }

  public GetProductByID(ID: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${ID}`).pipe(catchError(this.handleError<Product>('GetProductByID')));
  }

  public SaveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(catchError(this.handleError<Product>('SaveProduct')));
  }

  public UpdateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl,product).pipe(catchError(this.handleError<Product>('UpdateProduct')));
  }

  public DeleteProduct(ID: number): Observable<any> {    
    return this.http.delete<any>(`${this.apiUrl}/${ID}`).pipe(catchError(this.handleError<any>('DeleteProduct')));
  }

  private handleError<T>(operation='operation', result?:T)
  {
    return (error:any):Observable<T>=>{     
      console.log(`Method: ${operation}, Error Message:${error.message}`);
      return of(result as T);         
    }
  }
}
