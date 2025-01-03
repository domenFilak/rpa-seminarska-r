import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})

export class BranchesComponent implements OnInit {

  branches = [
    { 
      name: 'Novo mesto',
      address: 'Zaloška cesta 1',
      postCode: '8000',
      city: 'Novo mesto',
      phone: '+386 40 123 456',
      email: 'novomesto@hrana-go.si',
      imageUrl: 'assets/novoMesto.jpg',
      mapUrl: 'https://maps.app.goo.gl/q4ZvYgh3Z6pjBxYv7'
      
    },
    { 
      name: 'Ljubljana',
      address: 'Cankarjeva ulica 1',
      postCode: '1000',
      city: 'Ljubljana',
      phone: '+386 41 654 321',
      email: 'ljubljana@hrana-go.si',
      imageUrl: 'assets/ljubljana.jpg',
      mapUrl: 'https://maps.app.goo.gl/dAqhDY3tQbiauViM8'
    }
  ];
  

  constructor() { }

  ngOnInit(): void {

  }

}