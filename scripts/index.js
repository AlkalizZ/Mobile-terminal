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
    drawer = document.getElementById("drawer");

var clientWidth = document.documentElement.clientWidth,
    clientHeight = document.body.clientHeight;

    var drawerWidth = drawer.offsetWidth;
    drawer.style.transform = "translate3d(" + drawerWidth + "px,0, 0)";
//关闭抽屉
MyQuery.addHandler(cancleBtn, "touchend", function(){
    var drawerWidth = drawer.offsetWidth;
    shadow.style.display = "none";
    drawer.style.transform = "translate3d(" + drawerWidth + "px,0,0)";
});

//window.onload = function(){
//    var drawerWidth = drawer.offsetWidth;
//    drawer.style.transform = "translate3d(" + drawerWidth + "px,0, 0)";
//    drawer.style.display = "block";
//}
//打开抽屉
MyQuery.addHandler(openDrawer, "touchend", function(){
    drawer.style.transform = "translate3d(0px,0px,0px)";
    shadow.style.display = "block";

});

//开关抽屉
shadow.style.width = clientWidth + "px";
shadow.style.height = clientHeight + "px";
MyQuery.addHandler(shadow, "touchend", function(){
    var drawerWidth = drawer.offsetWidth;
    shadow.style.display = "none";
    drawer.style.transform = "translate3d(" + drawerWidth + "px,0,0)";
})

//导航栏切换
for(var i = 0; i < lis.length; i++){
    lis[i].index = i;
    MyQuery.addHandler(lis[i], "touchend", function(){
        var margin = parseFloat(MyQuery.getObjStyle(navSlide, "marginLeft")) * 2,
            navSlideWidth = navSlide.offsetWidth,
            totalWidth = margin + navSlideWidth;
        console.log(totalWidth);
        navSlide.style.transform = "translate(" + totalWidth * this.index + "px)";
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

