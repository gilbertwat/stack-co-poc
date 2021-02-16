import logo from './logo.svg';
import './App.css';
import { UserSession, AppConfig, showConnect } from '@stacks/connect';

const appDomain = "http://128.199.170.211:3000";
const appConfig = new AppConfig([]);
const userSession = new UserSession(appConfig);
const transitKey = userSession.generateAndStoreTransitKey();
const redirectUri = 'http://128.199.170.211:3000';
const manifestUri = 'http://128.199.170.211:3000/manifest.json';

function handleSignIn(e) {
  e.preventDefault();
  console.log('clicked');
  showConnect({
    appDetails: {
      name: 'PoC Stacks Likecoins',
      icon: window.location.origin + '/logo.svg',
    },
    redirectTo: '/',
    finished: () => {
      window.location.reload();
    },
    userSession: userSession,
  });
}

function handleSignOut(e) {
  e.preventDefault();
  userSession.signUserOut();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p> User is {userSession.isUserSignedIn() ? "logged in" : "not logged in."}</p>
        <p> User is {userSession.isUserSignedIn() && JSON.stringify(userSession.loadUserData().profile)}</p>
        {!userSession.isUserSignedIn() && <button onClick={handleSignIn}>Sign in</button> }
        {userSession.isUserSignedIn() && <button onClick={handleSignOut}>Sign out</button> }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
