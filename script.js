$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
$('body').scrollspy({ target: '#navbarNav' });
$("a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 600, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});

$(window).bind('load', function() {

	var mkConfig = {
		positionY: 'bottom',
		positionX: 'right',
		max: 5,
		scrollable: true
	};

	mkNotifications(mkConfig);

	mkNoti(
		'MK Web Notifications (Info)',
		'Example of generated notification with status Info',
		{
			status:'info'
		}
	);

	showCode();

	$("#navbarNav ul li a[href^='#']").each(function() {
		var hash = window.location.hash;
		var href = $(this).attr('href');
		if(href == hash)
		{
			$(this).addClass('active');
			$(this).click();
		}else{
			$(this).removeClass('active');
		}
	});

	$('#mk-noti-example5').addClass('show');
	setTimeout(function(){$('#mk-noti-example5').removeClass('show', $(function(){
				setTimeout(function(){$('#mk-noti-example5').remove();},400);
			}))},5500);

	setTimeout(function(){$('#mk-noti-example4').addClass('show')},1500);
	setTimeout(function(){$('#mk-noti-example4').removeClass('show', $(function(){
				setTimeout(function(){$('#mk-noti-example4').remove();},400);
			}))},10500);

	setTimeout(function(){$('#mk-noti-example3').addClass('show')},2000);

	setTimeout(function(){$('#mk-noti-example2').addClass('show')},2500);
	setTimeout(function(){$('#mk-noti-example2').removeClass('show', $(function(){
				setTimeout(function(){$('#mk-noti-example2').remove();},400);
			}))},8000);

	setTimeout(function(){$('#mk-noti-example1').addClass('show')},3000);
	setTimeout(function(){$('#mk-noti-example1').removeClass('show', $(function(){
				setTimeout(function(){$('#mk-noti-example1').remove();},400);
			}))},9000);

	setTimeout(function(){$('#mk-noti-example').addClass('show')},4500);
	setTimeout(function(){$('#mk-noti-example').removeClass('show', $(function(){
				setTimeout(function(){$('#mk-noti-example').remove();},400);
			}))},6500);

	$('.mk-close').each(function() {
		$(this).on('click', function(){
			var parent = $(this).parent('.mk-body');
			var masterParent = $(parent).parent('.mk-noti');
			$(masterParent).removeClass('show', $(function(){
				setTimeout(function(){$(masterParent).remove();},400);
			}));
		});
	});
});

function tryNoti()
{
	var mkConfig = {
		positionY: 'bottom',
		positionX: 'right',
		max: 5,
		scrollable: true
	};

	mkNotifications(mkConfig);

	mkNoti('MK Web Notifications (Info)','Example of generated notification with status Info');
}

function copyCode(id,event) {
	event.preventDefault();
	var copy = $(id).html();
	textCopy = copy.replace(/<br\s*[\/]?>/gi, "\r\n");
	$("#text-copy").val(textCopy);

	document.execCommand('copy', false, $("#text-copy").select());

	/* Alert the copied text */
	mkNoti(
		'Code Copied',
		'Code was copied to your clipboard',
		{
			status:'success',
			icon: {
				class:'fa fa-clipboard-check'
			}
		}
	);
}

var oldConf = {
		positionY: selVal('positionY'),
		positionX: selVal('positionX'),
		max: valOr('max',5),
		rtl: truFal('rtl'),
		scrollable: truFal('scrollable')
	};

var codeGenId = "'#generated-code'";
var textConf = 
	'<h3>Configration</h3><p>Pass this object with your mkNotifications() function.</p><span id="generated-code">var config = <br>{<br>'+
		'&ensp;&ensp;&ensp;&ensp;positionY:&ensp;"'+selVal('positionY')+'",<br>'+
		'&ensp;&ensp;&ensp;&ensp;positionX:&ensp;"'+selVal('positionX')+'",<br>'+
		'&ensp;&ensp;&ensp;&ensp;max:&ensp;'+valOr('max',5)+',<br>'+
		'&ensp;&ensp;&ensp;&ensp;rtl:&ensp;'+truFal('rtl')+',<br>'+
		'&ensp;&ensp;&ensp;&ensp;scrollable:&ensp;'+truFal('scrollable')+',<br>'+
	'<br>};<br><br>'+
	'mkNotifications(config);'+
	'</span><a data-toggle="tooltip" data-placement="left" title="Copy to clipboard" class="copy" href="javascript:void(0)" onclick="copyCode('+codeGenId+',event)">Copy</a>';

var codeGenId2 = "'#generated-code2'";
var textOpt =  
	'<h3>Options</h3><p>Pass this object with your mkNoti() function.</p><span id="generated-code2">var options = <br>{<br>'+
	'&ensp;&ensp;&ensp;&ensp;status:&ensp;"'+selVal('status')+'",<br>'+
	'&ensp;&ensp;&ensp;&ensp;icon:&ensp;{<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;class:&ensp;'+valNul('class')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;color:&ensp;'+valNul('color')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;background:&ensp;'+valNul('background')+
	'<br>&ensp;&ensp;&ensp;&ensp;},<br>'+
	'&ensp;&ensp;&ensp;&ensp;link:&ensp;{<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;url:&ensp;'+valNul('url')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;target:&ensp;"'+valSel('target')+'",<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;function:&ensp;'+nullFun('function','Link')+
	'<br>&ensp;&ensp;&ensp;&ensp;},<br>'+
	'&ensp;&ensp;&ensp;&ensp;dismissable:&ensp;'+truFal('dismissable')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;callback:&ensp;'+nullFun('callback','Close')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;duration:&ensp;'+valDef('duration')+
	'<br>};<br><br>'+
	'mkNoti(<br>'+
	'&ensp;&ensp;&ensp;&ensp;"MK Web Notifications",<br>'+
	'&ensp;&ensp;&ensp;&ensp;"Example of generated notification with Notifications Generator",<br>'+
	'&ensp;&ensp;&ensp;&ensp;options<br>'+
	');'+
	'</span><a data-toggle="tooltip" data-placement="left" title="Copy to clipboard" class="copy" href="javascript:void(0)" onclick="copyCode('+codeGenId2+',event)">Copy</a>';

function showCode()
{
	$('#generated-code-place').html(textOpt);
	$('#generated-code-place2').html(textConf);
	$('[data-toggle="tooltip"]').tooltip();
}

function generate(){

	var config = {
		positionY: selVal('positionY'),
		positionX: selVal('positionX'),
		max: valOr('max',5),
		rtl: truFal('rtl'),
		scrollable: truFal('scrollable')
	};

	if(JSON.stringify(config) != JSON.stringify(oldConf)){
		mkNotifications(config);
	}

	oldConf = config;

	textConf = 
	'<h3>Configration</h3><p>Pass this object with your mkNotifications() function.</p><span id="generated-code">var config = <br>{<br>'+
		'&ensp;&ensp;&ensp;&ensp;positionY:&ensp;"'+selVal('positionY')+'",<br>'+
		'&ensp;&ensp;&ensp;&ensp;positionX:&ensp;"'+selVal('positionX')+'",<br>'+
		'&ensp;&ensp;&ensp;&ensp;max:&ensp;'+valOr('max',5)+',<br>'+
		'&ensp;&ensp;&ensp;&ensp;rtl:&ensp;'+truFal('rtl')+',<br>'+
		'&ensp;&ensp;&ensp;&ensp;scrollable:&ensp;'+truFal('scrollable')+',<br>'+
	'<br>};<br><br>'+
	'mkNotifications(config);'+
	'</span><a data-toggle="tooltip" data-placement="left" title="Copy to clipboard" class="copy" href="javascript:void(0)" onclick="copyCode('+codeGenId+',event)">Copy</a>';


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
			function: nullFun('function','Link')
		},
		dismissable: truFal('dismissable'),
		callback: nullFun('callback','Close'),
		duration: valDef('duration')
	};

	textOpt =  
	'<h3>Options</h3><p>Pass this object with your mkNoti() function.</p><span id="generated-code">var options = <br>{<br>'+
	'&ensp;&ensp;&ensp;&ensp;status:&ensp;"'+selVal('status')+'",<br>'+
	'&ensp;&ensp;&ensp;&ensp;icon:&ensp;{<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;class:&ensp;'+valNul('class')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;color:&ensp;'+valNul('color')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;background:&ensp;'+valNul('background')+
	'<br>&ensp;&ensp;&ensp;&ensp;},<br>'+
	'&ensp;&ensp;&ensp;&ensp;link:&ensp;{<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;url:&ensp;'+valNul('url')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;target:&ensp;"'+valSel('target')+'",<br>'+
	'&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;function:&ensp;'+nullFun('function','Link')+
	'<br>&ensp;&ensp;&ensp;&ensp;},<br>'+
	'&ensp;&ensp;&ensp;&ensp;dismissable:&ensp;'+truFal('dismissable')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;callback:&ensp;'+nullFun('callback','Close')+',<br>'+
	'&ensp;&ensp;&ensp;&ensp;duration:&ensp;'+valDef('duration')+
	'<br>};<br><br>'+
	'mkNoti(<br>'+
	'&ensp;&ensp;&ensp;&ensp;"MK Web Notifications",<br>'+
	'&ensp;&ensp;&ensp;&ensp;"Example of generated notification with Notifications Generator",<br>'+
	'&ensp;&ensp;&ensp;&ensp;options<br>'+
	');'+
	'</span><a data-toggle="tooltip" data-placement="left" title="Copy to clipboard" class="copy" href="javascript:void(0)" onclick="copyCode('+codeGenId+',event)">Copy</a>';

	mkNoti(
		'MK Web Notifications',
		'Example of generated notification with Notifications Generator',
		options
	);
}


function valOr(name,def){
	var val = $('input[name='+name+']').first().val();

	if(val == ''){
		return def;
	}else{
		return val;
	}
}

function selVal(name)
{
	return $('select[name='+name+']').first().val();
}

function valDef(name){
	var val = $('input[name='+name+']').first().val();

	if(val == ''){
		return 7000;
	}else{
		return val;
	}
}

function valNul(name)
{
	var val = $('input[name='+name+']').first().val();

	if(val == ''){
		return null;
	}else{
		return val;
	}
}

function truFal(name)
{
	if($('input[name='+name+']').first().is(':checked')){
		return true;
	}else{
		return false;
	}
}

function valSel(name)
{
	var val = $('input[name='+name+']').first().val();

	if(val == ''){
		return '_self';
	}else{
		return val;
	}
}

function nullFun(name,text)
{
	if($('input[name='+name+']').first().is(':checked')){
		var defFunc = function() {
			alert(text+' Callback function');
		};
		var val = defFunc;
		return defFunc;
	}else{
		return null;
	}
}

function resetGenerator()
{
	$('#generate-form-holder').html($('#reseted-form').html());
	$('#generated-code-place').html('');
	$('#generated-code-place2').html('');
	showCode();
}
