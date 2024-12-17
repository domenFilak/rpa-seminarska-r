import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'Hrana-Go';

  constructor(private translateService: TranslateService){}

  ngOnInit(): void {
    this.translateService.setDefaultLang('sl');

    this.translateService.use(localStorage.getItem('lang') || 'sl');
  }

}
