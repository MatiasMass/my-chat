// export default App;
import React, { useState, useEffect, useRef } from "react";
import socketIOClient, {Socket} from "socket.io-client";
import { myMessages } from "./interfaces/myMessages";
import MessagesList from "./components/MessageList";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [myMessagesList, setMyMessagesList] = useState<myMessages[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const urlBackend = "https://my-chat-app-y6dn.onrender.com/"


  useEffect(() => {
  
    const newSocket = socketIOClient(urlBackend);
    setSocket(newSocket);

    newSocket.on("message", (data: { message: string; id: string }) => {
      console.log(data.message);
      setMyMessagesList((prevMessages) => [
        ...prevMessages,
        {
          id: window.crypto.randomUUID(),
          message: data.message,
          createdAt: new Date(),
          client: false,
          senderId: data.id,
        },
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message === "") {
      alert("Please enter a message");
      return;
    }

    if (socket) {
      socket.emit("message", { message, id: socket.id });
    }

    setMyMessagesList((prevMessages) => [
      ...prevMessages,
      {
        id: window.crypto.randomUUID(),
        message,
        createdAt: new Date(),
        client: true,
        senderId: socket ? socket.id : "",
      },
    ]);

    setMessage("");
  };

  useEffect(() => {
    // Hacer scroll hacia abajo después de cada actualización de messages
    if (scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  }, [myMessagesList]);

  return (
    <div className="App">
      <h1 className="title">My Chat</h1>
      <div className="messages-container" ref={scroll}>
        <MessagesList myMessagesList={myMessagesList} />
      </div>
      <div className="form-container">
        <h2 className="subtitle">Send messages</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send your message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
