export const sample_foods: any[] = [
    {

        //ANGLESCINA

        id:'1',
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favourite: false,
        origins: ['Italy'],
        imageUrl: 'assets/food-1.jpg',
        tags: ['FastFood'],
        lang: "en"
      },
      {
        id:'2',
        name: 'Meatball',
        price: 20,
        cookTime: '20-30',
        favourite: true,
        origins: ['Persia', 'Middle east', 'China'],
        imageUrl: 'assets/food-2.jpg',
        tags: ['MeatDish'],
        lang: "en"
      },
      {
        id:'3',
        name: 'Hamburger',
        price: 5,
        cookTime: '10-15',
        favourite: false,
        origins: ['Germany', 'US'],
        imageUrl: 'assets/food-3.jpg',
        tags: ['FastFood'],
        lang: "en"
      },
      {
        id:'4',
        name: 'Fried Potatoes',
        price: 2,
        cookTime: '15-20',
        favourite: true,
        origins: ['Belgium', 'France'],
        imageUrl: 'assets/food-4.jpg',
        tags: ['FastFood'],
        lang: "en"
      },
      {
        id:'5',
        name: 'Chicken Soup',
        price: 11,
        cookTime: '40-50',
        favourite: false,
        origins: ['India', 'Asia'],
        imageUrl: 'assets/food-5.jpg',
        tags: ['Soup'],
        lang: "en"
      },
      {
        id:'6',
        name: 'Vegetables Pizza',
        price: 9,
        cookTime: '40-50',
        favourite: false,
        origins: ['Italy'],
        imageUrl: 'assets/food-6.jpg',
        tags: ['FastFood'],
        lang: "en"
      },

      //SLOVENSCINA

      {
        id: "1",
        name: "Pica Pepperoni",
        cookTime: "10-20",
        price: 10,
        favourite: false,
        origins: ["Italija"],
        imageUrl: "assets/food-1.jpg",
        tags: ["HitraHrana"],
        lang: "sl"
      },
      {
        id: "2",
        name: "Mesne kroglice",
        price: 20,
        cookTime: "20-30",
        favourite: true,
        origins: ["Perzija", "Srednji vzhod", "Kitajska"],
        imageUrl: "assets/food-2.jpg",
        tags: ["MesnaJed"],
        lang: "sl"
      },
      {
        id: "3",
        name: "Hamburger",
        price: 5,
        cookTime: "10-15",
        favourite: false,
        origins: ["Nemčija", "ZDA"],
        imageUrl: "assets/food-3.jpg",
        tags: ["HitraHrana"],
        lang: "sl"
      },
      {
        id: "4",
        name: "Ocvrti krompirčki",
        price: 2,
        cookTime: "15-20",
        favourite: true,
        origins: ["Belgija", "Francija"],
        imageUrl: "assets/food-4.jpg",
        tags: ["HitraHrana"],
        lang: "sl"
      },
      {
        id: "5",
        name: "Piščančja juha",
        price: 11,
        cookTime: "40-50",
        favourite: false,
        origins: ["Indija", "Azija"],
        imageUrl: "assets/food-5.jpg",
        tags: ["Juha"],
        lang: "sl"
      },
      {
        id: "6",
        name: "Pica z zelenjavo",
        price: 9,
        cookTime: "40-50",
        favourite: false,
        origins: ["Italija"],
        imageUrl: "assets/food-6.jpg",
        tags: ["HitraHrana"],
        lang: "sl"
      },

      //DEUTSCH

      {
        id: "1",
        name: "Pizza Pepperoni",
        cookTime: "10-20",
        price: 10,
        favourite: false,
        origins: ["Italien"],
        imageUrl: "assets/food-1.jpg",
        tags: ["FastFood"],
        lang: "de"
      },
      {
        id: "2",
        name: "Fleischbällchen",
        price: 20,
        cookTime: "20-30",
        favourite: true,
        origins: ["Persien", "Naher Osten", "China"],
        imageUrl: "assets/food-2.jpg",
        tags: ["FleischGift"],
        lang: "de"
      },
      {
        id: "3",
        name: "Hamburger",
        price: 5,
        cookTime: "10-15",
        favourite: false,
        origins: ["Deutschland", "USA"],
        imageUrl: "assets/food-3.jpg",
        tags: ["FastFood"],
        lang: "de"
      },
      {
        id: "4",
        name: "Pommes Frites",
        price: 2,
        cookTime: "15-20",
        favourite: true,
        origins: ["Belgien", "Frankreich"],
        imageUrl: "assets/food-4.jpg",
        tags: ["FastFood"],
        lang: "de"
      },
      {
        id: "5",
        name: "Hühnersuppe",
        price: 11,
        cookTime: "40-50",
        favourite: false,
        origins: ["Indien", "Asien"],
        imageUrl: "assets/food-5.jpg",
        tags: ["Suppe"],
        lang: "de"
      },
      {
        id: "6",
        name: "Gemüse Pizza",
        price: 9,
        cookTime: "40-50",
        favourite: false,
        origins: ["Italien"],
        imageUrl: "assets/food-6.jpg",
        tags: ["FastFood"],
        lang: "de"
      }
];

export const sample_tags:any[] = [ //so naše KATEGORIJE!!

  //ENGLISH
  { name: 'All', count: 6, lang: "en" },
  { name: 'FastFood', count: 4, lang: "en" },
  { name: 'MeatDish', count: 1, lang: "en" },
  { name: 'Soup', count: 1, lang: "en" },
  { name: 'Desert', count: 0, lang: "en"},

  //SLOVENSCINA
  { name: 'Vse', count: 6, lang: "sl" },
  { name: 'HitraHrana', count: 4, lang: "sl" },
  { name: 'MesnaJed', count: 1, lang: "sl" },
  { name: 'Juha', count: 1, lang: "sl" },
  { name: 'Sladica', count: 0, lang: "sl"},

  //DEUTSCH
  { name: 'Alle', count: 6, lang: "de" },
  { name: 'FastFood', count: 4, lang: "de" },
  { name: 'FleischGift', count: 1, lang: "de" },
  { name: 'Suppe', count: 1, lang: "de" },
  { name: 'Dessert', count: 0, lang: "de"},



];


export const sample_users: any[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    address: "Toronto On",
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: "12345",
    address: "Shanghai",
    isAdmin: false,
  },
];