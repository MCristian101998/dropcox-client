import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    
    constructor(private injector: Injector){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var tokenizedRequest = req.clone({

            setHeaders:{
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        return next.handle(tokenizedRequest);
    }
}