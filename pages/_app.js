 "use client"
 import { Provider } from "@self.id/react"; 

function MyApp({ Component, pageProps }) {
 
  return 
 
 <Provider client={{ ceramic: "testnet-clay" }}>
      <Component {...pageProps} />;
    </Provider>

}

export default MyApp

