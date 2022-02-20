/* 
MK Web Notifications v2.0 - jQuery Plug-In JavaScript.
A easy to use jQuery plug-in for in browser notifications and toasts.
Documentation: https://github.com/<id>.
LICENSE: MIT. 
*/
var icons = {
	default: 'fa fa-bell',
	primary: 'fa fa-bell',
	success: 'fa fa-check',
	danger: 'fa fa-exclamation-triangle',
	warning: 'fa fa-exclamation',
	info: 'fa fa-info',
	light: 'fa fa-bell',
	dark: 'fa fa-bell',
	purple: 'fa fa-bell'
};

var defaultSound = './src/sound/notification.mp3',
	defaultClose = './src/sound/close.mp3';

var uniqueId = 0;

var config = {
	positionX: 'right',
	positionY: 'bottom',
	scrollable: true,
	rtl: false,
	max: 5
};

function mkNotifications(mkConfig) {
	if (mkConfig) {
		config = {
			positionX: mkConfig.positionX != undefined ? mkConfig.positionX : 'right',
			positionY: mkConfig.positionY != undefined ? mkConfig.positionY : 'bottom',
			scrollable: mkConfig.scrollable != undefined ? mkConfig.scrollable : true,
			rtl: mkConfig.rtl != undefined ? mkConfig.rtl : false,
			max: mkConfig.max != undefined ? mkConfig.max : 5
		};
	}

	var mkNotifications = document.createElement('div');
	mkNotifications.setAttribute('id', 'mk-notifications');
	mkNotifications.setAttribute('data-max', config.max);
	mkNotifications.classList.add('mk-notifications');
	mkNotifications.classList.add('mk-' + config.positionY);
	mkNotifications.classList.add('mk-' + config.positionX);
	if (config.scrollable) mkNotifications.classList.add('mk-scrollable');
	if (config.rtl) mkNotifications.classList.add('mk-rtl');

	var oldMkNotifications = document.getElementById('mk-notifications');

	if (oldMkNotifications != undefined) {
		oldMkNotifications.remove();
	}

	var body = document.querySelector('body');
	body.appendChild(mkNotifications);
}

