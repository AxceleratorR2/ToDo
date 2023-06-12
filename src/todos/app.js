import todoStore from "../store/todo.store";
import html from "./app.html?raw";
//import todoStore from "../store/todo.store";
import { renderTodos, renderPending } from "./use-cases";
import { Filters } from "../store/todo.store";

const ElementIds = {
  ClearCompleted: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};
/**
 * @param {String} elementId
 */

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIds.PendingCountLabel);
  };
  //Cuando la función App se llama

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  const newDescriptionInput = document.querySelector("#new-todo-input");
  const todoListUL = document.querySelector(ElementIds.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIds.ClearCompleted
  );
  const filtersIL = document.querySelectorAll(ElementIds.TodoFilters);

  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) {
      return;
    }

    if (event.target.value.trim().length === 0) {
      return;
    }

    todoStore.addTodo(event.target.value);
    displayTodos();

    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");

    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    const destroyElement = event.target.className === "destroy";
    const element = event.target.closest("[data-id]");

    if (!element || !destroyElement) {
      return;
    }

    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersIL.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersIL.forEach((ele) => ele.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;

        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;

        case "Completados":
          todoStore.setFilter(Filters.Completed);
      }
      displayTodos();
    });
  });
};
