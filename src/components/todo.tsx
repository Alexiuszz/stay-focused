import React, { ChangeEvent, useState } from "react";
import BoardContainer from "./boardContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addTodo,
  toggleTodoComplete,
} from "@/redux/slices/todos-slice";

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
    dispatch(
      addTodo({
        key: todos.length.toString(),
        completed: false,
        task: newTodo,
        createdAt: new Date(),
      })
    );
    setNewTodo("");
  };

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
        {todos.map((todo, i) => (
          <div className="flex items-end justify-between w-11/12">
            {!todo.completed ? (
              <p>{todo.task}</p>
            ) : (
              <p className="text-slate-500 line-through">
                {todo.task}
              </p>
            )}
            <input
              type="checkbox"
              name="check"
              onChange={(e) => toggleTodo(e, todo.key)}
              checked={todo.completed}
            />
          </div>
        ))}
      </BoardContainer>
    </div>
  );
}

export default Todo;
