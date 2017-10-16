define(['jquery'], function ($) {
    function waterFall1() {
      this.init = function () {
        this.wrapWidth = $('.waterfall').width()
        this.eleWidth = $('.item').outerWidth(true)
        this.colSumHeight = []
        this.colNum = parseInt(this.wrapWidth/this.eleWidth)
        this.perPageCount = 10
        this.curPage = 1
        this.isArrive = false
        for(var i=0; i<this.colNum; i++){
          this.colSumHeight.push(0)
        }
      }
  
      this.init()
      this.main()
      this.event()
    }
  
    waterFall1.prototype.getData = function (callback) {
      var _this = this
      $.ajax(
          {
            url: 'https://platform.sina.com.cn/slide/album_tech',
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            data: {
              app_key: '1271687855',
              num: this.perPageCount,
              page: this.curPage,
            }
          }).done(function(ret){
        if(ret && ret.status && ret.status.code === "0"){
          callback(ret.data)
          _this.curPage += 1
  
        }else{
          console.log('get error data');
        }
        console.log(_this.curPage)
      })
    }
    waterFall1.prototype.main = function () {
      var _this = this
      this.getData(function (newitems) {
        _this.isArrive = true
        $.each(newitems, function(idx,news) {
          var $node = _this.getNode(news)
          $node.find('img').load(function () {
            $('.pic').append($node)
            _this.putItem($node)
          })
        })
      })
      _this.isArrive = false
    }
  
    waterFall1.prototype.putItem = function (node) {
      var cur = $(node)
      var idx = 0
      var minSumHeight = Math.min.apply(null, this.colSumHeight)
      idx = this.colSumHeight.indexOf(minSumHeight)
      cur.css({
        top: minSumHeight,
        left: this.eleWidth*idx
      })
      this.colSumHeight[idx] = cur.outerHeight(true) + this.colSumHeight[idx]
      $('.pic').height(Math.max.apply(null,this.colSumHeight));
    }
  
    waterFall1.prototype.getNode = function (item) {
      var tpl = ''
      tpl += '<li class="item">';
      tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
      tpl += ' <h4 class="header">'+ item.short_name +'</h4>';
      tpl += '<p class="desp">'+item.short_intro+'</p>';
      tpl += '</li>';
      return $(tpl)
    }
  
  
  
    waterFall1.prototype.event = function () {
      var _this = this
      $('.hide>a').click(function (e) {
        e.preventDefault()
        console.log('click')
        _this.main()
      })
    }
  
  
  
    waterFall1.prototype.visible = function (node) {
      if (node.offset().top < $(window).scrollTop() + $(window).height()) {
        return true
      } else {
        return false
      }
    }
    return new waterFall1()
  })