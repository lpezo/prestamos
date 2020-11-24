import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User } from './user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private SERVER_URL = environment.API;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentuser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  islogged(){
    return (this.currentUserSubject.value !== null);
  }

  login(user: string, password: string) {
    return this.http.post<User>(this.SERVER_URL + 'clientesPost/Login', { user, password })
      .pipe(map(thisuser=>{
            console.log('thisuser: ', thisuser);
            if (thisuser) {
                // store user details in local storage to keep user logged in
                localStorage.setItem('currentuser', JSON.stringify(thisuser));
                this.currentUserSubject.next(thisuser);
            }
            else {
              localStorage.removeItem('currentuser');
              this.currentUserSubject.next(null);
            }
            return thisuser;
        }));
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('currentuser');
    this.currentUserSubject.next(null);
}
}
