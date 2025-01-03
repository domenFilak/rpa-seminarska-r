import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);

          //pogledas kateri jezik je v local storage, das 3 if glede na jezik vsak posebej sporocilo!
          this.userSubject.next(user);

          const lang = localStorage.getItem('lang') || 'sl';

          if (lang === 'sl'){
            this.toastrService.success(
              'Dobrodošli v Hrana-Go! ' + user.name,
              'Prijava uspešna'
            );
          }
          else if (lang === 'en'){
            this.toastrService.success(
              'Welcome to Hrana-Go! ' + user.name,
              'Login Successful'
            );
          }
          else if (lang === 'de'){
            this.toastrService.success(
              'Willkommen bei Hrana-Go! ' + user.name,
              'Anmeldung erfolgreich'
            );
          }
          else {
            this.toastrService.success(
              'Welcome to Hrana-Go! ' + user.name,
              'Login Successful'
            );
          }
        },
        error: (errorResponse) => {
          const lang = localStorage.getItem('lang') || 'sl';

          if (lang === 'sl'){
            this.toastrService.error(errorResponse.error, 'Prijava neuspešna');
          }
          else if (lang === 'en'){
            this.toastrService.error(errorResponse.error, 'Login Failed');
          }
          else if (lang === 'de'){
            this.toastrService.error(errorResponse.error, 'Fehler bei der Anmeldung');
          }
          else {
            this.toastrService.error(errorResponse.error, 'Login Failed');
          }
        }
      })
    );
    
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }


  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson){
      return JSON.parse(userJson) as User;
    }
    return new User();
  }

}
