import { ThemesState } from "../context/Themes/ThemesState";
import { Provider } from "react-redux";
import { store } from "../context/store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemesState>
        <Component {...pageProps} />
      </ThemesState>
    </Provider>
  );
}

export default MyApp;
