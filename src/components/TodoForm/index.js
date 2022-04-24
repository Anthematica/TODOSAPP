import React from 'react';
import './TodoForm.css'

function TodoForm (props) {

    const [newTodoValue, setNewTodoValue] = React.useState('');
    const onCancel = () => {
        props.setOpenModal(false);
    };

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };


    const onSubmit = (event) => {
        event.preventDefault();

        props.addTodo(newTodoValue);
        props.setOpenModal(false);
    };

   
    return (
        <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo TODO</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Write a task to do"
                name='name'
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    className="TodoForm-button TodoForm-button--cancel"
                    onClick={onCancel}
                >
                Cancelar
                </button>
                <button
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                Añadir
                </button>
            </div>
        </form>
    );
}

export { TodoForm };