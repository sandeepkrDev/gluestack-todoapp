import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { IProviderProps, IMarkComplete, ITodo } from '../interfaces';
import { FetchTodosDocument, FetchTodosQuery, FetchTodosQueryVariables, useFetchTodosLazyQuery, useFetchTodosQuery } from '../services/__generated__';
import { getUser } from './user';

const Data = React.createContext({});

export function useData() {
  return React.useContext(Data);
}

export const DataProvider = ({ children }: IProviderProps) => {
  const { user }: any = getUser();
  const [todos, setTodos] = React.useState<ITodo[]>([])

  const addTodo = (todo: ITodo) => {
    setTodos([...todos, { id: todo.id, title: todo.title, is_completed: todo.is_completed }]);
  }

  const editTodo = ({ id, newTitle }: any) => {
    const editedTodos: ITodo[] = todos.map(todo => todo.id === id ? {
      ...todo, title: newTitle
    } : todo);

    setTodos(editedTodos);
  }

  const markComplete = ({ id, isCompleted }: IMarkComplete) => {
    const updatedTodos: ITodo[] = todos.map(todo => todo.id === id ? {
      ...todo, isCompleted: isCompleted
    } : todo);

    setTodos(updatedTodos);
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const [fetchTodosLazily, { loading, error, data }] = useLazyQuery<FetchTodosQuery, FetchTodosQueryVariables>(FetchTodosDocument);

  React.useEffect(() => {
    if (user) {
      fetchTodosFunc();
    };
  }, [user]);

  const fetchTodosFunc = async () => {
    console.log("FUNC")
    try {
      const data_ = await fetchTodosLazily();
      console.log("DATA", data_);
    } catch (error_) {
      console.log("error > \n", error_)
    }
  }

  return (
    <Data.Provider value={{ todos, setTodos, addTodo, editTodo, markComplete, deleteTodo }}>
      {children}
    </Data.Provider>
  )
}
