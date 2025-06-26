export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface NewIng {
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeForm {
  prevImgUrl: string;
  imgUrl: string;
  imgFile: File | null;
  title: string;
  memo: string;
  ingList: NewIng[];
  stepList: NewStep[];
}

export interface ChildComponentProps {
  formData: RecipeForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipeForm>>;
}

export interface Recipe {
  id: number | null;
  imgUrl: string;
  title: string;
  memo: string;
  userId: number | null;
}

export interface SetMeal {
  id: number;
  title: string;
  userId: number;
  recipes: { id: number; title: string; img_url: string }[];
}

export interface SetMealInfo {
  id: number | null;
  title: string;
  userId: number | null;
}

export interface ShoppingList {
  id: number;
  userId: number;
  name: string;
  amount: string;
  unit: string;
  progress: boolean;
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

export interface NewStep {
  name: string;
}

export interface RecipeInSetMeal {
  id: number | null;
  title: string;
  imgUrl: string;
}

export interface SetMealForm {
  title: string;
  recipeList: RecipeInSetMeal[];
}

export interface SetMealChildComponentProps {
  formData: SetMealForm;
  setFormData: React.Dispatch<React.SetStateAction<SetMealForm>>;
}

export interface ShoppingListForm {
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeRow {
  id: number;
  img_url: string;
  title: string;
  memo: string;
  user_id: number;
}

export interface SetMealRow {
  id: number;
  title: string;
  user_id: number;
  recipes: {
    recipes: {
      id: number;
      title: string;
      img_url: string;
    };
  }[];
}

export interface SetMealInfoRow {
  id: number;
  title: string;
  user_id: number;
}

export interface RecipeListRow {
  recipes:
    | {
        id: number;
        title: string;
        img_url: string;
        memo: string;
        user_id: number;
      }
    | {
        id: number;
        title: string;
        img_url: string;
        memo: string;
        user_id: number;
      }[];
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

export interface ShoppingListRow {
  id: number;
  user_id: number;
  name: string;
  amount: string;
  unit: string;
  progress: boolean;
}

export interface SetRecipeListProp {
  setRecipeList: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export interface SetSetMealListProp {
  setSetMealList: React.Dispatch<React.SetStateAction<SetMeal[]>>;
}

export interface RecipeSug {
  id: number;
  imgUrl: string;
  title: string;
  memo: string;
  userId: number;
}

export interface LinkProp {
  width: string;
}

export interface Links {
  name: string;
  href: string;
  icon: React.FC<LinkProp>;
  width: string;
}

export interface SortItem {
  id: string;
  children: React.ReactNode;
}
