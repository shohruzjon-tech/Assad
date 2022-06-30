import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { ToastContainer } from 'react-toastify';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const clientSideEmotionCache = createEmotionCache();

const MainApp = (props) =>{
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const user = useSelector(state=>state.user.user);
  useEffect(()=>{
     if(!user){
      router.push('/auth');
     }
  }, [])
  return(
    <CacheProvider value={emotionCache}>
    <Head>
      <title>
        Xaridor.uz
      </title>
      <meta
        name="viewport"
        content="initial-scale=1, width=device-width"
      />
    </Head>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </ThemeProvider>
    </LocalizationProvider>
  </CacheProvider>
  )
}

const App = (props) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <MainApp {...props}/>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
