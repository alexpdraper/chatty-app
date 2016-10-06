import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

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
      const message = JSON.parse(event.data);
      if (message.type === 'message' || message.type === 'notification') {
        this.addNewMessage(message);
      } else {
        console.log('Unknown message type');
      }
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
    // Send to the socket server
    this.socket.send(JSON.stringify(message));
  },

  sendNotification(content) {
    this.sendMessage({
      type: 'notification',
      content
    });
  },

  updateUsername(name) {
    if (name !== this.state.currentUser.name) {
      console.log('Updating username from:', this.state.currentUser.name, ' to:', name);
      this.sendNotification(`${this.state.currentUser.name} changed their username to ${name}`);
      let newState = Object.assign({}, this.state, {currentUser: {name: name}});
      this.setState(newState);
    }
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
