import i18next from 'i18next'
import './header.css'
import { useTranslation, Trans } from 'react-i18next'


const lngs = {
    en: { nativeName: 'English' },
    tr: { nativeName: 'Turkish' }
}


export default function Header(){
    const {t} = useTranslation()


    return(<>
            <header>
                <div>
                    {Object.keys(lngs).map((lang) => {
                      return  <button type='submit' key={lang} onClick={() => i18next.changeLanguage(lang)} disabled={i18next.resolvedLanguage === lang}>{lngs[lang].nativeName}HAHA</button>
                    })}
                </div>
                <div className='logoDiv'>Logo</div>
                <div>{t('play')}</div>
                <div>{t('decks')}</div>
                <div></div>
            </header>
    </>)
}