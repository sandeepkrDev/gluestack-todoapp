import React from 'react'
import Link from "next/link";
import styles from "../styles/auth.module.css";
import homeStyle from "../styles/Home.module.css";
import { SignInForm } from '../interfaces';
import { getUser } from '../context/user';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { updateUser }: any = getUser();
  const router = useRouter();

  const [formData, setFormData] = React.useState<SignInForm>({
    email: "",
    password: ""
  });

  const onChangeInput = (e: { target: { value: string; name: string }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return console.log("Please fill all fields!")
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENGINE_AUTH_URL}/signin`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!data.success) return console.log(data.message);

      updateUser({
        id: data?.data?.id,
        name: data?.data?.name,
        email: data?.data?.email,
        token: data?.data?.token
      })

      router.push("/")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.main}>
        <div className={styles.authForm}>
          <p>SignIn</p>
          <form className={styles.form} onSubmit={submitHandler}>
            <label id='email'>Email :</label>
            <input name='email' type="text" placeholder='Email' value={formData.email} onChange={onChangeInput} />
            <label id='password'>Password :</label>
            <input name='password' type="password" placeholder='Password' value={formData.password} onChange={onChangeInput} />
            <input type="submit" value="Submit" />
          </form>
          <span>Don't have an account! <Link href={"/signup"}>SignUp</Link></span>
          <br />
          <span>Go to <Link href={"/"}>Home</Link></span>
        </div>
      </main>
    </div>
  )
}

export default SignIn
