var $ = jQuery;
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});
$('body').scrollspy({ target: '#navbarNav' });
$("a[href^='#']").on('click', function (e) {

	// prevent default anchor click behavior
	e.preventDefault();

	// store hash
	var hash = this.hash;

	// animate
	$('html, body').animate({
		scrollTop: $(hash).offset().top
	}, 600, function () {

		// when done, add hash to url
		// (default click behaviour)
		window.location.hash = hash;
	});

});

window.addEventListener('load', function () {

	var mkConfig = {
		positionX: 'bottom',
		positionY: 'right',
		max: 5,
		scrollable: true
	};

	mkNotifications(mkConfig);

	mkNoti(
		'MK Web Notifications (Info)',
		'Example of generated notification with status Info',
		{
			status: 'info'
		}
	);

	showCode();

	$("#navbarNav ul li a[href^='#']").each(function () {
		var hash = window.location.hash;
		var href = $(this).attr('href');
		if (href == hash) {
			$(this).addClass('active');
			$(this).click();
		} else {
			$(this).removeClass('active');
		}
	});

	$('#theme-toggle').on('change', function () {
		if ($(this).is(':checked')) {
			$('#theme').attr('href', 'src/css/themes/mk-theme-more.css');
			$('#theme-code').slideDown();
			mkNoti(
				'Theme Toggle',
				'Theme is On',
				{
					status: 'success',
					icon: {
						class: 'fa fa-paint-brush'
					},
					sound: true,
					duration: 3000
				}
			);
		} else {
			$('#theme').attr('href', '');
			$('#theme-code').slideUp();
			mkNoti(
				'Theme Toggle',
				'Theme is Off',
				{
					status: 'danger',
					icon: {
						class: 'fa fa-paint-brush'
					},
					sound: true,
					duration: 3000
				}
			);
		}
	})

});

function tryNoti() {
	mkNoti('MK Web Notifications', 'Example of generated notification', { sound: true });
}

function copyCode(id, event) {
	event.preventDefault();
	var copy = $(id).html();
	textCopy = copy.replace(/<br\s*[\/]?>/gi, "\r\n");
	var decodedHTML = $('<textarea />').html(textCopy).text();
	$("#text-copy").val(decodedHTML);

	document.execCommand('copy', false, $("#text-copy").select());

	/* Alert the copied text */
	mkNoti(
		'Clipboard',
		'Code was copied to your clipboard',
		{
			status: 'success',
			icon: {
				class: 'fa fa-clipboard-check'
			}
		}
	);
}

var oldConf = {
	positionX: selVal('positionX'),
	positionY: selVal('positionY'),
	max: valOr('max', 5),
	rtl: truFal('rtl'),
	scrollable: truFal('scrollable')
};

var codeGenId = "'#generated-code'";
var textConf = '';

var codeGenId2 = "'#generated-code2'";
var textOpt = '';

