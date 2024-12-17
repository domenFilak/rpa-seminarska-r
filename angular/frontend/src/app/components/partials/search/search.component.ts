import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  searchTerm = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    //SearchComponent JE DEL HomeComponent ==> je prikazana v HomeComponent
    //ZATO ima vse url-je enake kot HomeComponent
    //ZATO potrebujemo tudi tukaj v konstruktorju activatedRoute ==> ker želimo v search baru prikazati besedo, po kateri iščemo (ta se nahaja v url-ju)

    //recimo smo na url-ju na brskaliku "localhost:4200/search/pizza". Ker želimo da se beseda pizza prikaže v search baru, naredimo to logiko
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchTerm){
        this.searchTerm = params.searchTerm;
      }
    });
  }

  //metoda se izvede, ko kliknemo na gumb Search v tem search baru => term je kaj uporabnik vpise
  search(term: string): void{
    if (term){
      this.router.navigateByUrl('/search/'+term);
    }
  }

}
