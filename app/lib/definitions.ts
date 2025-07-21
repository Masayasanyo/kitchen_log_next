import { ViewApi } from '@fullcalendar/core';

// Account
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Recipe
export interface Recipe {
  id: number;
  imgUrl: string;
  title: string;
  memo: string;
  userId: number;
  tags: Tag[];
  ingredients: Ingredient[];
  steps: Step[];
}

export interface Tag {
  id: number;
  name: string;
  recipeId: number;
}

export interface Ingredient {
  id: number;
  recipeId: number;
  name: string;
  amount: string;
  unit: string;
}

export interface Step {
  id: number;
  recipeId: number;
  name: string;
}

export interface RecipeForm {
  prevImgUrl: string;
  imgUrl: string;
  imgFile: File | null;
  title: string;
  memo: string;
  tagList: Tag[];
  ingList: Ingredient[];
  stepList: Step[];
}

export interface RecipeRow {
  id: number;
  img_url: string;
  title: string;
  memo: string;
  user_id: number;
  tags: TagRow[];
  ingredients: IngRow[];
  steps: StepRow[];
}

export interface TagRow {
  id: number;
  recipe_id: number;
  name: string;
}

export interface IngRow {
  id: number;
  recipe_id: number;
  name: string;
  amount: string;
  unit: string;
}

export interface StepRow {
  id: number;
  recipe_id: number;
  name: string;
}

// Set meal
export interface SetMeal {
  id: number;
  title: string;
  userId: number;
  recipes: Recipe[];
}

export interface SetMealForm {
  title: string;
  recipes: Recipe[];
}

export interface SetMealRow {
  id: number;
  title: string;
  user_id: number;
  set_meal_recipes: {
    id: number;
    recipe_id: number;
    set_meal_id: number;
    recipes:
      | {
          id: number;
          title: string;
          img_url: string;
          memo: string;
          user_id: number;
          tags: TagRow[];
          ingredients: IngRow[];
          steps: StepRow[];
        }
      | {
          id: number;
          title: string;
          img_url: string;
          memo: string;
          user_id: number;
          tags: TagRow[];
          ingredients: IngRow[];
          steps: StepRow[];
        }[];
  }[];
}

// Shopping list
export interface ShoppingList {
  id: number;
  userId: number;
  name: string;
  amount: string;
  unit: string;
  progress: boolean;
}

export interface ShoppingListForm {
  name: string;
  amount: string;
  unit: string;
}

export interface ShoppingListRow {
  id: number;
  user_id: number;
  name: string;
  amount: string;
  unit: string;
  progress: boolean;
}

// Calendar
export interface DateClick {
  dayEl: HTMLElement;
  jsEvent: MouseEvent;
  view: ViewApi;
  date: Date;
  dateStr: string;
  allDay: boolean;
}

export interface Event {
  id: string;
  recipeId: number;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}

export interface EventRow {
  id: string;
  recipe_id: number;
  title: string;
  start: string;
  end: string;
  background_color: string;
  border_color: string;
  text_color: string;
}

// Nav
export interface Links {
  name: string;
  href: string;
  icon: React.FC<{ width: string }>;
  width: string;
}
