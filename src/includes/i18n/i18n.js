import { createI18n } from 'vue-i18n';
import ar from './locales/ar.json';
import en from './locales/en.json';

const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en, ar },
	numberFormats: {
		en: {currency: {style: 'currency', currency: 'GBP'}},
		ar: {currency: {style: 'currency', currency: 'SAR'}}
	}
});

export default i18n;