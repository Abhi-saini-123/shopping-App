import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
   
  //  private recipes: Recipe[] =[
  //       new Recipe(
  //         'First Recipe',
  //         'This is First Recipe description',
  //         'https://media.istockphoto.com/id/1470280153/photo/the-ingredients-for-homemade-pizza-on-white-wooden-background.webp?b=1&s=170667a&w=0&k=20&c=yqis-dJ8X7j02aox9f0n4kPdLVtxRB-MshJmmn0qOZs=',
  //         [
  //           new Ingredient('Salt', 1),
  //           new Ingredient('French Fries', 20)
  //         ]),
  //       new Recipe(
  //         'Second Recipe',
  //         'This is Second Recipe description',
  //         'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVjaXBlfGVufDB8fDB8fHww&w=1000&q=80',
  //         [
  //           new Ingredient('Bune',2),
  //           new Ingredient('Milk',10)
  //         ])
  //     ]; 

    private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){}

      SetRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      
      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
         this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
         this.recipes.push(recipe);
         this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
         this.recipes[index] = newRecipe;
         this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}