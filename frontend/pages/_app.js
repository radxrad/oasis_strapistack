
//import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import App from 'next/app';

import { default as Layout} from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

import '../styles/globals.css'
import "../styles/index.css";

export const GlobalContext = createContext({});

export default class MyApp extends App {
    static async getInitialProps(ctx)  {
        // Calls page's `getInitialProps` and fills `appProps.pageProps`
        const appProps = await App.getInitialProps(ctx);
        // Fetch global site settings from Strapi
        const globalRes = await fetchAPI("/global", {
            populate: {
                favicon: "*",
                defaultSeo: {
                    populate: "*",
                },
            },
        });
        // Pass the data to our page via props
        return { ...appProps, pageProps: { global: globalRes.data } };
    };
  render () {
    const { Component, pageProps } = this.props
    return (
        <GlobalContext.Provider value={global.attributes}>
        <Layout props={this.props}>

          <Component {...pageProps} />
        </Layout>
        </GlobalContext.Provider>
    )
  }
}


// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
//
//export default MyApp
