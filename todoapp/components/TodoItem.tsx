import React from 'react'
import { ITodo } from '../interfaces'
import styles from "../styles/TodoBox.module.css";

const TodoItem = (props: { todo: ITodo, onChange: any }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(props.todo.title);

  const editHandler = () => {
    props.onChange(props.todo, 'edited', newTitle)
    setIsEdit(false);
  }

  const updateHandler = () => {
    props.onChange(props.todo, 'completed')
  }

  const deleteHandler = () => {
    props.onChange(props.todo, 'deleted')
  }
  return (
    <div className={styles.todo}>
      {isEdit ? <>
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <button onClick={() => setIsEdit(false)}><code>Esc</code></button>
        <button onClick={editHandler}><code>Save</code></button>
      </> : <>
        <input type="checkbox" checked={props.todo.is_completed} onChange={updateHandler} />
        <span className={props.todo.is_completed ? "completed" : ""}>{props.todo.title}</span>
        <button onClick={() => setIsEdit(true)}><code>Edit</code></button>
        <button onClick={deleteHandler}><code>DEL</code></button>
      </>}
    </div>
  )
}

export default TodoItem
