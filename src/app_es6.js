const cookieStorage = {
	getItem: (key) => {
		const cookies = document.cookie
			.split(';')
			.map((cookie) => cookie.split('='))
			.reduce(
				(acc, [key, value]) => ({ ...acc, [key.trim()]: value }),
				{}
			);
		return cookies[key];
	},
	setItem: (key, value) => {
		document.cookie = `${key}=${value}`;
	},
};

var storageType = cookieStorage; // or sessionStorage or localStorage;
const cookieConsentPropName = 'cookie_consent';

const noConsent = () => !storageType.getItem(cookieConsentPropName);
const saveToStorage = () => storageType.setItem(cookieConsentPropName, true);

window.onload = () => {
	const consentPopup = document.getElementById('consent-popup');
	const acceptBtn = document.getElementById('accept');

	const acceptFn = (event) => {
		saveToStorage(storageType);
		consentPopup.classList.add('hidden');
	};

	acceptBtn.addEventListener('click', acceptFn);

	if (noConsent()) {
		setTimeout(() => {
			consentPopup.classList.remove('hidden');
		}, 2000);

		// const consent = confirm(
		// 	'We are using Cookies. Are you okay with that?'
		// );
		// if (consent) {
		// 	saveToStorage();
		// }
	}
};
