import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

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

  public get currentUser():User{
    return this.userSubject.value;
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
              'Dobrodošli v Hrana-Go!, ' + user.name,
              'Prijava uspešna'
            );
          }
          else if (lang === 'en'){
            this.toastrService.success(
              'Welcome to Hrana-Go!, ' + user.name,
              'Login Successful'
            );
          }
          else if (lang === 'de'){
            this.toastrService.success(
              'Willkommen bei Hrana-Go!, ' + user.name,
              'Anmeldung erfolgreich'
            );
          }
          else {
            this.toastrService.success(
              'Welcome to Hrana-Go!, ' + user.name,
              'Login Successful'
            );
          }
        },
        error: (errorResponse) => {
          const lang = localStorage.getItem('lang') || 'sl';

          if (lang === 'sl'){
            this.toastrService.error("Uporabniško ime ali geslo ni pravilno.", 'Prijava neuspešna');
          }
          else if (lang === 'en'){
            this.toastrService.error("Username or password isn't correct.", 'Login Failed');
          }
          else if (lang === 'de'){
            this.toastrService.error("Benutzername oder Passwort sind falsch.", 'Fehler bei der Anmeldung');
          }
          else {
            this.toastrService.error("Username or password isn't correct.", 'Login Failed');
          }
        }
      })
    );
    
  }

  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          const lang = localStorage.getItem('lang') || 'sl';

          if (lang === 'sl'){
            this.toastrService.success(
              'Dobrodošli v Hrana-Go!, ' + user.name,
              'Registracija uspešna'
            );
          }
          else if (lang === 'en'){
            this.toastrService.success(
              'Welcome to Hrana-Go!, ' + user.name,
              'Register Successful'
            );
          }
          else if (lang === 'de'){
            this.toastrService.success(
              'Willkommen bei Hrana-Go!, ' + user.name,
              'Registrierung erfolgreich'
            );
          }
          else {
            this.toastrService.success(
              'Welcome to Hrana-Go!, ' + user.name,
              'Register Successful'
            );
          }
        },
        error: (errorResponse) => {
          const lang = localStorage.getItem('lang') || 'sl';
          
            if (lang === 'sl') {
              this.toastrService.error(
                'Registracija neuspešna'
              );
            } else if (lang === 'en') {
              this.toastrService.error(
                'Register Failed'
              );
            } else if (lang === 'de') {
              this.toastrService.error(
                'Registrierung fehlgeschlagen'
              );
            } else {
              this.toastrService.error(
                'Register Failed'
              );
            }
        }
      })
    )
  }

  requestPasswordReset(email: string): Observable<string> {
    const newPassword = 'newRandomPassword123'; // Generate a new random password or simulate it
  
    return of(newPassword).pipe(
      tap(() => {
        const lang = localStorage.getItem('lang') || 'sl';
        if (lang === 'sl') {
          this.toastrService.success('Geslo uspešno ponastavljeno');
        } else if (lang === 'en') {
          this.toastrService.success('Password successfully reset');
        } else if (lang === 'de') {
          this.toastrService.success('Passwort erfolgreich zurückgesetzt');
        } else {
          this.toastrService.success('Password successfully reset');
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
