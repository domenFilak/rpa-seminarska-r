import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isSubmitted = false;
  newPassword = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get fc() {
    return this.resetForm.controls;
  }

  submit(): void {
    this.isSubmitted = true;
    if (this.resetForm.invalid) {
      return;
    }

    const email = this.fc.email.value;

    this.userService.requestPasswordReset(email).subscribe((password) => {
      this.newPassword = password; // Display the new password in the UI
    });
  }
}