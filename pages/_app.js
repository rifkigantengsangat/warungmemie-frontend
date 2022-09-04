import '../styles/globals.css'
import {Provider} from '../AuthContext/AuthContext'
function MyApp({ Component, pageProps }) {
  return(
  <Provider> 
  <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
