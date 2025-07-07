export interface UserData {
  name: string;
  age: number;
  city: string;
  //будет ссылка на картинку?
  image: string;
  description: string;
}

export interface skill {
  title: string;
  type: 'business' | 'art' | 'language' | 'education' | 'comfort' | 'lifestyle' | 'other';
}

export interface UserCardUIProps {
  skills: skill[];
  desired: skill[];
  buttonClick: () => void;
  setLike: () => void;
  user: UserData;
  type: 'full' | 'short';
}
