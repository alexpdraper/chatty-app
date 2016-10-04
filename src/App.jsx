import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  render() {
    return (
      <div>
        <MessageList />
        <ChatBar />
      </div>
    );
  }
});

export default App;
