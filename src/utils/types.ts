export type UserType = {
  name: string;
  password: string;
  favoriList: string[];
  image: string;
};

export type userContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};
