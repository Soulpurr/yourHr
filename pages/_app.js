import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer>
        <Component {...pageProps} />
      </ToastContainer>
    </>
  );
}
