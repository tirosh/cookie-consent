var cookieStorage = {
	getItem: function (key) {
		var cookies = document.cookie
			.split(';')
			.map(function (cookie) {
				return cookie.split('=');
			})
			.reduce(function (acc, curr) {
				var k = curr[0];
				var v = curr[1];
				return Object.assign(acc, { [k.trim()]: v });
			}, {});
		return cookies[key];
	},
	setItem: function (key, value) {
		document.cookie = key + '=' + value;
	},
};

var storageType = cookieStorage; // or sessionStorage or localStorage;
var cookieConsentPropName = 'cookie_consent';

function noConsent() {
	return !storageType.getItem(cookieConsentPropName);
}
function saveToStorage() {
	return storageType.setItem(cookieConsentPropName, true);
}

window.addEventListener('load', function () {
	var consentPopup = document.getElementById('consent-popup');
	var acceptBtn = document.getElementById('accept');

	function acceptFn(event) {
		saveToStorage(storageType);
		consentPopup.classList.add('hidden');
	}

	acceptBtn.addEventListener('click', function (event) {
		acceptFn();
	});

	if (noConsent()) {
		setTimeout(function () {
			consentPopup.classList.remove('hidden');
		}, 2000);

		// var consent = confirm(
		// 	'We are using Cookies. Are you okay with that?'
		// );
		// if (consent) {
		// 	saveToStorage();
		// }
	}
});
