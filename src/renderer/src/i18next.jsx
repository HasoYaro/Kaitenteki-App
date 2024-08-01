import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Languagedetector from 'i18next-browser-languagedetector'

i18next
.use(initReactI18next)
.use(Languagedetector)
.init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                loading: 'Loading',
                updateCheck: 'Checking for updates...',
                updateFound: 'Update found! Will be downloaded after you close the app.',
                updateNotFound: 'Your app is up to date.',
                updateDownloaded: 'Update is downloaded.',
                play: 'Play'
            }
        },
        tr: {
            translation: {
                loading: 'Yükleniyor',
                updateCheck: 'Guncellemeler kontrol ediliyor...',
                updateFound: 'Guncelleme bulundu! Programi kapattiksan sonra indirilecek.',
                updateNotFound: 'Programiniz guncel.',
                updateDownloaded: 'Guncelleme indirildi.',
                play: 'Oyna'
            }
        }
    }
})