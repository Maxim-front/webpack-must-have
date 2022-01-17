import { API_SEARCH } from "@/constants/api";

const SET_USER = "SET_USER";
const SET_CARD = "SET_CARD";
const SET_SEARCH = "SET_SEARCH";

interface UserState {
  userName?: string;
  email?: string;
  id?: number;
  description?: string;
  isLogged?: boolean;
  password?: string;
  image?: string;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserState;
}

type UserAction = SetUserAction;

const defaultUserState: UserState = {
  userName: "user",
  email: "",
  id: 0,
  description: "description",
  isLogged: false,
  password: "password",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/401px-No_picture_available.png",
};

export const userReducer = (state = defaultUserState, action: UserAction): UserState => {
  const user = action.payload;

  switch (action.type) {
    case SET_USER:
      return {
        userName: user.userName,
        email: user.email,
        isLogged: user.isLogged,
        id: user.id,
        description: user.description,
        password: user.password,
        image: user.image,
      };
    default:
      return state;
  }
};

interface CardState {
  id?: number;
  platform: string[];
  title: string;
  image: string;
  price: number;
  genres: string;
  text: string;
  rating: number;
  age: string;
}

interface SetCardAction {
  type: typeof SET_CARD;
  payload: CardState;
}

type CardAction = SetCardAction;

const defaultCardState: CardState = {
  id: 0,
  platform: [],
  title: "",
  image: "",
  price: 0,
  genres: "",
  text: "",
  rating: 0,
  age: "",
};

export const cardReducer = (state = defaultCardState, action: CardAction): CardState => {
  const card = action.payload;

  switch (action.type) {
    case SET_CARD:
      return {
        id: card.id,
        title: card.title,
        platform: card.platform,
        image: card.image,
        price: card.price,
        genres: card.genres,
        text: card.text,
        rating: card.rating,
        age: card.age,
      };
    default:
      return state;
  }
};
interface SearchState {
  url: string;
}

interface SetSearchAction {
  type: typeof SET_SEARCH;
  payload: SearchState;
}

type SearchAction = SetSearchAction;

const defaultSearchState: SearchState = {
  url: API_SEARCH,
};

export const searchReducer = (state = defaultSearchState, action: SearchAction): SearchState => {
  const search = action.payload;

  switch (action.type) {
    case SET_SEARCH:
      return {
        url: `${search.url}&title_like=`,
      };
    default:
      return state;
  }
};

export const setUser = (user: UserState): SetUserAction => ({ type: SET_USER, payload: user });

export const setCard = (card: CardState): SetCardAction => ({ type: SET_CARD, payload: card });

export const setSearch = (link: SearchState): SetSearchAction => ({ type: SET_SEARCH, payload: link });
