module.exports = {
    pages:[
        'index',
        'list',
        'detail',
        'charge',
        'qrcode',
        'progress',
        'record',
        'favourite',
        'user'
    ],
    prejs: [
        '../lib/jquery.min.js',
        '../lib/flexible.min.js',
    ],
    js:[
        '../lib/weixin-1.2.0.js',
        '../lib/doT.min.js',
    ],
    css:[
        '../lib/weui.min.css'
    ],
    pro:{
        env:'pro',
        subTitle:''
    },
    dev:{
        env:'dev',
        subTitle:'测试-',
        indexTitle:"",
        bigscTitle: ""
    }
}