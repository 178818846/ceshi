var videoF = (function() {
    var tmpV = {};
    var video_playing;
    /**
     * @description 切换内容列时暂停当前播放的视频
     */
    function pausedVBeforeChangeLi() {
        if (video_playing && !video_playing.ended && !video_playing.paused) {
            video_playing.pause();
        }
    };
    tmpV.pausedVBeforeChangeLi= pausedVBeforeChangeLi;
    /**
     * @description 播放全屏 很诡异，这个方法居然不可用
     * @param {Object} element
     */
    function launchFullScreen(element) {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    };
    /**
     * @description 取消全屏 这个方法也是不可用
     * @param {Object} elem
     */
    function cancelFullScrren(elem) {
        elem = elem || document;
        if (elem.cancelFullScrren) {
            elem.cancelFullScrren();
        } else if (elem.mozCancelFullScreen) {
            elem.mozCancelFullScreen();
        } else if (elem.webkitCancelFullScreen) {
            console.log("webkitCancelFullScreen");
            elem.webkitCancelFullScreen();
        }
    };
    /**
     * @return 返回支持的全屏函数 从网上找到了这段代码，具体网址忘记了，返回支持的全屏方法，在Safari上可用
     * @param {Object} elem
     */
    function fullscreen(elem) {
        var prefix = 'webkit';
        if (elem[prefix + 'EnterFullScreen']) {
            return prefix + 'EnterFullScreen';
        } else if (elem[prefix + 'RequestFullScreen']) {
            return prefix + 'RequestFullScreen';
        };
        return false;
    };
    /**
     * @description video相关事件的绑定
     * @param {Object} v
     */
    function videoEvent(v) {
        var video = v,
            doc = document;
        video.addEventListener('play', function() {
            //每次只能播放一个视频对象
            if (video_playing && video_playing !== this) {
                console.log('multi')
                pausedVBeforeChangeLi();
            }
            video_playing = this;
            console.log('play');
            var fullscreenvideo = fullscreen(video);
            video[fullscreenvideo]();
        });
        video.addEventListener('click', function() {
            //点击时如果在播放，自动全屏；否则全屏并播放
            console.log('click')
            if (this.paused) {
                console.log('paused');
                this.play();
            } else {
                var fullscreenvideo = fullscreen(video);
                video[fullscreenvideo]();
            }
        })
        video.addEventListener('pause', function(e) {
            this.webkitExitFullScreen();
        });
        video.addEventListener("webkitfullscreenchange", function(e) {
            //TODO 未侦听到该事件
            console.log(3);
            if (!doc.webkitIsFullScreen) { //退出全屏暂停视频
                video.pause();
            };
        }, false);
        video.addEventListener("fullscreenchange ", function(e) {
            console.log(31);
            if (!doc.webkitIsFullScreen) { //退出全屏暂停视频
                video.pause();
            };
        }, false);
        video.addEventListener('ended', function() {
            //播放完毕，退出全屏
            console.log(4)
            this.webkitExitFullScreen();
        }, false);
    };
    tmpV.videoEvent = videoEvent;
    return tmpV;
}());