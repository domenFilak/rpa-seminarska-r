import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { BranchesComponent } from './components/pages/branches/branches.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { AllOrdersComponent } from './components/pages/all-orders/all-orders.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';

const routes: Routes = [
  //se gleda hierarhija pathov!!!

  //recimo uporabnik se v brskalniku nahaja na url-ju "localhost:4200". To se ujema z path="", pomeni da se HomeComponent prikaže na mestu <router-outlet> v app.compoment.html,
  //saj je AppComponent starš (najvišja komponenta po hierarhiji, pod njo so ostale)

  //enako velja za url na brskalniku "localhost:4200/search/:searchTerm"


  {path:'', component: HomeComponent}, //če bi tukaj dodal otroke, bi se te komponente prikazovale namesto <router-outlet> v HomeComponent (njihov starš)
  {path: 'search/:searchTerm', component: HomeComponent},
  {path: 'tag/:tag', component: HomeComponent},
  {path: 'food/:id', component:FoodPageComponent},
  {path: 'cart-page', component:CartPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'register', component:RegisterPageComponent},
  {path: 'branches', component:BranchesComponent},
  {path: 'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]},
  {path: 'payment', component:PaymentPageComponent, canActivate:[AuthGuard]},
  {path: 'orders', component:AllOrdersComponent, canActivate:[AuthGuard]},
  {path: 'user', component:UserProfileComponent, canActivate:[AuthGuard]},
  {path: 'forgot-password', component:ResetPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
