import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const token = localStorage.getItem('access_token');
    // const user = localStorage.getItem('current_user');

    // if(!token || !user){
    //   this.router.navigate(["/auth/login"]);
    //   return false;
    // }

    // if(this.jwtHelper.isTokenExpired(token))
    // {
    //   localStorage.removeItem("access_token");
    //   localStorage.removeItem("current_user");
    //   this.router.navigate(["/auth/login"]);
    //   return false;
    // }

    return true;
  }
}
