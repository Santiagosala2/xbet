import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.css'
import { useRouter } from 'next/router'



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // everytime the website refresh
  useEffect(() => {
    authCheck(router.asPath);  
  },[])
  // 1. Check if there is a cookie
  // 2. Verify the cookie - with backend 
  // 3. If user is authenticated - return to the url provided
  // if not redirect to login
  const authCheck = async (url: string) => {

     const response = await fetch("/api/auth", {
      method: "POST"
     });
     const finalResponse = await response.json();
     const publicPaths = ['/login', '/register'];
     if (!finalResponse.result && !publicPaths.includes(url)) {
        return router.push('/login');
     }
   }



  return <Component {...pageProps}  />
}
