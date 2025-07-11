import { useEffect } from 'react';
import Api from '../api';

export default function Page1() {
  useEffect(() => {
    Api.CHATS.SEND({
      sessionId: '12345',
      senderType: 'user',
      senderId: '67890',
      content: 'Hello, this is a test message.',
    }).then(response => {
      console.log('Message sent successfully:', response);
    })
  }, []);
  return <div>Page 1 Content</div>;
}
