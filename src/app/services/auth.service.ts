import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';
import { GoogleAuthProvider } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  anl = !environment.production; //flag for anonymous login
  user$: Observable<any> | undefined;
  commonData$: BehaviorSubject<any> = new BehaviorSubject({});
  curUser: User | undefined;
  // public curUserRef: DocumentReference<User> | undefined;
  constructor(
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private afs: AngularFirestore, // Inject Firestore service
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          if (!user.isAnonymous) {
            //if it's end ur for w ur
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return new Promise<User>((res, rej) => {
              let ur: User = {
                workgroup: 'anon',
                email: '',
                uid: user.uid,
                last_login: Timestamp.now(),
              };
              // console.log('Sending', ur);
              res(ur);
            });
          }
        } else {
          console.log('here');
          return of(null);
        }
      })
    );
  }

  // Auth logic to run auth providers
  async authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.updateUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  googleSignin() {
    return this.authLogin(new GoogleAuthProvider());
  }

  mySign = () => {
    //signInAnonymously(this.auth).then(() => {});
    this.afAuth
      .signInAnonymously()
      .then(() => {
        console.log('Anonymous sign in sucess [if form field]');
        this.router.navigate(['calculator']);
      })
      .catch(() => {
        console.log('Error signing in anony user');
      });
  };

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }

  async updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    userRef.get().subscribe({
      next: (oldData) => {
        const data = {};
        if (oldData && user.uid === oldData.get('uid')) {
          // sessionStorage.setItem('language', oldData.get('language'));
          return userRef.set({ last_login: Timestamp.now() }, { merge: true });
        } else {
          // sessionStorage.clear();
          if (this.anl) {
            const { uid, displayName, email } = user;
            return userRef.set(
              {
                uid,
                displayName,
                email,
                last_login: Timestamp.now(),
                workgroup: 'kk',
              },
              { merge: true }
            );
          } else {
            this.afAuth.signOut();
          }
          return { uid: null };
        }
      },
    });
  }
}
