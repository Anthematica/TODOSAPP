
import React,{useEffect} from 'react';
import ky from 'ky';
import { TodoCounter } from "./components/TodoCounter"
import { TodoList } from './components/TodoList';
import { CreateTodoButton } from './components/CreateTodoButton';
import { Modal } from './Modal/index.js';
import { TodoForm } from './components/TodoForm'

function App() {
  const [todos, setTodos] = React.useState([]);

  //Listar todos
  useEffect(() => {
    try {
      (async () =>{
        const json = await ky.get('http://127.0.0.1:8000/api/v1/todos').json();
        setTodos(json.data);
      })();
    } catch (error) {
      console(error);
    }
  }, []);

  // const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  //Count todos completed
  const completedTodos = todos.filter(todo => todo.status == true).length;
  const totalTodos = todos.length;

  //Completed todo
  async function completeTodo(id,completed){
    const resp = await ky.patch(`http://localhost:8000/api/v1/todos/${id}`, {
      json: {
        status:completed,
      },
    }).json()

    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return resp.data
        }

        return todo
      })
    })
  };

  //Add a todo 
  async function addTodo (text) {
    const resp = await ky.post('http://127.0.0.1:8000/api/v1/todos', {
        json: {
          name:text,
        },
    }).json();
    setTodos((todos)=> [...todos, resp.data]);
  };

  //Delete todo
  async function deleteTodo(id) {
    await ky.delete(`http://localhost:8000/api/v1/todos/${id}`).json();

    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />

      <TodoList 
        onDelete={deleteTodo} 
        onComplete={completeTodo} 
        todos={todos} 
      />

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