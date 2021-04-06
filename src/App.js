import {useState} from 'react';
import RealtimeClient from './RealtimeClient';
import Guid from 'guid';
import {ChatHeader, ChatWindow, UserNamePrompt} from './components';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

function App() {
  const getClientId = () => 'web-client:' + Guid.raw();
  const getMessageId = () => 'message-id:' + Guid.raw();

  const [state,setState] = useState({
    users: [],
    messages: [],
    clientId: getClientId(),
    isConnected: false,
  });
  const [client,setClient] = useState(null);


  const connect = (username) => {
    setState({ ...state, username });
    let client = RealtimeClient(state.clientId, username);
    
    client.connect()
    .then(() => {
      setState({ isConnected: true });
      client.onMessageReceived((topic, message) => {
        if (topic === "client-connected") {
          setState({ ...state,users: [...state.users, message] })
        } else if (topic === "client-disconnected") {
          setState({ ...state,users: state.users.filter(user => user.clientId !== message.clientId) })
        } else {
          setState({ ...state, messages: [...state.messages, message] });
        }
      })
    })
    setClient(client);
  }

  const onSend  = (message) => {
    client.sendMessage({
        username: state.username,
        message: message,
        id: getMessageId(),
    });
  };
  
  return (
    <div className="App">
      <ChatHeader
          isConnected={ state.isConnected }
      />
      <ChatWindow
          users={ state.users }
          messages={ state.messages }
          onSend={ onSend }
      />
      <UserNamePrompt
          onPickUsername={ connect }
      />
    </div>
  );
}

export default App;
