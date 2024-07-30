import React, { useEffect, useState } from 'react';
// HOC pattern

function WithUsers(WrappedComponent, url) {
  return function(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      function fetchingUsers() {
        fetch(url)
          .then((res) => res.json())
          .then((data) => setUsers(data))
          .catch((err) => console.log(err));
      }
      fetchingUsers();
    }, [url]);

    const handleVisible = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div>
        {isVisible && <WrappedComponent {...props} users={users} />}
        <button onClick={handleVisible}>
          click to {isVisible ? 'hide' : 'show'} user data!
        </button>
      </div>
    );
  };
}

function User({ users ,color}) {
  return (
    <ul style={{color:color}}>
      {users.map((user) => (
        <li key={user.id}>
          {user.id}: {user.name}
        </li>
      ))}
    </ul>
  );
}

const Users = WithUsers(User, 'https://jsonplaceholder.typicode.com/users');

export default Users;
