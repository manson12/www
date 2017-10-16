// 1.获取数据   2.把数据变为Dom，拼接HTML  3.通过瀑布流方式放到页面   4.当滚动到底部时加载。\


define(['jquery'], function () {

    function WaterFall() {
        this.init()
        this.start()
       this.moreClick()
        
        
        
    }

    WaterFall.prototype = {

        init: function () {
            this.page = 1;
            this.pageCount = 10;
            this.arrHeight = []
            this.colCount = Math.floor($('.pic-wall').width() / $('.item').outerWidth(true))
            this.nodeWidth = $('.item').outerWidth(true)
            for (var i = 0; i < this.colCount; i++) {
                this.arrHeight[i] = 0
            }
        },
        
        //瀑布流            
        waterfall:function(node) {
            
            var _this=this

        var idx = 0;
        var minHeight = _this.arrHeight[0];
        for (var i = 0; i < _this.arrHeight.length; i++) {  
               
            if (_this.arrHeight[i] <minHeight) {
                
                idx = i;
                minHeight = _this.arrHeight[i];

            }
        }
       
        node.css({
            top: minHeight,
            left:_this.nodeWidth * idx,
            opacity: 1
        })
        _this.arrHeight[idx] = node.outerHeight(true) + _this.arrHeight[idx]
        $('.pic-wall').height(Math.max.apply(null, _this.arrHeight))

    },
    
    //ajax获取数据
     getData:function(callBack) {
        
         var _this=this
        
            $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',     //预期服务器返回的数据类型    
                jsonp: 'jsoncallback',  //在一个jsonp请求中重写回调函数的名字
                data: {                     //发送到服务器的数据。将自动转换为请求字符串格式
                    app_key: '1271687855',
                    num: _this.pageCount,
                    page: _this.page
                }
                
    
            }).done(function (ret) {
                
                if (ret && ret.status && ret.status.code === "0") {
                   
                   callBack(ret.data)     //如果数据没有问题，生成节点摆好位置
                   
                    _this.page++
                 
                } else {
                    console.log('get error data')
                }
    
            })
            
        },

    //添加
     start:function(){
         var _this=this
        this.getData(function (newsList) {

            $.each(newsList, function (index, news) {
                var node =_this.getNode(news)
                node.find('img').load(function () {   //每当图片加载时，就把拼接好的HTML添加到ul里面
                    $('.pic-wall').append(node)
                    _this.waterfall(node)


                })

            })
        })
        

    },
        //拼接HTML
        getNode:function (item) {
            var html = ''
            html += '<li class="item">';
            html += ' <a href="' + item.url + '" class="link"><img src="' + item.img_url + '" alt=""></a>'
            html += '<h4 class="title">' + item.short_name + '</h4>'
            html += '<p class="text">' + item.short_intro + '</p>'
            html += '</li>'
            return $(html)
    
        },
        moreClick:function(){
            var _this=this
            $('#load a').click(function () {
                _this.start()
            })
        }
        
    }

    return new WaterFall()

})