function mkNoti(title, message, mkOptions) {
	var target = document.getElementById('mk-notifications');
	var config = {
		status: 'default',
		icon: {
			class: null,
			color: null,
			background: null
		},
		link: {
			url: null,
			target: '_self',
			function: null
		},
		dismissable: true,
		callback: null,
		sound: false,
		customSound: null,
		duration: 7000
	};
	if (mkOptions) {
		config = {
			status: mkOptions.status != undefined ? mkOptions.status : 'default',
			icon: mkOptions.icon == undefined ? config.icon : {
				class: mkOptions.icon.class != undefined ? mkOptions.icon.class : null,
				color: mkOptions.icon.color != undefined ? mkOptions.icon.color : null,
				background: mkOptions.icon.background != undefined ? mkOptions.icon.background : null
			},
			link: mkOptions.link == undefined ? config.link : {
				url: mkOptions.link.url != undefined ? mkOptions.link.url : null,
				target: mkOptions.link.target != undefined ? mkOptions.link.target : '_self',
				function: mkOptions.link.function != undefined ? mkOptions.link.function : null
			},
			dismissable: mkOptions.dismissable != undefined ? mkOptions.dismissable : true,
			callback: mkOptions.callback != undefined ? mkOptions.callback : null,
			sound: mkOptions.sound != undefined ? mkOptions.sound : false,
			customSound: mkOptions.customSound == undefined ? config.customSound : {
				onShow: mkOptions.customSound.onShow != undefined ? mkOptions.customSound.onShow : defaultSound,
				onClose: mkOptions.customSound.onClose != undefined ? mkOptions.customSound.onClose : defaultClose
			},
			duration: mkOptions.duration != undefined ? mkOptions.duration : 7000
		};
	}

	var totalLength = 0;
	var titleLength = 0;
	if (title != undefined) { titleLength = title.length; totalLength = totalLength + (titleLength * 1.1); }
	if (titleLength >= 70) { title = title.substr(0, 67) + '...'; }

	var messageLength = 0;
	if (message != undefined) { messageLength = message.length; totalLength = totalLength + messageLength; }
	if (totalLength >= 140) { message = ''; } else if (messageLength >= (140 - (titleLength * 1.1))) { message = message.substr(0, (140 - (titleLength * 1.1))) + '...'; }

	var iconColor = '';
	if (config.icon.color != null) {
		iconColor = 'color:' + config.icon.color + ';';
	}

	var iconBackground = '';
	if (config.icon.background != null) {
		iconBackground = 'background:' + config.icon.background + ';';
	}

	var iconStyle = '';
	if (iconColor != '' || iconBackground != '') {
		iconStyle = ' style="' + iconColor + iconBackground + '"';
	}

	var iconClass;
	if (config.icon.class != null) {
		iconClass = config.icon.class;
	} else {
		iconClass = icons[config.status];
	}


	var icon = '<i class="' + iconClass + '"></i>';


	var setUniqueId = uniqueId;

	var callback = null;
	if (config.callback != null) {
		callback = true;
	}


	var dismissable = ' mk-hide';
	var dismissAction = false;
	if (config.dismissable == true) {
		dismissable = '';
		dismissAction = true;
	}

	var ifSound = false;
	var ifClose = false;
	if (config.sound !== false) {
		if (config.customSound != undefined) {

			if (config.customSound.onShow != undefined) {
				ifSound = config.customSound.onShow;
				ifSound = encodeURI(ifSound);
			} else {
				ifSound = defaultSound;
				ifSound = encodeURI(ifSound);
			}

			if (config.customSound.onClose != undefined) {
				ifClose = config.customSound.onClose;
				ifClose = encodeURI(ifClose);
			} else {
				ifClose = defaultClose;
				ifClose = encodeURI(ifClose);
			}

		} else {

			ifSound = defaultSound;
			ifSound = encodeURI(ifSound);
			ifClose = defaultClose;
			ifClose = encodeURI(ifClose);

		}
	}

	var notification = document.createElement('div');
	notification.setAttribute('id', 'mk-noti-' + setUniqueId);
	notification.setAttribute('class', 'mk-noti mk-' + config.status);
	notification.setAttribute('data-unique', setUniqueId);
	notification.setAttribute('data-sound', ifSound);
	notification.setAttribute('data-close', ifClose);
	notification.setAttribute('data-dismiss', dismissAction);
	notification.setAttribute('data-callback', callback);
	notification.setAttribute('data-duration', config.duration);

	var nIconDiv = document.createElement('div');
	nIconDiv.style.color = iconColor;
	nIconDiv.style.backgroundColor = iconBackground;
	nIconDiv.setAttribute('class', 'mk-icon');

	var nIcon = document.createElement('i');
	nIcon.setAttribute('class', iconClass);

	nIconDiv.appendChild(nIcon);
	notification.appendChild(nIconDiv);

	var nBody = document.createElement('div');
	nBody.setAttribute('class', 'mk-body');

	var nClose = document.createElement('i');
	nClose.setAttribute('id', 'mk-close-' + setUniqueId);
	nClose.setAttribute('class', 'fa fa-times mk-close' + dismissable);

	nBody.appendChild(nClose);

	var nTitle = document.createElement('h3');
	nTitle.setAttribute('class', 'mk-title');
	nTitle.innerHTML = title;

	nBody.appendChild(nTitle);

	var nText = document.createElement('p');
	nText.setAttribute('class', 'mk-text');
	nText.innerHTML = message;

	nBody.appendChild(nText);

	notification.appendChild(nBody);

	target.appendChild(notification);

	var dismissBtn = document.getElementById('mk-close-' + setUniqueId);
	dismissBtn.addEventListener('click', function (event) {
		event.stopImmediatePropagation();
		closeMkNoti(setUniqueId);
		if (callback == true) {
			config.callback();
		}
	});

	var elm = document.getElementById('mk-noti-' + setUniqueId);

	if (config.link.url != null) {
		elm.classList.add('mk-clickable');
		elm.addEventListener('click', function (event) {
			event.stopImmediatePropagation();
			window.open(config.link.url, config.link.target);
			if (config.link.function != null) {
				config.link.function();
			}
		});
	} else if (config.link.url == null && config.link.function != null) {
		elm.classList.add('mk-clickable');
		elm.addEventListener('click', function (event) {
			event.stopImmediatePropagation();
			config.link.function();
		});
	}

	var mkNotiCount = document.querySelectorAll('.on-show').length;
	var mkMax = target.getAttribute('data-max');
	if (mkNotiCount < mkMax || mkMax == 'null') {
		setTimeout(function () {
			elm.classList.add('mk-show');
			elm.classList.add('on-show');
			mkSound(ifSound);
		}, 100);
		setTimeout(function () { if (dismissBtn) dismissBtn.click(); }, config.duration);
	} else {
		elm.classList.add('mk-pending');
		console.log('pending:', uniqueId);
	}

	uniqueId++;

}

function closeMkNoti(id) {
	var elm = document.getElementById('mk-noti-' + id);
	if (!elm) return;
	var elmIfClose = elm && elm.dataset.close;
	mkSound(elmIfClose);
	elm.classList.remove('mk-show');
	(function () {
		setTimeout(function () {
			elm.remove();
			var mkNotiCount = document.querySelectorAll('.on-show').length;
			var mkMax = document.getElementById('mk-notifications').getAttribute('data-max');
			if (mkNotiCount < mkMax || mkMax == 'null') {
				var forShow = mkMax - mkNotiCount;
				for (var i = 0; i < forShow; i++) {
					var pendingTurn = document.querySelectorAll('.mk-pending').length - 1;
					var firstPending = document.querySelectorAll('.mk-pending')[pendingTurn];
					if (firstPending != undefined) {
						var duration = firstPending.dataset.duration;
						var dismiss = firstPending.dataset.dismiss;
						var firstId = firstPending.dataset.unique;
						var ifSound = firstPending.dataset.sound;
						setTimeout(function () { showNext(firstPending, ifSound) }, 100);
						if (dismiss == 'true') {
							var closeElm = document.getElementById('mk-close-' + firstId);
							setTimeout(function () { performClose(closeElm) }, duration);
						}
					}
				}
			}
			return;
		}, 400);
	})();
}

function performClose(elm) {
	if (elm) elm.click();
}

function showNext(elmRef, ifSound) {
	var elmA = document.querySelector('#' + elmRef.id);
	elmA.classList.add('mk-show');
	elmA.classList.add('on-show');
	elmA.classList.remove('mk-pending');
	mkSound(ifSound);
}

function mkSound(sound) {
	if (sound !== 'false' && sound !== false) {
		sound = new Audio(decodeURI(sound));
		sound.loop = false;
		sound.play();
	}
}
