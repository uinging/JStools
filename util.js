//判断一个变量是不是数组
function isArray(arr) {
    return Object.prototype.toString.call(arr) ==="[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) ==="[object Function]";
}

//得到一个元素的子元素.
function getChildNodes(node){
    var child = node.childNodes;

    function convertToArray(nodes) {
        var array;
        try {
            array = Array.prototype.slice.call(nodes,0);
        } catch (ex) {
            array = [];
            for(var i in nodes) {
                array.push(nodes[i]);
            }
        }
        return array;
    }

    child = convertToArray(child);
    var arr = [];
    for(var i in child) {
        if(child[i].nodeType == 1) {
            arr.push(child[i]);
        }
    }
    return arr;
}

// var arr2 = [].concat(arr1);
// var arr3 = arr1.slice(0);
// var arr1 = [1,3,5,"dog",{name:"wang",age:5}];

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function clone(obj) {
    var newObj = (obj.constructor === Object) ? {} : [];
    if(window.JSON){
        var temp = JSON.stringify(obj);
        newObj = JSON.parse(temp);
    }
    else {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)){
                newObj[key] = (typeof obj[key] === "object") ? clone(obj[key]) : obj[key];
            }
        }
    }

    return newObj;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var temp = [];
    if(arr[0]){
        temp.push(arr[0]);
    }
    outer: for (var i = 1; i < arr.length; i++) {
        for(var j in temp){
            if(arr[i] === temp[j]){
                continue outer;
            }
        }
        temp.push(arr[i]);
    };

    return temp;
}

