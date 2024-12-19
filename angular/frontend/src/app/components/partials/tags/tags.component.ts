import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{

  tags?: Tag[]; //je ?, kar pomeni, da lahko obstaja tags ali pa ne

  selectedLanguageShortName: string = "sl";

  constructor(private foodService: FoodService){}

  ngOnInit(): void {
    this.selectedLanguageShortName = localStorage.getItem('lang') || 'sl';
  
    this.foodService.getAllTags(this.selectedLanguageShortName).subscribe(serverTags => {
      this.tags = serverTags;
    });
  }
  

}
