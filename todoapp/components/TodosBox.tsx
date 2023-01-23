import React from 'react';
import { useData } from '../context/data';
import { getUser } from '../context/user';
import { ITodo } from '../interfaces';
import { useFetchTodosQuery } from '../services/__generated__';
import styles from "../styles/TodoBox.module.css";
import TodoItem from './TodoItem';

const PendingBox = () => {
  const { user }: any = getUser();
  const { todos, editTodo, markComplete, deleteTodo }: any = useData();

  const onChange = (todo: ITodo, type: string, newTitle?: string) => {
    switch (type) {
      case 'edited':
        editTodo({ id: todo.id, newTitle })
        break;
      case 'completed':
        markComplete({ id: todo.id, isCompleted: !todo.is_completed })
        break;
      case 'deleted':
        deleteTodo(todo.id)
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    if (user) {
      
      // setT
    }

  }, [user])

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <p>Todos</p>
      </div>
      <div className={styles.body}>
        {todos.map((todo: ITodo) => (
          <TodoItem key={todo.id} todo={todo} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

export default PendingBox
