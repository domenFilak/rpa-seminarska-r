import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required:'Should not be empty',
  email:'Email is not valid'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit, OnChanges{

  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  errorMessages: string[] = [];


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {  
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }

    //ta del za prevod errorja

    this.errorMessages = [];

    const lang = localStorage.getItem('lang') || 'sl';

    for (const key in errors) {
      console.log(key)
    }

    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (key === 'required') {
          if (lang === 'en'){
            this.errorMessages.push('This field is required');
          }
          else if (lang === 'de'){
            this.errorMessages.push('Dieses Feld ist erforderlich');
          }
          else if (lang === 'sl'){
            this.errorMessages.push('To polje je obvezno');
          }
          else {
            this.errorMessages.push('This field is required');
          }
        } else if (key === 'email') {
          if (lang === 'en'){
            this.errorMessages.push('Invalid email address');
          }
          else if (lang === 'de'){
            this.errorMessages.push('Ungültige email Adresse');
          }
          else if (lang === 'sl'){
            this.errorMessages.push('Neveljaven email naslov');
          }
          else {
            this.errorMessages.push('Invalid email address');
          }
        } else if (key === 'minlength') {
          if (errors[key]?.requiredLength === 5) {
            if (lang === 'en'){
              this.errorMessages.push('Minimum length is 5 characters');
            }
            else if (lang === 'de'){
              this.errorMessages.push('Die Mindestlänge beträgt 5 Zeichen');
            }
            else if (lang === 'sl'){
              this.errorMessages.push('Minimalna dolžina je 5 znakov');
            }
            else {
              this.errorMessages.push('Minimum length is 5 characters');
            }
          } else if (errors[key]?.requiredLength === 10) {
            if (lang === 'en'){
              this.errorMessages.push('Minimum length is 10 characters');
            }
            else if (lang === 'de'){
              this.errorMessages.push('Die Mindestlänge beträgt 10 Zeichen');
            }
            else if (lang === 'sl'){
              this.errorMessages.push('Minimalna dolžina je 10 znakov');
            }
            else {
              this.errorMessages.push('Minimum length is 10 characters');
            }
          }
        }
        // Handle custom validator for password confirmation
        else if (key === 'notMatch') {
          if (lang === 'en') {
            this.errorMessages.push('Passwords do not match');
          }
          else if (lang === 'de') {
            this.errorMessages.push('Passwörter stimmen nicht überein');
          }
          else if (lang === 'sl') {
            this.errorMessages.push('Gesli se ne ujemata');
          }
          else {
            this.errorMessages.push('Passwords do not match');
          }
        }
        else {
          if (lang === 'en'){
            this.errorMessages.push('Unknown validation error');
          }
          else if (lang === 'de'){
            this.errorMessages.push('Unbekannter Validierungsfehler');
          }
          else if (lang === 'sl'){
            this.errorMessages.push('Neznana napaka validacije');
          }
          else {
            this.errorMessages.push('Unknown validation error');
          }
        }
      }
    }

    //konec dela za prevod errorja

    //odstranimo ker rocno napolnimo this.errorMessages z prevedenimi errorji
    /*
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
    */
  }
}
