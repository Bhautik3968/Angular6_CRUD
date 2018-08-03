import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (sessionStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers:req.headers.set("Authorization", "Bearer " + sessionStorage.getItem('userToken'))
                                   .set('Content-Type','application/json')                                                                                         
            });
            return next.handle(clonedreq).pipe(
                tap((succ) => { },
                    catchError => {
                        if (catchError.status === 401)
                            this.router.navigate(['']);
                    }
                )
            );
        }
        else {
            this.router.navigate(['']);
        }
    }
}
