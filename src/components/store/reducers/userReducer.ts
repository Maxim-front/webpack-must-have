const SET_USER = "SET_USER";
const SET_CARD = "SET_CARD";

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
  email: "email",
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
        isLogged: true,
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
  id: number;
  title: string;
  platform: string;
  amount: number;
  price: string;
}

interface SetCardAction {
  type: typeof SET_CARD;
  payload: CardState;
}

type CardAction = SetCardAction;

const defaultCardState: CardState = {
  id: 0,
  title: "name",
  platform: "pc",
  amount: 0,
  price: "0$",
};

export const cardReducer = (state = defaultCardState, action: CardAction): CardState => {
  const card = action.payload;

  switch (action.type) {
    case SET_CARD:
      return {
        id: card.id,
        title: card.title,
        platform: card.platform,
        amount: card.amount,
        price: card.price,
      };
    default:
      return state;
  }
};

export const setUser = (user: UserState): SetUserAction => ({ type: SET_USER, payload: user });

export const setCard = (card: CardState): SetCardAction => ({ type: SET_CARD, payload: card });
