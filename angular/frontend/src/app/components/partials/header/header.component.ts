import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // To hold the selected language and flag
  selectedLanguage: { name: string, flag: string } = { 
    name: 'Slovenščina',  // Set 'English' as default
    flag: 'assets/slovenia.png'  // Set the default flag to English flag
  }; 
        
  //pretvorimo da imamo tukaj shranjeno le kratico izbranega jezika ==> SE UJEMA Z STOLPCEV V NAŠI PODATKOVNI BAZI
  selectedLanguageShortName: string = "sl";

  cartQuantity=0;
  constructor(private cartService:CartService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    //to je zato, ko uporabnik izbere nek jezik in refresha stran, ostane ta izbrani jezik ==> se shrani v local storage ob spremembi in potem od tam bere
    const lang = localStorage.getItem('lang') || 'sl';
    if (lang) {
      if (lang == 'en'){
        this.selectedLanguage = { name: 'English', flag: 'assets/britain.png' };
      }
      else if (lang == 'sl'){
        this.selectedLanguage = { name: 'Slovenščina', flag: 'assets/slovenia.png' };
      }
      else if (lang == 'de'){
        this.selectedLanguage = { name: 'Deutsch', flag: 'assets/germany.png' };
      }
    }

    this.cartService.initialize(); //nastavi iz localstorage kosarico

    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

  }

  // KO UPORABNIK KLIKNE NA NEK JEZIK, GA PREUSMERIS NA LINK IN REFRESHAS PAGE (TUKAJ PREUSMERIS NA FETH ENGLISH LANGUAGE) => TAKO SE BO MENU UMAKNIL
  // MORAS PA POTEM BRATI IN SPREMINJATI V LOCALSTORAGE KATERI JEZIK IMA NASTAVLJEN!!
  // V VSAKEM NG ONINIT FETCHAS PODATKE IZ LOCAL STORAGE NASTAVLJENEGA JEZIKA!!

  // Method to handle language selection
  selectLanguage(language: string, flagPath: string): void {
    this.selectedLanguage = { name: language, flag: flagPath };  // Update the selected language and flag path
    if (this.selectedLanguage.name === "Slovenščina"){
      this.selectedLanguageShortName = "sl";
    }
    else if (this.selectedLanguage.name === "English"){
      this.selectedLanguageShortName = "en";
    }
    else if (this.selectedLanguage.name === "Deutsch"){
      this.selectedLanguageShortName = "de";
    }

    localStorage.setItem('lang', this.selectedLanguageShortName);

    this.translateService.use(this.selectedLanguageShortName);

  }

}