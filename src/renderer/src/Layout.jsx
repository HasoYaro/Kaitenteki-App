import { Outlet } from 'react-router-dom';
import Header from './components/Header/header'
import Loading from './components/Loading/loading'
import React, { useState, useEffect } from 'react';

export default function Layout(){
  const [aaa, setaaa] = useState()
  window.Api.loadingStater((res) => {setaaa(res)})

  console.log(aaa)
  if(aaa === '' || aaa === 'Loading' || aaa === undefined){
    return <Loading />
  }
  else
  {
    return(<>

      <Header />
      <main>
        
          <Outlet />
      </main>
</>)

  }
}