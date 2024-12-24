import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    //dostop do tega polja email v html: loginForm.controls.email
    //ker imamo getter lahko v html dostopamo kot: fc.email!
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if (this.loginForm.invalid){
      return;
    }
    alert("Email: " + this.fc.email.value + "Password: " + this.fc.password.value);
  }

}
