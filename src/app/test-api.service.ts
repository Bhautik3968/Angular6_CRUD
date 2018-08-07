import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { User } from './user';
import { Product } from './product';
import { catchError} from 'rxjs/operators';
import { Error } from './error';
@Injectable({
  providedIn: 'root'
})
export class TestAPIService {    
  BaseAPIUrl: string = "http://localhost:8026/api"; 
  //BaseAPIUrl: string = "https://localhost:5001/api";  
  ProductAPIUrl: string =`${this.BaseAPIUrl}/Product`; 
  ErrorAPIUrl: string =`${this.BaseAPIUrl}/Error`; 
  constructor(private http: HttpClient) { }
  public AuthenticateUser(user: User) {
    //var data = `username=${user.Username}&password=${user.Password}&grant_type=password`;
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    //return this.http.post(`${this.BaseAPIUrl}/token`, data, { headers: reqHeader }).pipe(catchError(this.handleError<any>('AuthenticateUser')));  
    var reqHeader = new HttpHeaders({'No-Auth': 'True','Content-Type':'application/json'});
    return this.http.post(`${this.BaseAPIUrl}/token`, user, { headers: reqHeader }).pipe(catchError(this.handleError<any>('AuthenticateUser')));
  }

  /* public getUserClaims(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}GetUserClaims`).pipe(catchError(this.handleError<User>('getUserClaims')));
  } */

  public GetProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ProductAPIUrl).pipe(catchError(this.handleError<Product[]>('GetProducts')));    
  }

  public GetProductByID(ID: number): Observable<Product> {
    return this.http.get<Product>(`${this.ProductAPIUrl}/${ID}`).pipe(catchError(this.handleError<Product>('GetProductByID')));
  }

  public SaveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.ProductAPIUrl,product).pipe(catchError(this.handleError<Product>('SaveProduct')));
  }

  public UpdateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.ProductAPIUrl,product).pipe(catchError(this.handleError<Product>('UpdateProduct')));
  }

  public DeleteProduct(ID: number): Observable<any> {    
    return this.http.delete<any>(`${this.ProductAPIUrl}/${ID}`).pipe(catchError(this.handleError<any>('DeleteProduct')));
  }  
  public GetErrors(ID: number): Observable<Error[]> {
    return this.http.get<Error[]>(`${this.ErrorAPIUrl}`).pipe(catchError(this.handleError<Error[]>('GetErrors')));
  }
  public GetErrorByID(ID: number): Observable<Error> {
    return this.http.get<Error>(`${this.ErrorAPIUrl}/${ID}`).pipe(catchError(this.handleError<Error>('GetErrorByID')));
  }
  public SaveError(error:Error): Observable<Error> {
    return this.http.post<Error>(this.ErrorAPIUrl,error).pipe(catchError(this.handleError<Error>('SaveError')));
  }
 

  private handleError<T>(operation='operation', result?:T)
  {
    return (error:any):Observable<T>=>{     
      console.log(`Method: ${operation}, Error Message:${error.message}`);
      return of(result as T);         
    }
  }
}
