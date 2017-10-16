define(['jquery'],function(){

Carousel2 = (function () {
    function Carousel(ct) {
        this.ct = ct
        this.init()
        this.bind()
        this.animation()


    }

    Carousel.prototype.init = function () {
        var banImg = this.banImg = this.ct.find('.banner-img')
        var allLi = this.allLi = this.ct.find('.banner-img li');
        var banWidth = this.banWidth = this.ct.find('.banner-img').width();
        var liWidth = this.liWidth = this.ct.find('.banner-img li').width();
        var liLength = this.liLength = this.ct.find('.banner-img li').length;
        var next = this.next = this.ct.find('.next')
        var prev = this.prev = this.ct.find('.prev')
        var bullet = this.bullet = this.ct.find('.bullet li')

        this.pageIndex = 0
        this.isAnimate = false
        banImg.append($('.banner-img li').first().clone())
        banImg.prepend(allLi.last().clone())
    }


    Carousel.prototype.bind = function () {
        var _this = this

        _this.next.click(function () {

            _this.left(1)                 //改造成构造函数以后，这里就应该改为this.left  而不是left,但这里的this并不是carousel的this，而是按钮的this，所以应该在外层声明_this=this

        })
        this.prev.click(function () {

            _this.right(1)

        })

        this.bullet.click(function () {

            var index = $(this).index()

            if (index > _this.pageIndex) {
                console.log(_this.pageIndex)
                _this.left(index - _this.pageIndex)
            } else if (index < _this.pageIndex) {

                _this.right(_this.pageIndex - index)
                console.log(_this.pageIndex)
            }

        })
    }

    Carousel.prototype.left = function (len) {

        var _this = this
        if (this.isAnimate) return;   //防止重复点击
        this.iisAnimate = true

        this.banImg.animate({
            left: '-=' + len * _this.liWidth,
        }, function () {

            _this.pageIndex += len
            if (_this.pageIndex === _this.liLength) {
                _this.pageIndex = 0
                _this.banImg.css('left', -(_this.liWidth))

            }
            _this.isAnimate = false
            _this.setBullet()



        })
    }
    Carousel.prototype.right = function (len) {

        var _this = this
        if (this.isAnimate) return;
        this.isAnimate = true
        this.banImg.animate({

            left: '+=' + len * _this.liWidth,

        }, function () {
            _this.pageIndex -= len
            if (_this.pageIndex < 0) {

                _this.pageIndex = _this.liLength - 1
                _this.banImg.css('left', -(_this.liLength * _this.liWidth))

            }
            _this.isAnimate = false
            _this.setBullet()

        })

    }

    Carousel.prototype.setBullet = function () {

        var _this = this
        this.bullet.removeClass('active').eq(this.pageIndex).addClass('active')

    }


    Carousel.prototype.animation = function () {
        var _this = this
        _this.time = setInterval(function () { _this.left(1) }, 4000)
        //设置定时器
        this.ct.hover(function () {
            clearInterval(_this.time);
        }, function () {
            _this.time = setInterval(function () { _this.left(1) }, 4000)   //鼠标移动到banner上，停止动画，移开后，又继续动画 
        })
    }

    return {                                       //封装后，暴露一个出口
        init: function ($ct) {
            $ct.each(function (index, node) {
                new Carousel($(node))

                
            })
        }
         
       
    }
})()
})

         //通过 Carousel2.init()来启动效果
