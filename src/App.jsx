import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 0,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 1,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

const App = React.createClass({
  getInitialState() {
    let data = {
      currentUser: {
        name: "Bob"
      },
      messages: []
    };
    return data;
  },

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    this.socket.onopen = function(event) {
      console.log('Open socket!');
    };

    this.socket.onmessage = (event) => {
      this.addNewMessage(JSON.parse(event.data));
    };
    console.log('componentDidMount <App />');
  },

  addNewMessage(message) {
    // Add a new message to the list of messages in the data store
    this.state.messages.push(message);
    // Update the state of the app component. This will call render()
    this.setState({messages: this.state.messages});
  },

  sendMessage(message) {
    // Set the message username to the name of the current user or 'Anonymous'
    message.username = this.state.currentUser.name || 'Anonymous';
    // Send to the socket server
    this.socket.send(JSON.stringify(message));
  },

  updateUsername(name) {
    console.log('Updating username to:', name);
    let newState = Object.assign({}, this.state, {currentUser: {name: name}});
    this.setState(newState);
  },

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          initialUsername={this.state.currentUser.name}
          submitMessage={this.sendMessage}
          updateUsername={this.updateUsername} />
      </div>
    );
  }
});

export default App;
