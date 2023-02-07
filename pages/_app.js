import { ThemesState } from "../context/Themes/ThemesState";
import NextNProgress from "nextjs-progressbar";
import { BotonToTop } from "../components/BotonToTop";
import { useEffect } from "react";
import NProgress from "nprogress";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    NProgress.configure({ showSpinner: false, });
  },[]);
  return (
    <ThemesState>
      <NextNProgress color="#ffffff" height={1.5} />
      <BotonToTop />
      <Component {...pageProps} />
    </ThemesState>
  );
}

export default MyApp;
