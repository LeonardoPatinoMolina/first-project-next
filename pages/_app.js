import { ThemesState } from "../context/Themes/ThemesState";
import { Provider } from "react-redux";
import { store } from "../context/store/store";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemesState>
        <NextNProgress color="#ffffff" />
        <Component {...pageProps} />
      </ThemesState>
    </Provider>
  );
}

export default MyApp;
