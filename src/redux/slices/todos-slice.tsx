import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoType {
  createdAt: Date;
  dueAt: number;
  task: string;
  key: string;
  completed: boolean;
}
export interface TodoStateType {
  todos: TodoType[];
  completedAll: boolean;
}
const initialState: TodoStateType = {
  todos: [],
  completedAll: false,
};
export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.findIndex(
        (obj) => obj.key === action.payload
      );
      if (todo !== -1) {
        // Remove the object at the found index
        state.todos.splice(todo, 1);
        console.log("Todo with key", todo, "has been deleted.");
      } else {
        console.log("Todo not found for the given key:", todo);
      }
    },
    toggleTodoComplete: (
      state,
      action: PayloadAction<{ key: string; completed: boolean }>
    ) => {
      const todo = state.todos.find(
        (todo) => todo.key === action.payload.key
      );
      if (todo) todo.completed = action.payload.completed;
    },
    setCompletedAll: (state) => {
      state.completedAll =
        state.todos.findIndex((todo) => todo.completed === false) ==
        -1;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodoComplete,
  setCompletedAll,
} = todoSlice.actions;

export default todoSlice.reducer;
