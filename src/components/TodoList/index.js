import React from "react";
import './TodoList.css';
import {TodoItem} from '../TodoItem';

function TodoList ({onDelete, onComplete, todos}) {
    return (
        <section>
            {
                todos.map((todo) => (<TodoItem key={todo.id} onDelete={onDelete} onComplete={onComplete} todo={todo}/>))
            }
        </section>
    );
}

export { TodoList };