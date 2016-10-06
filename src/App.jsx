import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Header from './Header.jsx';

const App = React.createClass({
  getInitialState() {
    let data = {
      currentUser: {
        name: ''
      },
      messages: [],
      numUsers: 0,
      color: 'tomato'
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
      } else if (message.type === 'usercount') {
        this.setState({numUsers: message.numUsers});
      } else if (message.type === 'setColor') {
        this.setState({color: message.color});
      } else {
        console.log('Unknown message type', message);
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
    if (message.color) {
      this.setState({color: message.color});
      return;
    }

    // Set the message color
    message.color = this.state.color;
    // Send to the socket server
    this.socket.send(JSON.stringify(message));
  },

  sendNotification(content) {
    this.socket.send(JSON.stringify({
      type: 'notification',
      content
    }));
  },

  updateUsername(name) {
    if (name !== this.state.currentUser.name) {
      let prevName = this.state.currentUser.name || 'Anonymous';
      let newName = name || 'Anonymous';
      this.sendNotification(`${prevName} changed their name to ${newName}`);
      let newState = Object.assign({}, this.state, {currentUser: {name: name}});
      this.setState(newState);
    }
  },

  render() {
    return (
      <div>
        <Header numUsers={this.state.numUsers} color={this.state.color} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          initialUsername={this.state.currentUser.name}
          submitMessage={this.sendMessage}
          updateUsername={this.updateUsername}
          color={this.state.color} />
      </div>
    );
  }
});

export default App;
