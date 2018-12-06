import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import ResetCSS from "../components/reset-css";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <ResetCSS />
          <link
            href="https://fonts.googleapis.com/css?family=Boogaloo"
            rel="stylesheet"
          />
          <title>CSS Crate Digger - Marlonic.us</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
