 
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from '@self.id/react'

//const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    
      <Provider client={{ ceramic: "testnet-clay" }}>
        <Component {...pageProps} />
      </Provider>
   
  )
}

export default MyApp
