import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Languagedetector from 'i18next-browser-languagedetector'

i18next
.use(initReactI18next)
.use(Languagedetector)
.init({
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                loading: 'Loading',
                play: 'Play',
                notUptoDate: 'Not up to date. Click to download.',
                uptoDate: 'Up to date. (y)',
                settings: 'Settings',
                decks: 'Decks',
                cards: 'Cards',
            }
        },
        tr: {
            translation: {
                loading: 'Yükleniyor',
                play: 'Oyna',
                notUptoDate: 'Guncel degil. Indirmek icin tikla.',
                uptoDate: 'Program guncel. (y)',
                settings: 'Ayarlar',
                decks: 'Desteler',
                cards: 'Kartlar',
            }
        }
    }
})