import i18next from 'i18next'
import './header.css'
import { useTranslation, Trans } from 'react-i18next'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const lngs = {
    en: { nativeName: 'English' },
    tr: { nativeName: 'Turkish' }
}


export default function Header(){
    window.Api.isVersionUptoDate(async (res) => { localStorage.setItem('isUptoDate', res); console.log('HEADER LOCAL STORAGE DOLDURULDU; '+res) } )
    const {t} = useTranslation()


    return(<>
                {/* <div>
                    {Object.keys(lngs).map((lang) => {
                      return  <button type='submit' key={lang} onClick={() => i18next.changeLanguage(lang)} disabled={i18next.resolvedLanguage === lang}>{lngs[lang].nativeName}</button>
                    })}
                </div> */}
                <section id='section1'>
                    <Link to='/' className='logoDiv Link'>Logo</Link>
                    <Link className='Link'>{t('play')}</Link>
                    <Link className='Link'>{t('decks')}</Link>
                    <Link className='Link'>{t('cards')}</Link>
                </section>
                <section id='section2'>
                <Link className='Link' to='/settings'>{t('settings')}</Link>
                </section>
    </>)
}