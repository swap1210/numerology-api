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
export class AuthGuard2 implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$
      ? this.auth.user$.pipe(
          take(2),
          map((ur) => {
            return ur && ur.workgroup == 'kk';
          }),
          tap((v_ur) => {
            if (v_ur) {
              console.log('login success ', v_ur);
            } else {
              console.log('access denied');
              this.router.navigateByUrl('/?m=shh');
            }
          })
        )
      : EMPTY;
  }

  // return this.auth.user$
  // ? this.auth.user$.pipe(
  //     take(2),
  //     map((user) => !!user),
  //     tap((loggedIn) => {
  //       if (!loggedIn) {
  //         console.log('access denied');
  //         this.router.navigate(['/login']);
  //       }
  //     })
  //   )
  // : EMPTY;
}
