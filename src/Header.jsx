import React from 'react';

const Header = React.createClass({
  render() {
    return (
      <nav style={{backgroundColor: this.props.color}}>
        <h1>Chatty</h1>
        <span>{this.props.numUsers} user{this.props.numUsers === 1 ? '' : 's'} online</span>
      </nav>
    );
  }
});

export default Header;