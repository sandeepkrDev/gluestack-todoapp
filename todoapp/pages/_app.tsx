import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getUser, UserProvider } from '../context/user'
import { DataProvider } from '../context/data'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from "../services/apolloClient";

export default function App({ Component, pageProps }: any) {
  return <UserProvider>
    <MyApp>
      <Component {...pageProps} />
    </MyApp>
  </UserProvider>
}

const MyApp = ({ children }: { children: React.ReactNode }) => {
  const { user }: any = getUser();

  return (
    <ApolloProvider
      client={createApolloClient(user?.token)}>
      <DataProvider>{children}</DataProvider>
    </ApolloProvider>
  )
}