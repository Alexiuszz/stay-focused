import { secondsLeftToday } from "@/helpers/utils";
import { TodoType } from "@/redux/slices/todos-slice";
import ls from "localstorage-slim";

const today = new Date();
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
    const todos: TodoType[] = ls.get(todosKey()) || [];
    if (todos) return todos;
  }
  return [];
};

export const prevTodos = (): TodoType[] => {
  const yesterday = new Date(today.getTime() - (24 * 3600));
  const prevKey = "FocusedTodos(" + yesterday.toDateString() + ")";
  const todos: TodoType[] = ls.get(prevKey) || [];
  return todos;
};
