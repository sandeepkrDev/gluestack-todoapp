export interface ITodo {
  id?: number
  title: string
  is_completed: boolean
  user_id?: number
  created_at?: string
  updated_at?: string
}

export interface IUser {
  id: number
  name: string
  email: string
  token: string
  todos: ITodo[]
}

export interface IProviderProps {
  children: React.ReactNode
}

export interface IMarkComplete {
  id: number
  isCompleted: boolean
}

export interface SignInForm {
  email: string
  password: string
}

export interface SignUpForm extends SignInForm {
  name: string
}