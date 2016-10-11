/**
 * Created by Administrator on 2016/10/10.
 */
var JSSDK = function() {

    var  urls= encodeURIComponent((location.href.split("#")[0]).toString());
    var myRequest = new MyXMLHttpRequest();
    myRequest.send('POST',"http://s1.ns.qimi.com/jssdk/index.php",'url='+urls,successFunction,failFunction);


    function failFunction(status,data,url) {
        console.log("请求失败  url :" + url );
    }

    function successFunction(e) {
        var info = JSON.parse(e);
        signPackage = {};
        signPackage.appId = info.appId;
        signPackage.nonceStr = info.nonceStr;
        signPackage.timestamp = info.timestamp;
        signPackage.signature = info.signature;

        getWeiXinConfig();
    }

    function getWeiXinConfig() {
        var bodyConfig = {};
        bodyConfig.debug = true;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);
        wx.ready(function (res) {
            console.log("---注入---------- "+res);
            onBridgeReady();
        });
        wx.error(function(res){
            console.log("------------- "+res);
        });

    };

    function onBridgeReady() {
        var shareInfo = {
            "title":"测试测试测试",
            "desc":"测试测试测试测试测试测试测试测试测试测试测试测试",
            "link":window.location.href,
            "imgUrl":"http://static.egret-labs.org/h5game/Leaflets/h5WeixinShareDemo/v12/res/icon3.jpg"};

        function weixinShareGetReady(){
            if(!wx){
                console.log("---wx 没有----");
                return;
            }
            wx.onMenuShareAppMessage(shareInfo);
            wx.onMenuShareTimeline({
                title:shareInfo.title,
                desc:shareInfo.desc,
                link:shareInfo.link,
                imgUrl:shareInfo.imgUrl
            });
            wx.onMenuShareQQ(shareInfo);
            wx.onMenuShareWeibo(shareInfo)
        }
        weixinShareGetReady();
    };
}();


