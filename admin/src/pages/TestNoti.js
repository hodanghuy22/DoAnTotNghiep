import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const TestNoti = () => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7112/notification')
      .withAutomaticReconnect()
      .build();

    newConnection.on('ReceiveNotification', (message) => {
      console.log("asdasa ",message); // Log the message to the console
      setNotification(message);
    });

    newConnection
      .start()
      .catch((error) => console.error('Error establishing SignalR connection:', error));

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  return (
    <div>
      <h1>Notification: {notification}</h1>
    </div>
  )
}

export default TestNoti