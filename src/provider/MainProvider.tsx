import React, { useState } from 'react'
import AuthProvider from './AuthProvider'
import PageLoader from '../components/page/loader/PageLoader'

type TMainProviderProps = {
  children: React.ReactNode
}

const MainProvider:React.FC<TMainProviderProps> = ({children}) => {
  // State
  const [loading, setLoading] = useState<boolean>(true)
  
  return (
    <AuthProvider setLoading={setLoading}>
      {loading?<PageLoader />:children}
    </AuthProvider>
  )
}

export default MainProvider