
import React from 'react';
// import './App.css';
import { TodoCounter } from "./TodoCounter"
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import { TodoSearch } from './TodoSearch';

const defaulTodos = [
  {text: "Jugar Clash Royal", completed: false},
  {text: "Estudiar React", completed: false},
  {text: "Estilizar mi Todo", completed: true},
  {text: "Estudiar Ingles", completed: true},
  {text: "Estudiar Ingles2", completed: true},
];

function App() {
  const localStorageTodos = localStorage.getItem("TODOS_V1"); 
  let parsedTodos;

  //validar si el usuario esta entrando por primera vez o no
  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify(defaulTodos));
   parsedTodos = defaulTodos;
 } else {
   parsedTodos = JSON.parse(localStorageTodos);
 }
  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState('');

  //Count todos completed
  const completedTodos = todos.filter(todo => todo.completed == true).length;
  const totalTodos = todos.length;

  //Filtering searching
  let searchedTodos = [];

  if (!searchValue.length >= 1){
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();

      //Validar si el texto que estamos escribiendo esta incluido en los Todos
      return todoText.includes(searchText);
    })
  }
  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    setTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };


  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />

      <TodoSearch
        searchValue={searchValue}
        setSearchValue= {setSearchValue}
      /> 

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed = {todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;