import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  
  updateForm!:FormGroup; 
  isSubmitted = false;

  user: any;

  selectedLanguageShortName: string = "sl";

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.selectedLanguageShortName = localStorage.getItem('lang') || 'sl';

    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.orderService.getCurrentUser().subscribe({
      next: (response) => {
        this.user = response;
        this.updateForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          password : '',
          address: this.user.address
        });
      },
      error: (error) => {
        console.error('Failed to fetch user info:', error);
      },
    });
  }

  get fc() {
    return this.updateForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.updateForm.invalid) return;


    const fv = this.updateForm.value;
    const updatedUser: any = {
      name: fv.name,
      email: fv.email,
      address: fv.address,
    };

    // Include password only if it is not empty
    if (fv.password) {
      updatedUser.password = fv.password;
    }

    // Call the service to update the user info on the server
    this.orderService.updateUser(updatedUser).subscribe({
      next: (response) => {
        this.userService.changeUserSubject(response);
        this.toastr.success('User updated successfully!', 'Success');
        console.log('User updated successfully', response);
      },
      error: (error) => {
        this.toastr.error('Failed to update user!', 'Error');
        console.error('Failed to update user:', error);
      }
    });
  }
}
