
import React from 'react';
import { TodoCounter } from "./components/TodoCounter"
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { CreateTodoButton } from './components/CreateTodoButton';
import { TodoSearch } from './components/TodoSearch';
import { Modal } from './Modal/index.js';
import { TodoForm } from './components/TodoForm'

function App() {
  const localStorageTodos = localStorage.getItem("TODOS_V1"); 
  let parsedTodos;

  //validar si el usuario esta entrando por primera vez o no
  if (!localStorageTodos) {
    //Con JSON.stringiFy convertimos a string 
    localStorage.setItem('TODOS_V1', JSON.stringify([]));
    parsedTodos = [];
} else {
   //Con Json.parse lo pasamos de string a objeto
    parsedTodos = JSON.parse(localStorageTodos);
}

 /* React.useState retorno un arreglo de dos elementos, donde en la posición 0 es el estado inicial, 
  y en la posición 1 se ejecuta una función que cambia el estado de la variable */
  const [todos, setTodos] = React.useState(parsedTodos); //Estos es un hook
  const [searchValue, setSearchValue] = React.useState('');

  //Todo hook empieza con la palabra use

  const [openModal, setOpenModal] = React.useState(false);

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

  //Puente entre delete y complete, para que se persistan los datos
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

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
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

      { openModal && (
          <Modal>
            <TodoForm 
              setOpenModal = {setOpenModal}
              addTodo = {(text) => addTodo(text)}
            />
          </Modal>
      )}   
    

      <CreateTodoButton
        setOpenModal = {setOpenModal}
      />

    </React.Fragment>
  );
}

export default App;