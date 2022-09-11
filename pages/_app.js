import '../styles/globals.css'
import {Provider} from '../Context'
import Layout from '../Components/Layout';
function MyApp({ Component, pageProps }) {
  return(
  <Provider> 
    <Layout>
  <Component {...pageProps} />
  </Layout>
  </Provider>
  )
}

export default MyApp
