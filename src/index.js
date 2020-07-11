import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { asyncIncrement, decrement, increment, changeTheme } from "./redux/actions";
import { rootReducer } from "./redux/rootReducer";
import "./styles.css";
import logger from "redux-logger";
import { INCREMENT } from "./redux/types";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

addBtn.addEventListener("click", () => {
  store.dispatch({
    type: INCREMENT,
  });
  console.log("SYNC");
});

subBtn.addEventListener("click", () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener("click", () => {
  store.dispatch(asyncIncrement());
  console.log("ASYNC");
});

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
  const state = store.getState();

  console.log(store.getState());

  counter.textContent = state.counter;
  document.body.className = state.theme.value;
  [addBtn, subBtn, themeBtn, asyncBtn].forEach((btn) => {
    btn.disabled = state.theme.disabled;
  });
});

store.dispatch({ type: "INIT_APPLICATION" });
