import { ThemesState } from "../context/Themes/ThemesState";
import { Provider } from "react-redux";
import { store } from "../context/store/store";
import NextNProgress from "nextjs-progressbar";
import { BotonToTop } from "../components/BotonToTop";
import { useEffect } from "react";
import NProgress from 'nprogress'
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    NProgress.configure({showSpinner: false})
  },[])
  return (
    <Provider store={store}>
      <ThemesState>
        <NextNProgress color="#ffffff" />
        <BotonToTop />
        <Component {...pageProps} />
      </ThemesState>
    </Provider>
  );
}

export default MyApp;
