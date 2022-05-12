import { useRef, useState, useEffect } from 'react'
import InputField from '../components/InputField'
import { useApi } from '../contexts/ApiProvider'
import { useNavigate, useParams} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ChatView = () => {
  const api = useApi();
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  let {buyerId, listingId} = useParams();
  let chatId = useRef<number | null>(null);
  const [messages, setMessages] = useState<any[]>([])

  if (!currentUser) {
    navigate('/')
  };
 
  const socket = api.getSocket();
  const newMessageField = useRef<HTMLInputElement>(null)

  const sendMessage = () => {
    if (newMessageField.current && newMessageField.current.value) {
      const msg = newMessageField.current.value.trim();
      if (msg !== '') {
        socket.emit('message', msg, chatId.current)
        newMessageField.current.value = ''
      }      
    }
  }

  useEffect(() => {
    const id = buyerId ? buyerId : currentUser?.id
    socket.connect();

    socket.emit(
      "getChat", listingId, id, (res : {ok:boolean, data:any}) => {
        if (res.ok) {
          chatId.current = res.data.chatId
          socket.emit("joinChat", chatId.current)
          setMessages(res.data.messages)
        } 
      })

    socket.on('messageResponse', (res :{ok:boolean, data:any}) => {
      if (res.ok) {
        setMessages((messages) => {
          return [...messages, ...res.data.messages]
        })
      }
    })

    return () =>  { 
      socket.disconnect() 
    };
  }, [socket, buyerId, listingId, currentUser])

  return (
    <>{messages.length > 0 && 
      <div>
        message.body
      </div>
    }
      <InputField 
        name={'newMessage'}
        as={'textarea'}
        fieldref={newMessageField}
      />
      <button type='submit' onClick={sendMessage}>Send</button>
    </>
  )
}

export default ChatView