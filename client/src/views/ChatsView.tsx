import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBody from '../components/AppBody';
import { useApi } from '../contexts/ApiProvider';
import { useAuth } from '../contexts/AuthContext';
import '../styling/ChatsView.scss';

const ChatsView = () => {
  const auth = useAuth();
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const res = await api.get(`/chats`);
      console.log(res);
      if (res.ok) {
        setChats(res.body.data);
      } else {
        console.log('failing to load user chats data');
        // handleErrors
      }
    };
    loadUserData();
  }, [api]);
  return (
    <AppBody>
      <div className='ChatsView'>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigate(`/chats/${chat.listingId}`, {state:{ 
              photoUrls: chat.listingPhotoUrls,
              id: chat.listingId,
              buyerId: chat.buyerId,
              sellerId: chat.sellerId,
              userFirstName: chat.sellerFirstName,
              userLastName: chat.sellerLastName,
              title: chat.listingTitle,
              priceInCents: chat.priceInCents,
              status: chat.listingStatus 
            }})}
          >
            <div className="chat-element">
              <img className="image-preview" src={chat.listingPhotoUrls[0]} alt="product sold" />
              <div className="info-container">
                <div className="top-info">
                  <p>{auth.currentUser?.id === chat.buyerId ? `${chat.sellerFirstName} ${chat.sellerLastName[0]}.` : chat.buyerName}</p>
                  <p>
                    {new Date(chat.updatedAt).toLocaleDateString('en-BE', {
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <p className="listing-title">{chat.listingTitle}</p>
                <p>{chat.lastMessage.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppBody>
  );
};

export default ChatsView;

interface ChatPreview {
  id: string;
  sellerId: string;
  sellerFirstName: string;
  sellerLastName: string;
  buyerId: string;
  buyerName: string;
  listingId: string;
  listingTitle: string;
  listingPhotoUrls: string[];
  listingStatus: string;
  priceInCents: number;
  currency: string;
  lastMessage: { id: string; body: string; senderId: string };
  createdAt: Date;
  updatedAt: Date;
}
