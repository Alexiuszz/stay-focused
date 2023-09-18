import { secondsLeftToday } from "@/helpers/utils";
import { TodoType } from "@/redux/slices/todos-slice";
import ls from "localstorage-slim";

var today = new Date();
today.setHours(0, 0, 0);

const todosKey = (): string =>
  "FocusedTodos(" + today.toDateString() + ")";

export const storeTodos = (todos: TodoType[]) => {
  ls.set(todosKey(), todos, {
    ttl: secondsLeftToday(),
  });
};

export const getTodos = (): TodoType[] => {
  if (typeof window !== "undefined") {
    let todos: TodoType[] = ls.get(todosKey()) || [];
    if (todos) return todos;
  }
  return [];
};
