import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  //se gleda hierarhija pathov!!!

  //recimo uporabnik se v brskalniku nahaja na url-ju "localhost:4200". To se ujema z path="", pomeni da se HomeComponent prikaže na mestu <router-outlet> v app.compoment.html,
  //saj je AppComponent starš (najvišja komponenta po hierarhiji, pod njo so ostale)

  //enako velja za url na brskalniku "localhost:4200/search/:searchTerm"


  {path:'', component: HomeComponent}, //če bi tukaj dodal otroke, bi se te komponente prikazovale namesto <router-outlet> v HomeComponent (njihov starš)
  {path: 'search/:searchTerm', component: HomeComponent},
  {path: 'tag/:tag', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
