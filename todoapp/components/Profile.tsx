import React from 'react'
import Link from "next/link";
import styles from "../styles/Profile.module.css";
import { getUser } from '../context/user';

const Profile = () => {
  const { user, removeUser }: any = getUser();

  const logOutHandler = () => removeUser();

  return (
    <div className={styles.profile}>
      {user ? <>
        {user.name}
        {" "}
        <button className={styles.loginButton} onClick={logOutHandler}>Sign out</button>
      </> : <Link href={'/signin'} >
        <button className={styles.loginButton}>Login</button>
      </Link>}
    </div>
  )
}

export default Profile
