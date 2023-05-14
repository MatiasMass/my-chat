import { myMessages } from "../interfaces/myMessages.ts";
import "./Message.css";

function Message({ message, createdAt, client, senderId }: myMessages) {
  return (
    // Agrega paréntesis adicionales alrededor de la estructura condicional
    client ? (
      <div className="message-container">
        <p className="date">{createdAt.toLocaleString()}</p>
        <p className="message">{message}</p>
      </div>
    ) : (
      <div className="message-container-server">
        <p className="socketId">Usuario: {senderId}</p>
        <p className="date">{createdAt.toLocaleString()}</p>
        <p className="message">{message}</p>
      </div>
    )
  );
}

export default Message;
