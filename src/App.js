
import React from 'react';
// import './App.css';
import { TodoCounter } from "./TodoCounter"
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';

const todos = [
  {text: "Jugar Clash Royal", completed: false},
  {text: "Estudiar React", completed: true},
];

function App() {
  return (
    <React.Fragment>
      <TodoCounter />

      {/* <TodoSearch /> */}
      <input placeholder="Cebolla" />
      <TodoList>
        {todos.map(todo => (
          <TodoItem key={todo.text} text={todo.text}/>
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
