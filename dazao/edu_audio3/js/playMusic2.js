function playMusic(objId){
	var state = document.getElementById( 'voiceGif' + objId ).src;
	//获取显示图片的src
	var myAuto = document.getElementById( ''+objId );
	//获取音频Id
	//myAuto.currentTime=0;
	var current_Url = (window.location.href).split("/edu_audio3");
	var timer;
	var audioTime=myAuto.currentTime;
	if( state == current_Url[0]+'/edu_audio3/img/voice1.png' || state == current_Url[0]+'/edu_audio3/img/voice2.png'){
		var num = $('audio').length;
		//音频的总数
		var i = 0;
		//计数器
		while( i<num ){
			$('audio')[i].pause();
			//所有的音频暂停
			$('#state'+$('audio')[i]['id']).hide();
			//获取的时间影藏
			i++;
		}
		myAuto.play();
		// if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		// 	WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
		// 	// 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
		// 	//alert(res.err_msg);
				
		// 	});
		// }
		if(myAuto.id==171600){
			document.getElementById('voiceGif'+objId).src="img/voiceplayer3.gif";
			timer=setInterval(function(){
				audioTime++;
				$(".start").html(timeToStr(audioTime));
				$(".range").val(myAuto.currentTime);
				if(audioTime>$(".range").attr("max")){
					clearInterval(timer);
					$(".range").val(0);
					$(".start").html("00:00");
				}
			},1000)
		}else{
			document.getElementById('voiceGif'+objId).src="img/voiceplayer.gif";
		}
    	// document.getElementById('Duration'+objId).style.display = 'block';
    	document.getElementById('reddot'+objId).style.display = 'none';
		//当前音频播放
	}else{
		myAuto.pause();
		
		
		/*document.getElementById('voiceGif'+objId).src="http://192.168.1.88:8020/edu_audio/img/voice1.png";*/
	}

	//监听结束事件
	myAuto.addEventListener( 'ended' , function(){
		if(myAuto.id==171600){
			document.getElementById( 'voiceGif' + objId ).src = 'img/voice2.png';
			$(".range").val(0);
		}else{
			document.getElementById( 'voiceGif' + objId ).src = 'img/voice1.png';
		}
		//把voice1.png的图片赋值给当前img的src
		var audioArray = $('audio');
		for( var i = 0;i < audioArray.length;i++){//执行for循环audioArray的所有视频
			if( audioArray[i]['id'] == myAuto['id']){//判断当前的audioArray的第i个视频是否等于当前的myAuto['id']
				playMusic(audioArray[i+1]['id']);
				//播放下个音频
				return;
			}
		}
	},false);
	myAuto.addEventListener('pause',function(){//监听暂停
		if(myAuto.id==171600){
			document.getElementById('voiceGif' + objId).src = 'img/voice2.png';
			clearInterval(timer);
		}else{
			document.getElementById('voiceGif' + objId).src = 'img/voice1.png';
			this.currentTime=0;
		}
		
	},false)
	myAuto.addEventListener('play',function(){//当音频/视频已经开始或不再暂停时
		if(myAuto.id==171600){
			document.getElementById('voiceGif' + objId).src = "img/voiceplayer3.gif";
		}else{
			document.getElementById('voiceGif' + objId).src = "img/voiceplayer.gif";
		}
		
	},false)
	myAuto.addEventListener('loadmetadata',function(){
		document.getElementById('Duration'+objId).innerHtml = myAuto.duration.toFixed(2);
	},false)
    myAuto.addEventListener("waiting",
	function() { //当视频由于需要缓冲下一帧而停止
		document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/loading.gif";
		$('#state'+objId).show();
		 //document.getElementById('state'+objId).innerHTML = "加载中";
		 // setTimeout(function(){document.getElementById('state'+objId).innerHTML = "加载中,你的网络较慢";},3000);
		 // setTimeout(function(){document.getElementById('state'+objId).innerHTML = "加载中,请在WiFi或4G网络下听课";},10000);
		 // setTimeout(function(){document.getElementById('state'+objId).innerHTML = "加载中,您的网速太慢了！求求你换到WiFi网络吧！";},15000);
	}, false);
	myAuto.addEventListener("playing",
    function(){ //当音频/视频在已因缓冲而暂停或停止后已就绪时
    	if(myAuto.id==171600){
    		document.getElementById('voiceGif'+objId).src="img/voiceplayer3.gif";
    	}else{
    		document.getElementById('voiceGif'+objId).src="img/voiceplayer.gif";
    	}
        $('#state'+objId).hide();
    }, false);
}

function timeToStr(time) {
    var m = 0,
    s = 0,
    _m = '00',
    _s = '00';
    time = Math.floor(time % 3600);
    m = Math.floor(time / 60);
    s = Math.floor(time % 60);
    _s = s < 10 ? '0' + s : s + '';
    _m = m < 10 ? '0' + m : m + '';
    return _m + ":" + _s;
}