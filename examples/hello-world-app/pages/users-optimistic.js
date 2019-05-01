import withSSR from '../../../dist/withSSR'; // in real app should be `import withSSR from 'next-helpers';`

const UsersPage = ({ users }) => (
  <div>
    <p>List of users that was preloaded on server with getInitialProps:</p>
    <ul>{users && users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
  </div>
)

UsersPage.getInitialProps = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      users: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
        { id: 4, name: 'User 4' },
        { id: 5, name: 'User 5' },
        { id: 6, name: 'User 6' },
        { id: 7, name: 'User 7' },
        { id: 8, name: 'User 8' },
        { id: 9, name: 'User 9' },
      ]
    }), 1000);
  });
}

export default withSSR(UsersPage);
