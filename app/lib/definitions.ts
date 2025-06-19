export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface NewIng {
  name: string;
  amount: string;
}

export interface Form {
  prevImgUrl: string;
  imgUrl: string;
  imgFile: File | null;
  title: string;
  memo: string;
  ingList: NewIng[];
  stepList: string[];
}

export interface ChildComponentProps {
  formData: Form;
  setFormData: React.Dispatch<React.SetStateAction<Form>>;
}

export interface Recipe {
  id: number | null;
  imgUrl: string;
  title: string;
  memo: string;
  user_id: number | null;
}

export interface RecipeInSetMeal {
  id: number;
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
}
