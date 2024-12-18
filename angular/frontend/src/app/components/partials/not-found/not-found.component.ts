import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{

  //z temi inputi lahko starševska komponenta (recimo cart-page) spreminja vrednosti v tej komponenti (not-found) => te vrednosti spreminja v svojem html template-u

  @Input()
  visible = false;

  @Input()
  notFoundMessage = "Not found"; //v i18n je prevod za text, to le default value

  @Input()
  resetLinkText = "Reset"; //v i18n prevod za text

  @Input()
  resetLinkRoute = "/";

  constructor(){}

  ngOnInit(): void {
    
  }

}
