# next-helpers
> Small HOCs and utils to simplify work with nextjs

### withSSR(componentDefenition)
> Allow to perform client-side routing before getInitialProps promise is resolve

Motivation: https://github.com/zeit/next.js/issues/3501

You can find workable appa with `withSSR` usage [here](https://github.com/Faradey27/next-helpers/tree/master/examples)

Example:
```js
import withSSR from 'next-helpers';

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
```

In such example, when user navigation to UsersPage, he will see `List of users that was preloaded on server with getInitialProps:`
text immediately, then in 1 second, getInitialProps will resolve, UsersPage will re-render and user will see list of users.

p.s. by default nextjs will show blank screen for 1 second, till getInitialProps promise resolve, withSSR will solve this problem.
