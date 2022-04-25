import React from 'react';
import './TodoItem.css';

function TodoItem ({onDelete, onComplete, todo}) {
    return (
        <li className="TodoItem"> 
        <input type="checkbox"
            checked={todo.status}
            onChange={(e) => {
                onComplete(todo.id,  e.target.checked);
            }}
        />
        <p className={`TodoItem-p ${todo.status && 'TodoItem-p--complete'}`}>
            {todo.name}
        </p>
        <span className="Icon Icon-delete" onClick={() => onDelete(todo.id)}>
            
            X
        </span>
        </li>
    );
}

export { TodoItem };