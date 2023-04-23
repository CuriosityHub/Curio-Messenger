import React, { useContext } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import { StyleContext } from '../context/StyleContext';

const Chat = () => {

  const { data } = useContext(ChatContext);
  const { handleChatResPrev } = useContext(StyleContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span className='arrowback-icon'><BiArrowBack onClick={() => { handleChatResPrev() }} /></span>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <BsFillCameraVideoFill className='icon' />
          <AiOutlineUserAdd className='icon' />
          <FiMoreHorizontal className='icon' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat