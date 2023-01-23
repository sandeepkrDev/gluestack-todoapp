import React from 'react'
import { useData } from '../context/data';
import { ITodo } from '../interfaces';
import { InsertTodoMutationVariables, useInsertTodoMutation } from '../services/__generated__';
import styles from "../styles/InputBox.module.css";

const InputForm = () => {
  const { addTodo }: any = useData();
  const [todoInput, setTodoInput] = React.useState("");

  const [insertData, { loading, error }] = useInsertTodoMutation()

  if (error) {
    console.error("someting went wrong! \n", error)
    return;
  }

  const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: InsertTodoMutationVariables = {
      title: todoInput,
      is_completed: false,
    }

    try {
      const { data } = await insertData({ variables: newTodo, refetchQueries: ["FetchTodos"] })
      addTodo(data?.insert_todos?.returning[0])
      setTodoInput("")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={styles.inputbox} onSubmit={addTodoHandler}>
      <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
      <button type='submit' disabled={!todoInput ?? true}>{loading ? "..." : "Add"}</button>
    </form>
  )
}

export default InputForm
