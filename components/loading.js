import { useRouter } from 'next/router';
import { useState,useEffect } from 'react'

export function Loading() {
  const router = useRouter();
//ref.current.continuousStart()
//ref.current.complete()
//ref.current.staticStart()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const handleStart = (url) => (url !== router.asPath) && setLoading(true);
      const handleComplete = (url) => (url === router.asPath) && setLoading(false);

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError',  handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })
  
  return loading && (
  <div style={{
    display: 'flex',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    backdropFilter: 'blur(8px)',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#bbf',
    fontWeight: '800',
    zIndex: '999',
    fontSize: '80px'
  }}>
    <div style={{
      width: '300px'
    }}>
    Loading...
    </div>
  </div>)
}