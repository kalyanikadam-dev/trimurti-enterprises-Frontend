import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HelpChatButton } from './components/HelpChatButton'
import { SocialBar } from './components/SocialBar'
import './index.css'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <HelpChatButton />
      <SocialBar />
    </>
  )
}
