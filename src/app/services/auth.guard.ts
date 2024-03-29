import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.auth.user$
      ? this.auth.user$.pipe(
          // take(2),
          map((user) => {
            console.log('anony data', user);
            return !!user;
          }),
          tap((loggedIn) => {
            if (!loggedIn) {
              console.log('access denied');
              this.router.navigate(['/']);
            }
          })
        )
      : EMPTY;
  }
}
