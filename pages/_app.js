/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
// import NoAuth from '../components/NoAuth';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <NoAuth
        component={Component}
        pageProps={pageProps}
      /> */}

      {/* TODO: Delete NoAuth component above and comment in code below for authentication */}
      <AuthProvider>
        <ViewDirectorBasedOnUserAuthStatus
          // if status is pending === loading
          // if status is logged in === view app
          // if status is logged out === sign in page
          component={Component}
          pageProps={pageProps}
        />
      </AuthProvider>
    </>
  );
}

export default MyApp;
