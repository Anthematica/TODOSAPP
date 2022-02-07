
import React from 'react';
// import './App.css';
import { TodoCounter } from "./TodoCounter"
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import { TodoSearch } from './TodoSearch';

const todos = [
  {text: "Jugar Clash Royal", completed: false},
  {text: "Estudiar React", completed: true},
  {text: "Estilizar mi Todo", completed: true},
  {text: "Estudiar Ingles", completed: true},
];

function App() {
  return (
    <React.Fragment>
      <TodoCounter />

      <TodoSearch /> 

      <TodoList>
        {todos.map(todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed = {todo.completed}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
