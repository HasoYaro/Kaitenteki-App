import { Outlet } from 'react-router-dom';
import Header from './components/Header/header'
import Loading from './components/Loading/loading'
import React, { useState, useEffect } from 'react';

export default function Layout(){
  const [aaa, setaaa] = useState()
  window.Api.loadingStater((res) => {setaaa(res)})

  if(aaa === '' || aaa === 'Loading' || aaa === undefined){
    return <Loading />
  }
  else
  {
    return(<>
    <div style={{display: "flex", boxSizing: 'border-box'}}>
      <header style={{width: "20vw", height: "100vh", backgroundColor: "#212121", color: "#e7e7e7", flex: "1", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Header />
      </header>
      <main style={{flex: "5", backgroundColor: "#e8e8e8", margin: "0", padding: "5px"}}>
        
          <Outlet />
      </main>
    </div>
</>)

  }
}