function updateCode() {

	var optionsCount = 0, optionsStart = '<span id="generated-code2">', optionsEnd = '', optionsInCall = '';
	var status = '';
	if (selVal('status') != 'default') {
		status = '&ensp;&ensp;&ensp;&ensp;status:&ensp;"' + selVal('status') + '"';
		optionsCount++;
	}

	var startIcon = '', endIcon = '', iClass = '', iColor = '', iBackground = '', iIcon = '';
	if (valNul('class') != null || valNul('color') != null || valNul('background') != null) {
		var addEnd = '';
		if (optionsCount >= 1) { addEnd = ',<br>'; }
		startIcon = addEnd + '&ensp;&ensp;&ensp;&ensp;icon:&ensp;{<br>',
			endIcon = '<br>&ensp;&ensp;&ensp;&ensp;}';
		var iCount = 0;
		if (valNul('class') != null) {
			iClass = '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;class:&ensp;' + valNul('class');
			iCount++;
			optionsCount++;
		}
		if (valNul('color') != null) {
			var addEnd = '';
			if (iCount >= 1) { addEnd = ',<br>'; }
			iColor = addEnd + '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;color:&ensp;' + valNul('color');
			iCount++;
			optionsCount++;
		}
		if (valNul('background') != null) {
			var addEnd = '';
			if (iCount >= 1) { addEnd = ',<br>'; }
			iBackground = addEnd + '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;background:&ensp;' + valNul('background');
			optionsCount++;
		}
	}
	var iIcon = startIcon + iClass + iColor + iBackground + endIcon;

	var startLink = '', endLink = '', iUrl = '', iTarget = '', iFunction = '', iLink = '';
	if (valNul('url') != null || valSel('target') != '_self' || nullFun('function') != null) {
		var addEnd = '';
		if (optionsCount >= 1) { addEnd = ',<br>'; }
		startLink = addEnd + '&ensp;&ensp;&ensp;&ensp;link:&ensp;{<br>',
			endLink = '<br>&ensp;&ensp;&ensp;&ensp;}';
		var iCount = 0;
		if (valNul('url') != null) {
			iUrl = '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;url:&ensp;' + valNul('url');
			iCount++;
			optionsCount++;
		}
		if (valSel('target') != '_self') {
			var addEnd = '';
			if (iCount >= 1) { addEnd = ',<br>'; }
			iTarget = addEnd + '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;target:&ensp;' + '"' + valSel('target') + '"';
			iCount++;
			optionsCount++;
		}
		if (nullFun('function') != null) {
			var addEnd = '';
			if (iCount >= 1) { addEnd = ',<br>'; }
			iFunction = addEnd + '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;function:&ensp;' + nullFun('function', 'Link');
			iFunction = iFunction.replace('text+\' Callback function\'', '\'Link Callback function\'');
			iFunction = iFunction.replace('() {', '() <br>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{');
			iFunction = iFunction.replace('			', '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;');
			iFunction = iFunction.replace('		', '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;');
			optionsCount++;
		}
	}
	var iLink = startLink + iUrl + iTarget + iFunction + endLink;

	var dismissable = '';
	if (truFal('dismissable') != true) {
		var addEnd = '';
		if (optionsCount >= 1) { addEnd = ',<br>'; }
		dismissable = addEnd + '&ensp;&ensp;&ensp;&ensp;dismissable:&ensp;' + truFal('dismissable');
		optionsCount++;
	}

	var callback = '';
	if (nullFun('callback', 'Close') != null) {
		var addEnd = '';
		if (optionsCount >= 1) { addEnd = ',<br>'; }
		callback = addEnd + '&ensp;&ensp;&ensp;&ensp;callback:&ensp;' + nullFun('callback', 'Close');
		callback = callback.replace('text+\' Callback function\'', '\'Close Callback function\'');
		callback = callback.replace('() {', '() <br>&ensp;&ensp;&ensp;&ensp;{');
		callback = callback.replace('			', '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;');
		callback = callback.replace('		', '&ensp;&ensp;&ensp;&ensp;');
		optionsCount++;
	}

	var sound = '';
	if (truFal('sound') != false) {
		var addEnd = '';
		if (optionsCount >= 1) { addEnd = ',<br>'; }
		sound = addEnd + '&ensp;&ensp;&ensp;&ensp;sound:&ensp;' + truFal('sound');
		optionsCount++;
	}

	var customSound = '';
	if (truFal('customSound') != false) {
		var addEnd = '';
		if (optionsCount >= 1) { addEnd = ',<br>'; }
		customSound = addEnd + '&ensp;&ensp;&ensp;&ensp;customSound:&ensp;{<br>' +
			'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;onShow: "./src/sound/custom-notification.mp3",<br>' +
			'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;onClose: "./src/sound/custom-close.mp3"<br>' +
			'&ensp;&ensp;&ensp;&ensp;}';
		optionsCount++;
	}

	var duration = '';
	if (valDef('duration') != 7000) {
		var addEnd = '';
		if (optionsCount >= 1) { addEnd = ',<br>'; }
		duration = addEnd + '&ensp;&ensp;&ensp;&ensp;duration:&ensp;' + valDef('duration');
		optionsCount++;
	}

	if (optionsCount > 0) {
		optionsStart = '<p>Pass this object with your mkNoti() function.</p><span id="generated-code2">var options = <br>{<br>',
			optionsEnd = '<br>};<br><br>',
			optionsInCall = ',<br>&ensp;&ensp;&ensp;&ensp;options';
	}

	textOpt =
		'<h3>Options</h3>' + optionsStart +
		status +
		iIcon +
		iLink +
		dismissable +
		callback +
		sound +
		customSound +
		duration +
		optionsEnd +
		'mkNoti(<br>' +
		'&ensp;&ensp;&ensp;&ensp;"MK Web Notifications",<br>' +
		'&ensp;&ensp;&ensp;&ensp;"Example of generated notification with Notifications Generator"' + optionsInCall + '<br>' +
		');' +
		'</span><a data-toggle="tooltip" data-placement="left" title="Copy to clipboard" class="copy" href="javascript:void(0)" onclick="copyCode(' + codeGenId2 + ',event)">Copy</a>';

	var configCount = 0, configStart = '<span id="generated-code">', configEnd = '', configInCall = '';

	var positionX = '';
	if (selVal('positionX') != 'right') {
		positionX = '&ensp;&ensp;&ensp;&ensp;positionX:&ensp;"' + selVal('positionX') + '"';
		configCount++;
	}

	var positionY = '';
	if (selVal('positionY') != 'bottom') {
		var addEnd = '';
		if (configCount >= 1) { addEnd = ',<br>'; }
		positionY = addEnd + '&ensp;&ensp;&ensp;&ensp;positionY:&ensp;"' + selVal('positionY') + '"';
		configCount++;
	}

	var max = '';
	if (valOr('max', 5) != 5) {
		var addEnd = '';
		if (configCount >= 1) { addEnd = ',<br>'; }
		max = addEnd + '&ensp;&ensp;&ensp;&ensp;max:&ensp;' + valOr('max', 5);
		configCount++;
	}

	var rtl = '';
	if (truFal('rtl') != false) {
		var addEnd = '';
		if (configCount >= 1) { addEnd = ',<br>'; }
		rtl = addEnd + '&ensp;&ensp;&ensp;&ensp;rtl:&ensp;' + truFal('rtl');
		configCount++;
	}

	var scrollable = '';
	if (truFal('scrollable') != true) {
		var addEnd = '';
		if (configCount >= 1) { addEnd = ',<br>'; }
		scrollable = addEnd + '&ensp;&ensp;&ensp;&ensp;scrollable:&ensp;' + truFal('scrollable');
		configCount++;
	}



	if (configCount > 0) {
		configStart = '<p>Pass this object with your mkNotifications() function.</p><span id="generated-code">var config = <br>{<br>',
			configEnd = '<br>};<br><br>',
			configInCall = 'config';
	}

	textConf =
		'<h3>Configration</h3>' + configStart +
		positionX +
		positionY +
		max +
		rtl +
		scrollable +
		configEnd +
		'mkNotifications(' + configInCall + ');' +
		'</span><a data-toggle="tooltip" data-placement="left" title="Copy to clipboard" class="copy" href="javascript:void(0)" onclick="copyCode(' + codeGenId + ',event)">Copy</a>';
}

function showCode() {
	updateCode();
	$('#generated-code-place').html(textOpt);
	$('#generated-code-place2').html(textConf);
	$('[data-toggle="tooltip"]').tooltip();
}

function generate() {

	var config = {
		positionX: selVal('positionX'),
		positionY: selVal('positionY'),
		max: valOr('max', 5),
		rtl: truFal('rtl'),
		scrollable: truFal('scrollable')
	};

	if (JSON.stringify(config) != JSON.stringify(oldConf)) {
		mkNotifications(config);
	}

	oldConf = config;

	var options =
	{
		status: selVal('status'),
		icon: {
			class: valNul('class'),
			color: valNul('color'),
			background: valNul('background')
		},
		link: {
			url: valNul('url'),
			target: valSel('target'),
			function: nullFun('function', 'Link')
		},
		sound: truFal('sound'),
		dismissable: truFal('dismissable'),
		callback: nullFun('callback', 'Close'),
		duration: valDef('duration')
	};

	if (truFal('customSound') == true) {
		options.customSound = {
			onShow: './src/sound/custom-notification.mp3',
			onClose: './src/sound/custom-close.mp3'
		}
	}

	mkNoti(
		'MK Web Notifications',
		'Example of generated notification with Notifications Generator',
		options
	);
}


function valOr(name, def) {
	var val = $('input[name=' + name + ']').first().val();

	if (val == '') {
		return def;
	} else {
		return val;
	}
}

function selVal(name) {
	return $('select[name=' + name + ']').first().val();
}

function valDef(name) {
	var val = $('input[name=' + name + ']').first().val();

	if (val == '') {
		return 7000;
	} else {
		return val;
	}
}

function valNul(name) {
	var val = $('input[name=' + name + ']').first().val();

	if (val == '') {
		return null;
	} else {
		return val;
	}
}

function truFal(name) {
	if ($('input[name=' + name + ']').first().is(':checked')) {
		return true;
	} else {
		return false;
	}
}

function valSel(name) {
	var val = $('input[name=' + name + ']').first().val();

	if (val == '') {
		return '_self';
	} else {
		return val;
	}
}

function nullFun(name, text) {
	if ($('input[name=' + name + ']').first().is(':checked')) {
		var defFunc = function () {
			mkNoti(text + ' Callback function', 'This is the callback function.', { status: 'success' });
		};
		var val = defFunc;
		return defFunc;
	} else {
		return null;
	}
}

function resetGenerator() {
	$('#generate-form-holder').html($('#reseted-form').html());
	$("a[href^='#code']").on('click', function (e) {
		// prevent default anchor click behavior
		e.preventDefault();
		// store hash
		var hash = this.hash;
		// animate
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 600, function () {
			// when done, add hash to url
			// (default click behaviour)
			window.location.hash = hash;
		});
	});
	setTimeout(showCode(), 100);
}
