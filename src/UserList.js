import React, { Component } from 'react';

class UserList extends Component {
  render() {
    const { users, token, onLogout } = this.props;

    if (!token) {
      return <p>Please log in to see the user list.</p>;
    }

    const loggedInUserRole = users.find(user => `token-${user.username}` === token)?.role;

    return (
      <div>
        <button onClick={onLogout} style={{ marginBottom: '20px' }}>Logout</button>
        {users.map((user, index) => (
          loggedInUserRole === 'admin' || 
          loggedInUserRole === 'operations' || 
          (loggedInUserRole === 'sales' && user.role === 'sales') ? (
            <div key={index}>
              <h4>{user.username} ({user.role})</h4>
            </div>
          ) : null
        ))}
      </div>
    );
  }
}

export default UserList;
