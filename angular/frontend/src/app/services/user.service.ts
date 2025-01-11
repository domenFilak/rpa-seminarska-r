import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { UPDATE_PASSWORD_URL, USER_EMAIL_EXISTS, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import emailjs from 'emailjs-com';


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

  changeUserSubject(updatedUser: User) {
    this.setUserToLocalStorage(updatedUser);
    this.userSubject.next(updatedUser);  // Pass the updated user data
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
    return this.http.post<{ exists: boolean }>(USER_EMAIL_EXISTS, { email }).pipe(
      switchMap((response) => {
        if (!response.exists) {
          const lang = localStorage.getItem('lang') || 'sl';
          const message = lang === 'sl' ? 'E-naslov ne obstaja' :
                          lang === 'en' ? 'Email does not exist' :
                          lang === 'de' ? 'E-Mail-Adresse existiert nicht' :
                          'Email does not exist';
          this.toastrService.error(message);
          return throwError(() => new Error('Email does not exist'));
        }
  
        console.log('Email exists, generating new password');
        const newPassword = this.generateRandomPassword();
        return this.updatePasswordInDatabase(email, newPassword).pipe(
          tap(() => {
            const lang = localStorage.getItem('lang') || 'sl';
            const successMessage = lang === 'sl' ? 'Geslo uspešno ponastavljeno' :
                                  lang === 'en' ? 'Password successfully reset' :
                                  lang === 'de' ? 'Passwort erfolgreich zurückgesetzt' :
                                  'Password successfully reset';
            this.toastrService.success(successMessage);
            try {
              this.sendEmailNotification(email,newPassword)
            } catch (error) {
              
            }
          }),
          switchMap(() => {
            console.log('Password reset successful, returning new password');
            return of(newPassword);
          })
        );
      }),
      catchError((error) => {
        console.error('Error in password reset:', error);
        return throwError(error);
      })
    );
  }
  
  

  sendEmailNotification(email: string, newPassword: string): void {
    const templateParams = {
      email: email,
      newPassword: newPassword,
    };
  
    // Initialize EmailJS with your Public Key
    emailjs.init('pk2KtUYnOfC7cPrTs');
  
    emailjs.send('service_scig078', 'template_qggwhx2', templateParams)
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
  
          // Get the language from localStorage (default is 'sl')
          const lang = localStorage.getItem('lang') || 'sl';
  
          // Success message based on the language
          const successMessage = lang === 'sl' ? 'Novo geslo je bilo poslano na vaš e-naslov.' :
                                lang === 'en' ? 'A new password has been sent to your email address.' :
                                lang === 'de' ? 'Ein neues Passwort wurde an Ihre E-Mail-Adresse gesendet.' :
                                'A new password has been sent to your email address.';
  
          // Show success message using Toastr
          this.toastrService.success(successMessage);
        },
        (error) => {
          console.error('Error sending email:', error);
          this.toastrService.error('Failed to send email');
  
          // Log more detailed error response if available
          if (error?.text) {
            console.error('EmailJS error text:', error.text);
          }
          if (error?.status) {
            console.error('EmailJS error status:', error.status);
          }
        }
      );
  }
  

  
  
  updatePasswordInDatabase(email: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(UPDATE_PASSWORD_URL, { email, newPassword }).pipe(
      tap((response) => {
        console.log(response.message); // Log the success message
      })
    );
  }
  
  
  
  generateRandomPassword(): string {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '@?';
  
    const allChars = lowerCase + upperCase + numbers + specialChars;
  
    let password = '';
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
    for (let i = password.length; i < 8; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    return password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
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
