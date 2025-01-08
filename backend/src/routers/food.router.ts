import { Router } from "express";
//import { sample_foods, sample_tags } from "../data";
import { Food } from "../interfaces/Food";
import { Branch } from "../interfaces/Branch";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

/*
router.get("/seed", asyncHandler(async (req, res) => {
  const foodsCount = await FoodModel.countDocuments(); //presteje stevilo vnosov food v mongodb
  if (foodsCount > 0){
    res.status(409).send("Seed is already done!");
    return;
  }

  await FoodModel.create(sample_foods);
  res.status(200).send("Seed is done!");
}));
*/

router.get("/", asyncHandler(async(req, res) => {
  const lang = req.query.lang;
  if (lang) {
    const filteredFoods = await FoodModel.find({ lang });
    res.send(filteredFoods);
  } else {
    const sample_foods = await FoodModel.find();
    res.send(sample_foods);
  }
}));

//se v frontendu ne klice!! verjetno odvec endpoint
/*
router.get("/:foodId/stock", asyncHandler(async(req, res) => {
  const foodId = req.params.foodId;
  const branch = req.query.branch as string;

  const food = await FoodModel.findOne({ _id: foodId});

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
}));
*/


router.get("/search/:searchTerm", asyncHandler(async(req, res) => {
  const searchTerm = req.params.searchTerm;
  const searchRegex = new RegExp(searchTerm, 'i');
  const lang = req.query.lang; // Retrieve the `lang` query parameter

  const foods = await FoodModel.find({name: {$regex: searchRegex}, lang: lang})

  res.send(foods);
}));


router.get("/tags", asyncHandler(async(req, res) => {
  const lang = req.query.lang;

  const tags = await FoodModel.aggregate([
    {
      $match: {
        lang: lang
      }
    },
    {
      $unwind: '$tags'
    },
    {
      $group: {
        _id: '$tags',
        count: {$sum: 1}
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        count: '$count'
      }
    }
  ]).sort({count: -1});

  if (lang === 'en'){
    const all = {
      name: 'All',
      count: await FoodModel.countDocuments({lang: lang})
    }
    tags.unshift(all);
  }
  else if (lang === 'sl'){
    const all = {
      name: 'Vse',
      count: await FoodModel.countDocuments({lang: lang})
    }
    tags.unshift(all);
  }
  else if (lang === 'de'){
    const all = {
      name: 'Alle',
      count: await FoodModel.countDocuments({lang: lang})
    }
    tags.unshift(all);
  }
  res.send(tags);
}));


router.get("/tag/:tagName", asyncHandler(async(req, res) => {
  const tagName = req.params.tagName;
  const lang = req.query.lang; // Retrieve the optional `lang` query parameter

  const foods = await FoodModel.find({tags: tagName, lang: lang})

  res.send(foods);
}));


router.get("/:foodId", asyncHandler(async(req, res) => {
  const foodId = req.params.foodId;
  const lang = req.query.lang; // Retrieve the optional `lang` query parameter

  const food = await FoodModel.findOne({ _id: foodId, lang: lang});

  if (food) {
    res.send(food);
  } else {
    res.status(404).send({ message: "Food not found or language mismatch" });
  }
}));

export default router;