// var arr1 = [1,2,3,4,2,5,3,6,1,5,6,7,87];

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var temp = "";
    for(var i = 0;i < str.length; i++) {
         
        if(
            //自己有值且不是空格,复制
            (str.charAt(i) && str.charAt(i) != " ") 
            //自己是空格,且上一位和下一位都不是空格,复制
             || (str.charAt(i) == " " 
                    && (str.charAt(i + 1) && str.charAt(i + 1) != " ") 
                )
          )
        {
            temp += str.charAt(i);
        }
    }
    //如果第0位是空格,就返回第1位及以后的字符,否则返回整个字符串
    return temp = (temp.charAt(0) == " ")? temp.slice(1) : temp; 
}
// var str = "     hello     world     hello     world     hello     world     hello     world";
// simpleTrim(str);

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    str = str.replace(/^\s*|\s*$/g, "");//删除首尾空格
    return str = str.replace(/\s+/g, " ");//删除中间多余空格
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0,len = arr.length; i < len; i++) {
        fn(arr[i],i);
    };
}
function say(value,index) {
    if(arguments.length == 1) {
        console.log(value);
    }
    else if(arguments.length == 2) {
        console.log(index + ": " + value);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var index = 0;
    for(var i in obj){
        index ++;
    }
    return index;
}

// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     }
// };
// console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    //邮箱以数字或字母开头,包含字母 数字 下划线 短横线
    var mailReg = /^[A-Za-z0-9][A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/;
    return mailReg.test(amailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // 手机号11位,纯数字.可能会有国家编号
    var phoneReg = /^(\+(\d){2})?1\d{10}$/;
    return phoneReg.test(phone);
}

// 3 DOM

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(newClassName){
        if(element.className == "") {
            element.className = newClassName;
        }
        else {
            element.className = element.className + " " + newClassName;
        }
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(oldClassName){
        var removeClassName = new RegExp(oldClassName);
        element.className = element.className.replace(removeClassName,"");
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getViewPosition1(element) {
    var position = {};
    function getLeft() {
        var left = element.offsetLeft;
        var current = element.offsetParent;
        while(current !== null){
            left += current.offsetLeft;
            current = current.offsetParent;
        }
        return left;
    }
    function getTop(){
        var top = element.offsetTop;
        var current = element.offsetParent;
        while(current !== null) {
            top += current.offsetTop;
            current = current.offsetParent;
        }
        return top;
    }
    var elementScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var elementScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    position.x = getLeft() - elementScrollLeft;
    position.y = getTop() - elementScrollTop;

    return position;

}
//获取element 相对窗口位置的另一种快捷方法
function getViewPosition2(element) {
    var position = {};

    position.x = element.getBoundingClientRect().left;
    position.y = element.getBoundingClientRect().top;

    return position;
}
//获取元素绝对位置
function getElePosition(element) {
    var position = {};
    position.x = element.getBoundingClientRect().left + getScrollLeft();
    position.y = element.getBoundingClientRect().top + getScrollTop();

    return position;
}

//滚动条高度
function getScrollTop(){
    return document.documentElement.scrollTop || document.body.scrollTop;
}
//滚动条宽度
function getScrollLeft(){
    return document.documentElement.scrollLeft || document.body.scrollLeft;
}

//鼠标绝对位置
function getPageX(event){
    event = event || window.event;
    return event.pageX || event.clientX + getScrollLeft();
}

function getPageY(event){
    event = event || window.event;
    return event.pageY || event.clientY + getScrollTop();
}

//得到窗口大小
function getViewport(){
    if (document.compatMode == "BackCompat"){
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}


// 实现一个简单的Query
function $(selector) {
    var element = [];
    var current = document;

    function getElementsByClass(className,context) {
        context = context || document;
        if(document.getElementsByClassName) {
            return context.getElementsByClassName(className);
        }
        else {
            var i;
            var arr = [];
            var elements = context.getElementsByTagName("*");
            for (i in elements) {
                if(hasClass(className,elements[i])) {
                    arr.push(elements[i]);
                }
            }
            return arr;
        }
    }

    function hasClass(className,ele) {
        if(!ele.className) {//如果元素没有class,退出.
            return false;
        }
        var classNames = ele.className.split(/\s+/);
        for (var i = 0; i < classNames.length; i++) {
            if(className === classNames[i]) {
                return true;
            }
        }
    }

    function getElementsByAttr(attr,context) {
        var elements;
        var match = [];

        if(document.all) {
            elements = context.all;
        }
        else {
            elements = context.getElementsByTagName("*");
        }

        attr = attr.replace(/\[|\]/g,"");//去掉中括号

        if(attr.indexOf("=") == -1) {//没有等于号的情况
            for (var i = 0; i < elements.length; i++) {
                if(elements[i].getAttribute(attr)) {
                    match.push(elements[i]);
                }
            }
        }
        else {//有等于号的情况
            attrArr = attr.split("=");
            for (var j = 0; j < elements.length; j++) {
                if(elements[j].getAttribute(attrArr[0]) === attrArr[1]) {
                    match.push(elements[j]);
                }
            }
        }

        return match;        
    }

    function convertToArray(nodes) {
        var array;
        try {
            array = Array.prototype.slice.call(nodes,0);
        } catch (ex) {
            array = [];
            for(var i in nodes) {
                array.push(nodes[i]);
            }
        }
        return array;
    }

    function query(ele,current) {
        var firstLetter = ele.charAt(0);
        switch (firstLetter) {
            case "#": return current.getElementById(ele.slice(1));
                break;
            case ".": return getElementsByClass(ele.slice(1),current);
                break;
            case "[": return getElementsByAttr(ele,current);
                break;
            default : return current.getElementsByTagName(ele);
                break;

        }
    }

    //因为参数之间的分割是空格,没有逗号,所以 arguments 的长度是1
    //这一步把参数用空格分割开
    var arg = selector.split(/\s+/);
    //console.log(arg);

    for (var i = 0; i < arg.length; i++) {
        if(i == 0) {
            //把结果保存在数组里.
            //getElementsByClassName() getElementsByTagName() 返回的是类数组的对象,但不是数组.不能直接运用数组方法.需要类型转换
            element = element.concat(convertToArray(query(arg[i],document)));
        }
        else {
            var temp = [];
            var result = [];
            for(var j in element) {
                // current = element[j];
                temp = convertToArray(query(arg[i],element[j]));
                if(temp.length) {
                    result = result.concat(convertToArray(temp));
                }
            }
            element = result;
            result = [];   
        }
    }
    return element;
}

// 可以通过id获取DOM对象，通过#标示，例如
// $("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
// $("[data-log]"); // 返回第一个包含属性data-log的对象

// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

// 4 事件

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event,listener,false);
    }
    else if(element.attachEvent) {
        var ieEvent = "on" + event;
        element.attachEvent(ieEvent,listener);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(event,listener,false);
    }
    else if(element.detachEvent) {
        var ieEvent = "on" + event;
        element.detachEvent(ieEvent,listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,click,listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element.onkeydown = function(event) {
        var event = event || window.event;
        if(event && event.keyCode === 13) {
            addEvent(element,event,listener);
        }
    }
}

// 事件代理,先简单一些
function delegateEvent(element, tag, eventName, listener) {

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }

    function eventFn(eventName) {
        var target = getEventTarget(eventName);
        if(target.tagName.toLowerCase() === tag) {
            listener();
        }
    }

    addEvent(element,eventName,eventFn);
}

//将函数封装为以下形式
var Event = {};
//事件绑定
Event.on(selector, event, listener) {
    var element = $(selector);//调用$()
    if(element.addEventListener) {
        element.addEventListener(event,listener,false);
    }
    else if(element.attachEvent) {
        var ieEvent = "on" + event;
        element.attachEvent(ieEvent,listener);
    }
}
//点击事件
Event.click(selector, listener) {
    Event.on(selector,click,listener);//调用Event.on()
}
//解除事件绑定
Event.un(selector, event, listener) {
    var element = $(selector);
    if(element.removeEventListener) {
        element.removeEventListener(event,listener,false);
    }
    else if(element.detachEvent) {
        var ieEvent = "on" + event;
        element.detachEvent(ieEvent,listener);
    }
}
//事件代理
Event.delegate(selector, tag, event, listener) {
    var element = $(selector);

    function getEventTarget(e) {
        var e = e || window.event;
        return e.target || e.srcElement;
    }

    function eventFn(e) {
        var target = getEventTarget(e);
        if(target.tagName.toLowerCase() === tag) {
            listener();
        }
    }
    addEvent(element, event, eventFn);
}

// 使用示例：
// $.click("[data-log]", logListener);
// $.delegate('#list', "li", "click", liClicker);


// 5 BOM

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    return !-[1,];
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var deadDate = new Date();

    deadDate.setDate(currentDate.getDate() + expiredays);
    var cookieText = encodeURIComponent(cookieName) + "="
    			   + encodeURIComponent(cookieValue);

    if (expiredays) {
    	cookieText += expiredays.toGMTString();
    }

    document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var arrCookie = document.cookie.split(";");
    for (var i = 0; i < arrCookie.length; i++) {
    	var _arr =  arrCookie[i].split("=");
    	if(_arr[0] === cookieName) {
    		return _arr[1];
    	}
    }
}

// 6 Ajax

function ajax(url, options) {
    var xhr = window.XMLHttpRequest 
                ? new XMLHttpRequest()  
                : new ActiveXObject('Microsoft.XMLHTTP');  
    var type = options.type ? options.type : "get";
    var afterHandleData = handleData(options.data);

    if(type == "get"){
        url = url + "?" + afterHandleData;
        xhr.open(type,url,true);
        xhr.onreadystatechange = ready;
        xhr.send(null);
    }
    else if(type == "open") {
        xhr.open(type,url,true);
        xhr.onreadystatechange = ready;
        xhr.send(afterHandleData);
    }

    function ready() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                options.onsuccess();
            }
            else {
                options.onfail();
            }
        }
    }

    function handleData(data) {
        var temp = "";
        var key;

        for(key in data) {
            temp += "&" + key + "=" + data[key];
        }

        //删掉第一个 &
        if(temp.charAt(0) === "&"){
            temp = temp.slice(1);
        }

        return temp;
    }
}

// 使用示例：
/*ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
)*/

// options是一个对象，里面可以包括的参数为：

// type: post或者get，可以有一个默认值
// data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
// onsuccess: 成功时的调用函数
// onfail: 失败时的调用函数
