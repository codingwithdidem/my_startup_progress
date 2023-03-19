import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/app/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <style jsx global>
          {`
            html {
              font-family: ${inter.style.fontFamily};
            }
          `}
        </style>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
