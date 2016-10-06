import React from 'react';

const Message = React.createClass({
  render() {
    return (
      <div className='message'>
        <span className='username' style={{color: this.props.color}}>{this.props.username}</span>
        <span className='content'>{this.props.content}</span>
      </div>
    );
  }
});

const SystemMessage = React.createClass({
  render() {
    return (
      <div className='message system'>
        <span className='content'>{this.props.content}</span>
      </div>
    );
  }
});

export {Message as default, SystemMessage};