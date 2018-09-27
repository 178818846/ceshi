
$(document).ready(function(){
	/*var topMain=$(".login").height()+$(".header").height()//是头部的高度加头部与nav导航之间的距离
	var nav=$(".header");
	var logoimg=$("#logoimg");
	$(window).scroll(function(){
		if ($(window).scrollTop()>topMain){//如果滚动条顶部的距离大于topMain则就nav导航就添加类.nav_scroll，否则就移除
			//nav.addClass("nav_scroll");
			//logoimg.removeClass("logoimg");
			//logoimg.addClass("logo_img_scroll");
			$(".nav_scroll").slideDown(500);
		}else{
			//nav.removeClass("nav_scroll");
			//logoimg.removeClass("logo_img_scroll");
			//logoimg.addClass("logoimg");
			$(".nav_scroll").hide();
		}
	});*/
})

//关注好友
function follows(uid,url)
{
	$.post(url,{uid:uid},function(result){
		if(result ==1) {
			$('div[name="follow_'+uid+'"]').each(function(){  
				$('div[name="follow_'+uid+'"]').removeClass().addClass('followstate0');
				$('div[name="follow_'+uid+'"]').html('已关注'); 
			})
			//tipok('成功加为关注'); 
		}else if(result ==2){
			$('div[name="follow_'+uid+'"]').each(function(){  
				$('div[name="follow_'+uid+'"]').removeClass().addClass('followstate1');
				$('div[name="follow_'+uid+'"]').html('+ 关注');
			})
			//$('#myfollow_'+uid).hide();
			//tipok('您已经取消了关注'); 
		}else if(result ==3){
			$('div[name="follow_'+uid+'"]').each(function(){  
				$('div[name="follow_'+uid+'"]').removeClass().addClass('followstate0');
				$('div[name="follow_'+uid+'"]').html('已相互关注'); 
			})
			//tipok('您已经取消了关注'); 
		}else if(result ==4){
			if(host == "http://www.sybiji.com"){//www域名
				actionUrl = "http://www.sybiji.com/may.php?c=w&a=login&t=1";
			}else{
				actionUrl = "http://localhost/sybj/index.php?c=w&a=login&t=1";
			}
			window.location.href = actionUrl;
		}else{
			alert(result);
		}
	  });

}

	//播放语音
	function playMusic(objId){
		var state = document.getElementById('voiceGif'+objId).src;
		var myAuto = document.getElementById(''+objId);
		
		if(state == "http://www.sybiji.com/tpl/m_image/voice1.png"){
			var num = $("audio").length;
			var i = 0;
			while (i < num){
				$("audio")[i].pause();
				$('#state'+$("audio")[i]['id']).hide();
				i++;
			}
			myAuto.play();
			//document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/voiceplayer.gif";
			//document.getElementById('Duration'+objId).innerHTML = musicDuration.toFixed(2);
		}else{
			myAuto.pause();
			//document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/voice1.png";
		}

		myAuto.addEventListener("ended",
			function() {
				document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/voice1.png";
				var audioArray = $("audio");
				for(var i = 0;i < audioArray.length; i++) {
					if(audioArray[i]['id'] == myAuto['id']){
						//console.log("======1=======");
						playMusic(audioArray[i+1]['id']);
						return;
					}
				}
				$('#state'+objId).hide();
			}, false);
		myAuto.addEventListener("pause",
			function() { //监听暂停
				document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/voice1.png";
			}, false);
		myAuto.addEventListener("play",
			function() { //当音频/视频已开始或不再暂停时
				document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/voiceplayer.gif";
			}, false);
		myAuto.addEventListener("loadedmetadata",
			function() { //监听暂停
				document.getElementById('Duration'+objId).innerHTML = myAuto.duration.toFixed(2);
			}, false);

		myAuto.addEventListener("waiting",
			function() { //当视频由于需要缓冲下一帧而停止
				document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/loading.gif";
				$('#state'+objId).show();
				document.getElementById('state'+objId).innerHTML = "加载中";
				setTimeout(function(){document.getElementById('state'+objId).innerHTML = "加载中,你的网络较慢";},3000);
				setTimeout(function(){document.getElementById('state'+objId).innerHTML = "加载中,请在WiFi或4G网络下听课";},10000);
				setTimeout(function(){document.getElementById('state'+objId).innerHTML = "加载中,您的网速太慢了！求求你换到WiFi网络吧！";},15000);
			}, false);
		myAuto.addEventListener("playing",
			function() { //当音频/视频在已因缓冲而暂停或停止后已就绪时
				document.getElementById('voiceGif'+objId).src="http://www.sybiji.com/tpl/m_image/voiceplayer.gif";
				$('#state'+objId).hide();
			}, false);
	}

function showPic(url,width){
	art.dialog({
		padding: 0,
		width: width,
		title: '照片',
		content: '<img src="'+url+'" width="100%"/>',
		lock: true
	});
}

function showVideo(url){
	art.dialog({
		padding: 0,
		title: '视频',
		content: '<video controls="controls" data-ke-src="'+url+'" name="media" style="max-width: 100%; box-sizing: border-box !important;" preload="meta"><source src="'+url+'" type="video/mp4"></video>',
		lock: true
	});
}

/*短暂提示 ok 和err*/
function tipok(txt){$.dialog({icon: 'face-smile',id:'tips', content: txt,time:2,fixed:true});}
function tiper(txt){$.dialog({icon: 'face-sad',id:'tips', content: txt,time:2,fixed:true});}

//是否存在指定函数 
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}

//是否存在指定变量 
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            //alert("value is undefined"); 
            return false;
        } else {
            //alert("value is true"); 
            return true;
        }
    } catch(e) {}
    return false;
}