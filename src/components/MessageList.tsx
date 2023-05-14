import { myMessages } from "../interfaces/myMessages.ts";
import Message from "./Message";

interface Props {
  myMessagesList: myMessages[];
}

function MessagesList({ myMessagesList}: Props) {


  return (
    <div>
      {myMessagesList.map((message) =>
        message.client ? (
          <Message
            key={message.id}
            id={message.id}
            message={message.message}
            createdAt={message.createdAt}
            client={message.client}
            senderId = {message.senderId}
          />
        ) : (
          <Message
            key={message.id}
            id={message.id}
            message={message.message}
            createdAt={message.createdAt}
            senderId = {message.senderId}
          />
        )
      )}
    </div>
  );
}

export default MessagesList;
