/**
 * Created by Alkali on 15/8/7.
 */
var MyQuery = {
    addHandler: function (oElement, sEvent, fnHandler) {
        oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent("on" + sEvent, fnHandler)
    },
    removeHandler: function (oElement, sEvent, fnHandler) {
        oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, fnHandler)
    },
    addLoadHandler: function (fnHandler) {
        this.addHandler(window, "load", fnHandler)
    },
    hasClass: function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    addClass: function (element, value) {
        if(!element.className){
            element.className = value;
        }else{
            var newClassName = element.className;
            newClassName += " " + value;
            element.className = newClassName;
        }
    },
    removeClass: function (obj, cls) {
        if (MyQuery.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },
    getTagList: function (element, tag) {
        if(!tag) return element.children;
        var list = element.children,
            tagList = [];
        for(var i = 0, len = list.length; i < len; i ++) {
            if(list[i].tagName.toLowerCase() == tag.toLowerCase()) {
                tagList.push(list[i]);
            }
        }
        return tagList;
    },
    constant: function(target,json,speed,callback){
        var timeScale = 1000 / 60,
            count = speed / timeScale,
            begin;

        if(target.timer){
            clearTimeout(target.timer);
        }

        for(var key in json){
            if(window.getComputedStyle){
                begin = parseFloat(window.getComputedStyle(target, null)[key]);
            }else{
                begin = parseFloat(target.currentStyle[key]);
            }
            target[key] = (json[key] - begin) / count;
        }
        target.timer = setInterval(function(){
            var oldValue,newValue;
            var stop = true;
            for(var key in json){
                if(window.getComputedStyle){
                    oldValue = parseFloat(window.getComputedStyle(target, null)[key]);
                }else{
                    oldValue = parseFloat(target.currentStyle[key]);
                }
                if(oldValue != json[key]){
                    stop = false;
                }
                if(target.addEventListener && Math.abs(oldValue - json[key]) < 1){
                    target.style[key] = json[key] + "px";
                }else if(!target,addEventListener && Math.abs(oldValue - json[key]) < 25){
                    target.style[key] = json[key] + "px";
                }else{
                    newValue = oldValue + target[key];
                    target.style[key] = newValue + "px";
                }
            }
            if(stop){
                clearInterval(target.timer);
                typeof callback == "function" && callback();
            }
        }, timeScale);
    },
    getObjStyle: function(obj, style) {
        if(obj.currentStyle)
            return obj.currentStyle[style];
        else if(window.getComputedStyle)
            return window.getComputedStyle(obj, null)[style];
        else
            return null;
    },
    getClassName: function(className){
        var el = [],
            _el = document.getElementsByTagName('*');
        for(var i=0; i<_el.length; i++){
            if (MyQuery.hasClass(_el[i], className)){
                el[el.length] = _el[i];
            }
        }
        return el;
    }
};