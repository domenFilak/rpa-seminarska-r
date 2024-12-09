import { Food } from "./app/shared/models/food";
import { Tag } from "./app/shared/models/tag";

export const sample_foods: Food[] = [
    {
        id:'1',
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favourite: false,
        origins: ['italy'],
        imageUrl: 'assets/food-1.jpg',
        tags: ['FastFood'],
      },
      {
        id:'2',
        name: 'Meatball',
        price: 20,
        cookTime: '20-30',
        favourite: true,
        origins: ['persia', 'middle east', 'china'],
        imageUrl: 'assets/food-2.jpg',
        tags: ['MeatDish'],
      },
      {
        id:'3',
        name: 'Hamburger',
        price: 5,
        cookTime: '10-15',
        favourite: false,
        origins: ['germany', 'us'],
        imageUrl: 'assets/food-3.jpg',
        tags: ['FastFood'],
      },
      {
        id:'4',
        name: 'Fried Potatoes',
        price: 2,
        cookTime: '15-20',
        favourite: true,
        origins: ['belgium', 'france'],
        imageUrl: 'assets/food-4.jpg',
        tags: ['FastFood'],
      },
      {
        id:'5',
        name: 'Chicken Soup',
        price: 11,
        cookTime: '40-50',
        favourite: false,
        origins: ['india', 'asia'],
        imageUrl: 'assets/food-5.jpg',
        tags: ['Soup'],
      },
      {
        id:'6',
        name: 'Vegetables Pizza',
        price: 9,
        cookTime: '40-50',
        favourite: false,
        origins: ['italy'],
        imageUrl: 'assets/food-6.jpg',
        tags: ['FastFood'], //tag se lahko modificira tako, da prikazuje, v kateri kategoriji je dani food!!!
                            //na isti nacin se lahko poda recimo, v katerih poslovalnicah se nahaja dani food => polje z array-om stringov ki so poslovalnice
      }
];

export const sample_tags:Tag[] = [ //so naše KATEGORIJE!!
  { name: 'All', count: 6 },
  { name: 'FastFood', count: 4 },
  { name: 'MeatDish', count: 1 },
  { name: 'Soup', count: 1 },
  { name: 'Desert', count: 0}
]