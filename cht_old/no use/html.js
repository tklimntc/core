var socket = io();
var category="chat";
function init(){
	messup.init();
	messup.event.init();
	inits.chat();
}
function down(){
	if(event.keyCode != 13)
		push.down();
}
var messup;
messup = {
	init: function () {
		$('<div class="body"></div>').appendTo($('.background'));
			$('<div class="bodyleft" id="msgbox"></div>').appendTo($('.body'));
				$('<ul id="message"></ul>').appendTo($('.bodyleft'));
			$('<div class="bodyright" id="toolbox"></div>').appendTo($('.body'));
		$('<div class="bottom"/>').appendTo($('.background'));
			$('<div class="down"/>').appendTo($('.bottom'));
				$('<input id="upleftdown" onKeyDown="up()"/>').appendTo($('.down'));
				$('<input id="downleftdown" onKeyDown="down()"/>').appendTo($('.down'));
				$('<div class="downright"/>').appendTo($('.down'));
				$('<div class="headright">삭제</div>').appendTo($('.down'));
	}
};
messup.event={
	init: function(){
		var downright = $('.downright');
		$(downright).bind('click',function(){
			messup.event.onClick(downright);
		});
		var headright = $('.headright');
		$(headright).bind('click',function(){
			messup.event.onClick(headright);
		});
	},
	onClick:function(o){
		if($(o).hasClass('hd')){}
		if($(o).hasClass('headright')){
			$('#message').empty();
		}
		if($(o).hasClass('downright')){
			push.down();
		}
	}
};
var upleftdown=$('.upleftdown');
var downleftdown=$('.downleftdown');
var downright=$('.downright');
var push;
var inits;
inits={
	chat: function(){
		$('#upleftdown').val(localStorage.getItem('대화명')||"대화명");
		$('#downleftdown').val("메시지");
		$('.downright').text("전송");
		category="chat";
	}
};
push={
	down:function(){
		var ulc=document.getElementById('upleftdown').value;
		var dlc=document.getElementById('downleftdown').value;
		switch(category){
			case 'chat': // CSB
				if(ulc.length && dlc.length)
					socket.emit('message',[ulc,dlc]);
					document.getElementById('downleftdown').value = "";
					localStorage.setItem('대화명',document.getElementById('upleftdown').value);
				break;
		}
	}
};
socket.on('message', function(message){
	$('#message').append($('<li>').text(message[0]+' : '+message[1]));
	document.getElementById("msgbox").scrollTop = document.getElementById("message").scrollHeight;
});
