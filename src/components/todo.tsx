import React, { ChangeEvent, useEffect, useState } from "react";
import BoardContainer from "./boardContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addTodo,
  deleteTodo,
  toggleTodoComplete,
} from "@/redux/slices/todos-slice";
import { prevTodos, storeTodos } from "@/storage/todoStorage";

function Todo({
  openPrevTodos,
  setOpenPrevTodos,
}: {
  openPrevTodos: boolean;
  setOpenPrevTodos: () => void;
}) {
  const todos = useAppSelector((state) => state.todo.todos);
  const prevTodosList = prevTodos();
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

  const createTodo = (todoTask: string) => {
    const todo = {
      key: todos.length.toString(),
      completed: false,
      task: todoTask,
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
    <div className="w-11/12 mdw-3/5 h-80 md:h-fit mx-auto max-h-72 min-w-fit z-10 ">
      <BoardContainer>
        <div
          onClick={(e) => {
            setOpenPrevTodos();
            e.stopPropagation();
          }}
          className="absolute top-4 left-2 w-6 h-6 p-1 flex justify-between cursor-pointer text-sm"
        >
          <FontAwesomeIcon icon={faClock} />
          {openPrevTodos && (
            <div className="w-72 h-fit py-2 bg-slate-500 rounded-md">
              {prevTodosList.length < 1 && (
                <p>No tasks from yesterday</p>
              )}
              {prevTodosList.map((todo, i) => (
                <div key={i} className="w-11/12 h-fit flex items-end justify-between">
                  <p className="text-slate-500 ">{todo.task}</p>
                  <div
                    onClick={() => createTodo(todo.task)}
                    className="flex items-center justify-center cursor-pointer p-1 w-6 h-6 text-xs bg-slate-500 rounded-sm shadow-sm shadow-black hover:bg-slate-600"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
            onClick={() => newTodo.length > 0 && createTodo(newTodo)}
            className="flex items-center justify-center cursor-pointer p-1 w-6 h-6 text-xs bg-slate-500 rounded-sm shadow-sm shadow-black hover:bg-slate-600"
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        {todos.map((todo, i) => {
          return (
            !todo.completed && (
              <div
                className={`flex items-end justify-between w-11/12 relative p-2 rounded-md ${
                  i % 2 > 0 && "bg-slate-500"
                }`}
                key={i}
              >
                <div
                  onClick={() => dispatch(deleteTodo(todo.key))}
                  className="flex justify-center overflow-hidden p-1 items-center h-2 w-2 cursor-pointer rounded-full bg-red-500 shadow-sm shadow-black absolute top-0 -left-3 text-xs"
                >
                  &#10005;
                </div>
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
