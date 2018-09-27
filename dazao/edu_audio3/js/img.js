    var imgs=new Array();
    var nowImgurl="";
    function getPicInfo()
    {
      var imgObj=document.getElementById("content").querySelectorAll("img");  //获取图文中所有的img标签对象
  	  alert( imgObj[0].src)
      for(var i=0; i<imgObj.length; i++)
      {
        imgs.push(imgObj[i].src); 
        nowImgurl = this.src;
        imgObj[i].onclick=function(){
          WeixinJSBridge.invoke("imagePreview",{
            "urls":imgs,
            "current":nowImgurl
            })
        }
      }
    }    
