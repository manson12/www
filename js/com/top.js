
define(['jquery'],function(){

function GoTop(){

    this.init()
    this.click()
    this.stop()

}

GoTop.prototype.init=function(){
    this.obtn=document.getElementById('btn');
    //获取页面可视区域高度
    this.clientHeight=document.documentElement.clientHeight;
    this.timer=null;
    this.istop=true;
    this.ostop=document.documentElement.scrollTop || document.body.scrollTop;
    

}

GoTop.prototype.stop=function(){
    var _this=this;
    //滚动中执行
    
    window.onscroll=function(){
        
        if(_this.ostop>=_this.clientHeight){          
            _this.obtn.style.display='block';
           
        }
        // }else{
        //    console.log('消失')
        //     _this.obtn.style.display='none';
        // }
        if(!_this.istop){
            clearInterval(_this.timer)
        }	
        _this.istop=false;
        
       }  
    

}

GoTop.prototype.click=function(){
    var _this=this
   
    this.obtn.onclick=function(){
        //设置定时器
        
     _this.timer=setInterval(function(){
        var ostop=document.documentElement.scrollTop || document.body.scrollTop;
          //获取滚动条距离顶部高度       
            _this.ispeed=Math.floor(-ostop/5)
              document.documentElement.scrollTop=document.body.scrollTop=ostop+_this.ispeed;
              
              _this.istop=true;
          if(ostop==0){
              clearInterval(_this.timer);
          }
      },30)
                   
  }
}
var GoTop=new GoTop()
return GoTop


})


    
   	

