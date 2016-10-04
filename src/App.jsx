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
    return data;
  },

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      this.addNewMessage({
        username: "Michelle",
        content: "Hello there!"
      });
    }, 3000);
  },

  addNewMessage(message) {
    let messages = this.state.messages;
    // Assign the id to be 1 more than the id of the last message
    Object.assign(message, {id: messages[messages.length - 1].id + 1});
    // Add a new message to the list of messages in the data store
    this.state.messages.push(message);
    // Update the state of the app component. This will call render()
    this.setState({messages: this.state.messages});
  },

  updateUsername(name) {
    let newState = Object.assign({}, this.state, {currentUser: {name: name}});
    this.setState(newState);
  },

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          username={this.state.currentUser.name}
          submitMessage={this.addNewMessage}
          handleUsernameChange={this.updateUsername} />
      </div>
    );
  }
});

export default App;
