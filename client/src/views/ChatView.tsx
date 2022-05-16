import { useRef, useState, useEffect } from 'react'
import InputField from '../components/InputField'
import { useApi } from '../contexts/ApiProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Socket } from 'socket.io-client'
import ChatHeader from '../components/ChatHeader'
import { listingChatPreview } from '../interfaces/Listing'
import "../styling/ChatView.scss"



let socket: Socket;

const ChatView = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  let { listingId } = useParams();
  let chatId = useRef<number | null>(null);
  const [messages, setMessages] = useState<any[]>([])
  const { state }  = useLocation() as {state: listingChatPreview};

  if (!currentUser) {
    navigate('/')
  };

  const newMsgField = useRef<HTMLInputElement>(null)

  const sendMessage = () => {
    if (newMsgField.current && newMsgField.current.value) {
      const msg = newMsgField.current.value.trim();
      if (msg !== '' && socket) {
        socket.emit('message', msg, listingId, chatId.current, (res: any) => {
          console.log('message callback')
          if (res.ok) {
            if (!chatId.current) {
              console.log('joining chat after new message');
              chatId.current = res.data.chatId;
              socket.emit("joinChat", chatId.current);
              setMessages([res.data.message])
            } else {
              setMessages((messages)=> [...messages, res.data.message])
            }
          }
        })
      }
        newMsgField.current.value = ''
      }
    }
  

  useEffect(() => {
    async function init() {
      if (!socket) {
        const io = await api.getSocket();
        socket = io as Socket;
      }
      const buyerId = state.buyerId ? state.buyerId : currentUser?.id;
      if (socket) {
        console.log('socket connection exists')
        socket.connect();
        socket.emit(
          "getChat", listingId, buyerId, (res: { ok: boolean, data: any }) => {
            if (res.ok) {
              chatId.current = res.data.chatId
              console.log('joining chat')
              socket.emit("joinChat", chatId.current)
              setMessages(res.data.messages)
            }
          })

        socket.on('messageResponse', (res: { ok: boolean, data: any }) => {
          console.log('messages being received by all clients')
          if (res.ok) {
            setMessages((messages) => {
              return [...messages, res.data.message]
            })
          }
        })
      } else {
        console.log('no socket connection')
      }
    }
    init();

    return () => {
      if (socket) {
        socket.disconnect()
      }
    };
  }, [api, state, listingId, currentUser])

  return (
    <div className='ChatView'>
      <ChatHeader listing={state}/>
      <div className='messages'>
      {messages.length > 0 && messages.map(message => {
        return (<div key={message.id}>
          {message.body}
        </div>)
      })
      }
      </div>
      <div className='messageInput'>
        <InputField
          name={'newMessage'}
          as={'textarea'}
          fieldref={newMsgField}
        />
        <button type='submit' onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatView