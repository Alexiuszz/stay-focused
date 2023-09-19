import React, { ChangeEvent, useEffect, useState } from "react";
import BoardContainer from "./boardContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addTodo,
  toggleTodoComplete,
} from "@/redux/slices/todos-slice";
import { storeTodos } from "@/storage/todoStorage";

function Todo() {
  const todos = useAppSelector((state) => state.todo.todos);
  const [newTodo, setNewTodo] = useState<string>("");
  const dispatch = useAppDispatch();

  const toggleTodo = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) =>
    dispatch(
      toggleTodoComplete({
        key: key,
        completed: event.target.checked,
      })
    );

  const createTodo = () => {
    let todo = {
      key: todos.length.toString(),
      completed: false,
      task: newTodo,
      createdAt: new Date().toString(),
    };
    dispatch(addTodo(todo));
    setNewTodo("");
  };

  useEffect(() => {
    storeTodos([...todos]);
  }, [todos]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <div className="w-1/2">
      <BoardContainer>
        <p className="text-sm">Make a list of things to do today!</p>
        <div className="flex justify-between items-end w-11/12">
          <input
            type="text"
            className="bg-transparent border-b-2 border-white px-2 py-1 focus:outline-none w-4/5"
            placeholder="Add Task"
            value={newTodo}
            onChange={handleChange}
          />
          <div
            onClick={() => newTodo.length > 0 && createTodo()}
            className="flex items-center justify-center cursor-pointer p-1 w-6 h-6 text-xs bg-slate-500 rounded-sm shadow-sm shadow-black hover:bg-slate-600"
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        {todos.map((todo, i) => {
          return (
            !todo.completed && (
              <div
                className="flex items-end justify-between w-11/12"
                key={i}
              >
                <p>{todo.task}</p>
                <input
                  type="checkbox"
                  name="check"
                  onChange={(e) => toggleTodo(e, todo.key)}
                  checked={todo.completed}
                  className="rounded w-4 h-4"
                />
              </div>
            )
          );
        })}
        <div className="w-full h-px bg-white" />
        {todos.map((todo, i) => {
          return (
            todo.completed && (
              <div
                className="flex items-end justify-between w-11/12"
                key={i}
              >
                <p className="text-slate-500 line-through">
                  {todo.task}
                </p>
                <input
                  type="checkbox"
                  name="check"
                  onChange={(e) => toggleTodo(e, todo.key)}
                  checked={todo.completed}
                  className="rounded w-4 h-4"
                />
              </div>
            )
          );
        })}
      </BoardContainer>
    </div>
  );
}

export default Todo;
