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
