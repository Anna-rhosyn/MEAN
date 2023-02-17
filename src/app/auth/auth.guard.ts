import { Injectable } from "@angular/core";
import {
   ActivatedRouteSnapshot,
   CanActivate,
   RouterStateSnapshot,
   Router
  } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private authServie : AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
       ): boolean  | Observable<boolean> | Promise<boolean > {
        const isAuth = this.authServie.getIsAuth();
        if(!isAuth){
          this.router.navigate(['/auth/login']);
        }
        return isAuth;
    }
}
