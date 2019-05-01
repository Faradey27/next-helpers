import Link from 'next/link'
export default () => (
  <div>
    <p>Common route vs next-helpers</p>
    <ul>
      <li>
        <Link href='/users'>
          <a>Common route which will not be render till getInitialProps resolved</a>
        </Link>
      </li>
      <li>
        <Link href='/users-optimistic'>
          <a>Route which will have same behavior as react-router</a>
        </Link>
      </li>
    </ul>
  </div>
)
