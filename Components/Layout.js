import Navbar from "./Navbar"
import {useRouter} from 'next/router'
export default function Layout({children}){
    const router = useRouter();
    const checkRouter = router.pathname === '/register' || router.pathname ==='/login' ? false : true;
return(
    <>
    {checkRouter &&<Navbar/>}
    <main>{children}</main>
    </>
)
}