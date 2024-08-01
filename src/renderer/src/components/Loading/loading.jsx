import i18next from 'i18next'
import { useTranslation, Trans } from 'react-i18next'
import './loading.css'
import React, { useState, useEffect } from 'react';

export default function Loading(){
  const {t} = useTranslation()

  async function Load(){
      let docPath
      let version
      await window.Api.documentPath((res) => {docPath = res})
      await window.Api.isVersionUptoDate((res) => { localStorage.setItem('isUptoDate', res) } )
      console.log(docPath)
      setTimeout(async () => {
        await window.Api.openDb(docPath).then((res) => {
          if(res)
          window.Api.loadingStateChanger('Finished')
        })
        
      }, 2000);
    }  
    Load()
    return (<>
    <div className="parent">
        <div className="loader"></div>
        <div className="p"><p>{t('loading')}</p></div>

    </div>
    </>)
}