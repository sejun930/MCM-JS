import React from "react";

import "../styles/globals.css";
import "../src/components/modules/alert/components/alert.styles.css"; /* alert styles */
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
