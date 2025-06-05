import React from 'react'
import Image from 'next/image';
import { useChatModalStore } from '../../states';

const ChatBtn = ({ onClick }) => {

   const { isChatModalOpen } = useChatModalStore();

  return (
    <div className="chat-btn" onClick={onClick}>
        <div className="chat-btn__wrapper">
            <div className="chat-btn__pulse-circle"></div>
            <div className="chat-btn__chat-icon">
                <Image src={`${isChatModalOpen ? '/icons/close.svg' : '/icons/chat.svg'}`} 
                width="80" height="80" alt="" />
            </div>    
        </div> 
    </div>
  )
}

export default ChatBtn
