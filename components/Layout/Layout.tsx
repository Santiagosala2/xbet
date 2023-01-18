import { Dispatch, SetStateAction } from 'react'
import Navbar from '../NavBar/NavBar'

type LayoutProps = {
    children: React.ReactNode,
    userBalance?: number
}

export default function Layout({ children , userBalance }: LayoutProps) {
  return (
    <>
      <Navbar userBalance={userBalance} />
      <main>{children}</main>
    </>
  )
}

