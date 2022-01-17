import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer, cardReducer, searchReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  card: cardReducer,
  url: searchReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
