import i18next from 'i18next'
import { useTranslation, Trans } from 'react-i18next'
import './loading.css'
import React, { useState, useEffect } from 'react';

export default function Loading(){
  const {t} = useTranslation()

  async function Load(){
      await window.Api.isVersionUptoDate(async (res) => { await localStorage.setItem('isUptoDate', res); console.log('LOCAL STORAGE DOLDURULDU; '+res) } )
      i18next.changeLanguage(await window.Api.getLang())
      setTimeout(async () => {
        await window.Api.openDb().then((res) => {
          if(res)
            window.Api.loadingStateChanger('Finished')
      })
        
      }, 5000);
    }  
    Load()
    return (<>
    <div className="parent">
        <div className="loader"></div>
        <div className="p"><p>{t('loading')}</p></div>

    </div>
    </>)
}