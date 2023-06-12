import { Todo } from "../../models/todo";
import { createTodoHTML } from "./create-todo-html";

let element;

export const renderTodos = (elementId, todos = []) => {
  if (!element) {
    element = document.querySelector(elementId);
  }

  if (!element) {
    throw new Error("Element ${elementId} not found");
  }

  element.innerHTML = "";
  //const element = document.querySelector(elementId);

  todos.forEach((todo) => {
    element.append(createTodoHTML(todo));
  });
  //console.log(elementId, todos);
};
