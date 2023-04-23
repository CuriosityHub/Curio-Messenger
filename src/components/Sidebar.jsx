import React, { useContext } from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'
import { StyleContext } from '../context/StyleContext'

const Sidebar = () => {

  const { chatRes } = useContext(StyleContext);

  console.log(chatRes);

  return (
    <div className={chatRes ? 'sidebarHide' : 'sidebar'}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar