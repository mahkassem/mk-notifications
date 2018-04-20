/* 
MK Web Notifications v1.0 - jQuery Plug-In JavaScript.
A easy to use jQuery plug-in for in browser notifications and toasts.
Documentation: https://github.com/<id>.
LICENSE: MIT. 
*/
var icons = {
	default: 'fa fa-bell',
	primary: 'fa fa-bell',
	success: 'fa fa-check',
	danger:  'fa fa-exclamation-triangle',
	warning: 'fa fa-exclamation',
	info:    'fa fa-info',
	light:   'fa fa-bell',
	dark:    'fa fa-bell',
	purple:  'fa fa-bell'
};

var uniqueId = 0;

function mkNotifications(mkConfig){
	if(mkConfig == null){
		config = {
			positionY: 'right',
			positionX: 'bottom',
			scrollable: true,
			rtl: false,
			max: 5
		};
	}else{
		config = {
			positionY: mkConfig.positionY != undefined ? mkConfig.positionY : 'right',
			positionX: mkConfig.positionX != undefined ? mkConfig.positionX :  'bottom',
			scrollable: mkConfig.scrollable != undefined ? mkConfig.scrollable : true,
			rtl: mkConfig.rtl != undefined ? mkConfig.rtl : false,
			max: mkConfig.max != undefined ? mkConfig.max :  5
		}
	}

	if(config.scrollable == true){ scrollable = ' mk-scrollable'; }else{ scrollable = ''; }
	if(config.rtl == true){ rtl = ' mk-rtl'; }else{ rtl = ''; }

	var mkNotifications = '<div id="mk-notifications" data-max="'+config.max+'" class="mk-notifications mk-'+config.positionX+' mk-'+config.positionY+scrollable+rtl+'"></div>',
		oldMkNotifications = document.getElementById('mk-notifications');
	
	if(oldMkNotifications != undefined){
		$(oldMkNotifications).remove();
	}

	$('body').prepend(mkNotifications);
}

function mkNoti(title, message, mkOptions){
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
		duration: 7000
	}
	if(mkOptions !== null){
		var config = {
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
			duration: mkOptions.duration != undefined ? mkOptions.duration : 7000
		}
	}

	var totalLength = 0;
	var titleLength = 0;
	if(title != undefined){ titleLength = title.length; totalLength = totalLength + (titleLength*1.1); }
	if(titleLength >= 70){ title = title.substr(0,67)+'...'; }

	var messageLength = 0;
	if(message != undefined){ messageLength = message.length;  totalLength = totalLength + messageLength; }
	if(totalLength >= 140){ message = ''; }else if(messageLength >= (140 - (titleLength*1.1))){  message = message.substr(0,(140 - (titleLength*1.1)))+'...';  }

	var iconColor = '';
	if(config.icon.color != null){
		iconColor = 'color:'+config.icon.color+';';
	}

	var iconBackground = '';
	if(config.icon.background != null){
		iconBackground = 'background:'+config.icon.background+';';
	}

	var iconStyle = '';
	if(iconColor != '' || iconBackground != ''){
		iconStyle = ' style="'+iconColor+iconBackground+'"';
	}

	var iconClass;
	if(config.icon.class != null){
		iconClass = config.icon.class;
	}else{
		iconClass = icons[config.status];
	}

	
	var icon = '<i class="'+iconClass+'"></i>';
	

	var setUniqueId = uniqueId;

	var callback = null;
	if(config.callback != null){
		callback = true;
	}


	var dismissable = ' mk-hide';
	var dismissAction = false;
	if(config.dismissable == true){
		dismissable = '';
		dismissAction = true;
	}

	var notification = '<div class="mk-noti mk-'+config.status+'" data-unique="'+setUniqueId+'" data-dismiss="'+dismissAction+'" data-callback="'+callback+'" data-duration="'+config.duration+'" id="mk-noti-'+setUniqueId+'">'+
							'<div'+iconStyle+' class="mk-icon">'+
								icon+
							'</div>'+
							'<div class="mk-body">'+
								'<i id="mk-close-'+setUniqueId+'" class="fa fa-times mk-close'+dismissable+'"></i>'+
								'<h3 class="mk-title">'+title+'</h3>'+
								'<p class="mk-text">'+message+'</p>'+
							'</div>'+
						'</div>';

	$(target).prepend(notification);

	var dismissBtn = document.getElementById('mk-close-'+setUniqueId);
	$(dismissBtn).on('click', function(event){
		event.stopImmediatePropagation();
		closeMkNoti(setUniqueId);
		if(callback == true)
		{
			config.callback();
		}
	});

	var elm = document.getElementById('mk-noti-'+setUniqueId);

	if(config.link.url != null){
		$(elm).on('click', function(event){
			event.stopImmediatePropagation();
			window.open(config.link.url,config.link.target);
			if(config.link.function != null){
				config.link.function();
			}
		});
	}

	var mkNotiCount = $('.on-show').length;
	var mkMax = $(target).data('max');
	if(mkNotiCount < mkMax || mkMax == 'null'){
		setTimeout(function(){$(elm).addClass('show');$(elm).addClass('on-show');},100);
		setTimeout(function(){$(dismissBtn).click();},config.duration);
	}else{
		$(elm).addClass('mk-pending');
	}

	uniqueId++;

}

function closeMkNoti(id){
	var elm = document.getElementById('mk-noti-'+id);
	$(elm).removeClass('show', $(function(){
		setTimeout(function(){
			$(elm).remove();
			var mkNotiCount = $('.on-show').length;
			var mkMax = $('#mk-notifications').data('max');
			if(mkNotiCount < mkMax || mkMax == 'null'){
				var forShow = mkMax - mkNotiCount;
				for(var i = 0; i < forShow; i++){
					var firstPending = document.getElementsByClassName('mk-pending')[0];
					if(firstPending != undefined){
						var duration = firstPending.dataset.duration;
						var dismiss = firstPending.dataset.dismiss;
						var firstId = firstPending.dataset.unique;
						setTimeout(function(){$(firstPending).addClass('show');$(firstPending).addClass('on-show');$(firstPending).removeClass('mk-pending');},100);
						if(dismiss == 'true'){
							setTimeout(function(){$('#mk-close-'+firstId).click()},duration);
						}
					}
				}
			}
			return;
		},400);
	}));
}