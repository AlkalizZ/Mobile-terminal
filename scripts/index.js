/**
 * Created by Alkali on 15/8/12.
 */


var shadow = document.getElementById("shadow"),
    openDrawer = document.getElementById("open-drawer"),
    nav = document.getElementById("nav").children[0],
    lis = MyQuery.getTagList(nav,"li"),
    navSlide = document.getElementById("nav-slide"),
    choiceBtn = MyQuery.getClassName("choices"),
    details = MyQuery.getClassName("details"),
    cancleBtn = document.getElementById("cancle"),
    ensureBtn = document.getElementById("ensure"),
    drawer = document.getElementById("drawer"),
    body = document.getElementsByTagName("body")[0];

var clientWidth = document.documentElement.clientWidth,
    clientHeight = document.body.clientHeight,
    startX, startY;
MyQuery.addHandler(body, "touchstart", function(event){
    event = event || window.event;
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

MyQuery.addHandler(body, "touchmove", function(event){
    event = event || window.event;
    var touch = event.touches[0],
        x = touch.pageX,
        y = touch.pageY;
    if(x < startX - 10 || x > startX + 10){
        event.preventDefault();
    }
    if(x == startX && y != startY){
        event.preventDefault();
    }
});





shadow.style.width = clientWidth + "px";
shadow.style.height = clientHeight + "px";
var drawerWidth = drawer.offsetWidth;
drawer.style.transform = "translate3d(" + drawerWidth + "px,0, 0)";
//关闭抽屉
MyQuery.addHandler(cancleBtn, "touchend", function(){
    var drawerWidth = drawer.offsetWidth;
    shadow.style.display = "none";
    drawer.style.transform = "translate3d(" + drawerWidth + "px,0,0)";
});
MyQuery.addHandler(shadow, "touchend", function(){
    var drawerWidth = drawer.offsetWidth;
    shadow.style.display = "none";
    var move = "translate3d(" + drawerWidth + "px,0,0)";
    drawer.style.transform = move;
    drawer.style.webkitTransformOriginX = move;
})

//打开抽屉
MyQuery.addHandler(openDrawer, "touchend", function(){
    drawer.style.transform = "translate3d(0px,0px,0px)";
    shadow.style.display = "block";

});

//导航栏切换
for(var i = 0; i < lis.length; i++){
    lis[i].index = i;
    MyQuery.addHandler(lis[i], "touchend", function(){
        var margin = parseFloat(MyQuery.getObjStyle(navSlide, "marginLeft")) * 2,
            navSlideWidth = navSlide.offsetWidth,
            totalWidth = margin + navSlideWidth;
        navSlide.style.transform = "translate3d(" + totalWidth * this.index + "px,0,0)";
    });
}

//抽屉切换
for(var i = 0; i < choiceBtn.length; i++){
    choiceBtn[i].index = i;
    MyQuery.addHandler(choiceBtn[i], "touchend", function(){
        for(var i = 0; i < details.length; i++){
            details[i].style.display = "none";
        }
        for(var i = 0; i < choiceBtn.length; i++){
            choiceBtn[i].children[1].style.transform = "rotate(0deg)";
        }
        choiceBtn[this.index].children[1].style.transform = "rotate(90deg)";
        details[this.index].style.display = "block";
    });
}

//获取选项的数组
var detailsChild = [];
for(var i = 0; i < details.length; i++){
    detailsChild[i] = details[i].children;
}
//
//for(var i = 0; i < detailsChild.length; i++){
//    var index = i;
//    console.log(detailsChild[i]);
//    for(var a = 0; a < detailsChild[i].length; a++){
//        MyQuery.addHandler(detailsChild[i][a],"touchend", function(){
//            for(var b = 0; b < detailsChild[index].length; b++){
//                //清空勾
//                for(var c = 0; c < detailsChild[i][b].length; c++){
//                    detailsChild[i][b].children[1].innerHTML = "";
//                }
//            }
//            detailsChild[i][a].children[1].innerHTML = "&#xe60a;";
//        });
//    }
//}

