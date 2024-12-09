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

  constructor(private foodService: FoodService){
    this.tags = this.foodService.getAllTags();
  }

  ngOnInit(): void {
    
  }

}
