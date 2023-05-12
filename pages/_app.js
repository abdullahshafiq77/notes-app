import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '../store/store';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </StoreProvider>
  );
}
