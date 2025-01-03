import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";


const app = express();

app.use(express.json());


app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));



interface Branch {
  branch: string;
  stock: number;
}

interface Food {
  id: string;
  name: string;
  cookTime: string;
  price: number;
  favourite: boolean;
  origins: string[];
  imageUrl: string;
  tags: string[];
  lang: string;
  branches: Branch[]; 
}


app.get("/api/foods/:foodId/stock", (req, res) => {
  const foodId = req.params.foodId;
  const branch = req.query.branch as string;

  const food = sample_foods.find((food: Food) => food.id === foodId);

  if (food) {
    const branchData = food.branches.find((b: Branch) => b.branch === branch);
    
    if (branchData) {
      res.send({ stock: branchData.stock });
    } else {
      res.status(404).send({ message: "Branch not found" });
    }
  } else {
    res.status(404).send({ message: "Food not found" });
  }
});


app.get("/api/foods", (req, res) => {
  const lang = req.query.lang;
  if (lang) {
    const filteredFoods = sample_foods.filter((food) => food.lang === lang);
    res.send(filteredFoods);
  } else {
    res.send(sample_foods);
  }
});


app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const lang = req.query.lang; // Retrieve the `lang` query parameter

  // Filter the foods by searchTerm and optionally by lang
  const foods = sample_foods
    .filter((food) => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (!lang || food.lang === lang) // Include lang filter if it exists
  );

  res.send(foods);
});


app.get("/api/foods/tags", (req, res) => {
  const lang = req.query.lang; // Retrieve the `lang` query parameter

  // Filter tags by lang if it is provided
  const filteredTags = lang 
    ? sample_tags.filter((tag) => tag.lang === lang) 
    : sample_tags;

  res.send(filteredTags);
});


app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const lang = req.query.lang; // Retrieve the optional `lang` query parameter

  // Filter foods by tagName and optionally by lang
  const foods = sample_foods.filter(
    (food) =>
      food.tags?.includes(tagName) && 
      (!lang || food.lang === lang) // Include lang filter if provided
  );

  res.send(foods);
});


app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const lang = req.query.lang; // Retrieve the optional `lang` query parameter

  // Find food by id and optionally filter by lang
  const food = sample_foods.find(
    (food) => food.id == foodId && (!lang || food.lang === lang)
  );

  if (food) {
    res.send(food);
  } else {
    res.status(404).send({ message: "Food not found or language mismatch" });
  }
});

app.post("/api/users/login", (req, res) => {

  const {email, password} = req.body;
  const user = sample_users.find(user => user.email === email && user.password === password);

  if (user){
    res.send(generateTokenResponse(user));
  }
  else {
    res.status(400).send("Username or password is not valid!");
  }

});

const generateTokenResponse = (user:any) => {
  const token = jwt.sign({
    email: user.email,
    isAdmin: user.isAdmin
  }, "SomeRandomText", {
    expiresIn: "30d"
  });

  user.token = token;

  return user;
}


const port = 5000;

app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});