import i18next from 'i18next'
import { useTranslation, Trans } from 'react-i18next'
import { useEffect, useRef } from 'react'
import './settings.css'

export default function Settings(){

    const lngs = {
        en: { nativeName: 'English' },
        tr: { nativeName: 'Turkish' }
    }

    const selectt = useRef(null);
    useEffect(() => {
        console.log(selectt.current.options[selectt.current.selectedIndex].value)
    }, [])

    window.Api.isVersionUptoDate(async (res) => { localStorage.setItem('isUptoDate', res); console.log('LOCAL STORAGE DOLDURULDU; '+res) } )    

    const {t} = useTranslation()
    let isUptoDate = localStorage.getItem('isUptoDate').split(',')
    console.log('SETTINGS: '+isUptoDate)

    return(<>
    <main style={{margin: "0", padding: "5px"}} className='main'>
        <section style={{backgroundColor: isUptoDate[0] === 'true' ? "#0F64CD" : "#CD2E3A"}} className='updateSection'>
            {t(isUptoDate[1])}
        </section>
        <section>
        <select ref={selectt} onChange={(e) => {i18next.changeLanguage(e.target.options[e.target.selectedIndex].value); window.Api.setLang(e.target.options[e.target.selectedIndex].value)}} className='selectt'>
        {Object.keys(lngs).map((lang) => {
                      return  <option type='submit' key={lang} value={lang} onClick={() => i18next.changeLanguage(lang)} selected={i18next.resolvedLanguage === lang}>{lngs[lang].nativeName}</option>
                    })}
        </select>
        </section>
    </main>



    
    {isUptoDate[0] === 'false' ? <button onClick={() => window.Api.downloadLatestV(isUptoDate)}>Indir</button> : <></>}
    <p></p>
    <div>
        
    </div>
    
    </>)
}