//�ж�һ�������ǲ�������
function isArray(arr) {
    return Object.prototype.toString.call(arr) ==="[object Array]";
}

// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
    return Object.prototype.toString.call(fn) ==="[object Function]";
}

//�õ�һ��Ԫ�ص���Ԫ��.
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

// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
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

// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
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

// ʵ��һ���򵥵�trim����������ȥ��һ���ַ�����ͷ����β���Ŀհ��ַ�
// �ٶ��հ��ַ�ֻ�а�ǿո�Tab
// ��ϰͨ��ѭ�����Լ��ַ�����һЩ�����������ֱ�ɨ���ַ���strͷ����β���Ƿ��������Ŀհ��ַ�������ɾ�����ǣ���󷵻�һ�����ȥ�����ַ���
function simpleTrim(str) {
    var temp = "";
    for(var i = 0;i < str.length; i++) {
         
        if(
            //�Լ���ֵ�Ҳ��ǿո�,����
            (str.charAt(i) && str.charAt(i) != " ") 
            //�Լ��ǿո�,����һλ����һλ�����ǿո�,����
             || (str.charAt(i) == " " 
                    && (str.charAt(i + 1) && str.charAt(i + 1) != " ") 
                )
          )
        {
            temp += str.charAt(i);
        }
    }
    //�����0λ�ǿո�,�ͷ��ص�1λ���Ժ���ַ�,���򷵻������ַ���
    return temp = (temp.charAt(0) == " ")? temp.slice(1) : temp; 
}
// var str = "     hello     world     hello     world     hello     world     hello     world";
// simpleTrim(str);

// ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
// ����ʹ��һ�м���������ʽ��ɸ���Ŀ
function trim(str) {
    str = str.replace(/^\s*|\s*$/g, "");//ɾ����β�ո�
    return str = str.replace(/\s+/g, " ");//ɾ���м����ո�
}

// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
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

// ��ȡһ�����������һ��Ԫ�ص�����������һ������
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

// �ж��Ƿ�Ϊ�����ַ
function isEmail(emailStr) {
    //���������ֻ���ĸ��ͷ,������ĸ ���� �»��� �̺���
    var mailReg = /^[A-Za-z0-9][A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/;
    return mailReg.test(amailStr);
}

// �ж��Ƿ�Ϊ�ֻ���
function isMobilePhone(phone) {
    // �ֻ���11λ,������.���ܻ��й��ұ��
    var phoneReg = /^(\+(\d){2})?1\d{10}$/;
    return phoneReg.test(phone);
}

// 3 DOM

// Ϊelement����һ����ʽ��ΪnewClassName������ʽ
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

// �Ƴ�element�е���ʽoldClassName
function removeClass(element, oldClassName) {
    if(oldClassName){
        var removeClassName = new RegExp(oldClassName);
        element.className = element.className.replace(removeClassName,"");
    }
}

// �ж�siblingNode��element�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// ��ȡelement�������������ڵ�λ�ã�����һ������{x, y}
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
//��ȡelement ��Դ���λ�õ���һ�ֿ�ݷ���
function getViewPosition2(element) {
    var position = {};

    position.x = element.getBoundingClientRect().left;
    position.y = element.getBoundingClientRect().top;

    return position;
}
//��ȡԪ�ؾ���λ��
function getElePosition(element) {
    var position = {};
    position.x = element.getBoundingClientRect().left + getScrollLeft();
    position.y = element.getBoundingClientRect().top + getScrollTop();

    return position;
}

//�������߶�
function getScrollTop(){
    return document.documentElement.scrollTop || document.body.scrollTop;
}
//���������
function getScrollLeft(){
    return document.documentElement.scrollLeft || document.body.scrollLeft;
}

//������λ��
function getPageX(event){
    event = event || window.event;
    return event.pageX || event.clientX + getScrollLeft();
}

function getPageY(event){
    event = event || window.event;
    return event.pageY || event.clientY + getScrollTop();
}

//�õ����ڴ�С
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


// ʵ��һ���򵥵�Query
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
        if(!ele.className) {//���Ԫ��û��class,�˳�.
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

        attr = attr.replace(/\[|\]/g,"");//ȥ��������

        if(attr.indexOf("=") == -1) {//û�е��ںŵ����
            for (var i = 0; i < elements.length; i++) {
                if(elements[i].getAttribute(attr)) {
                    match.push(elements[i]);
                }
            }
        }
        else {//�е��ںŵ����
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

    //��Ϊ����֮��ķָ��ǿո�,û�ж���,���� arguments �ĳ�����1
    //��һ���Ѳ����ÿո�ָ
    var arg = selector.split(/\s+/);
    //console.log(arg);

    for (var i = 0; i < arg.length; i++) {
        if(i == 0) {
            //�ѽ��������������.
            //getElementsByClassName() getElementsByTagName() ���ص���������Ķ���,����������.����ֱ���������鷽��.��Ҫ����ת��
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

// ����ͨ��id��ȡDOM����ͨ��#��ʾ������
// $("#adom"); // ����idΪadom��DOM����

// ����ͨ��tagName��ȡDOM��������
// $("a"); // ���ص�һ��<a>����

// ����ͨ����ʽ���ƻ�ȡDOM��������
// $(".classa"); // ���ص�һ����ʽ�������classa�Ķ���

// ����ͨ��attributeƥ���ȡDOM��������
// $("[data-log]"); // ���ص�һ����������data-log�Ķ���

// $("[data-time=2015]"); // ���ص�һ����������data-time��ֵΪ2015�Ķ���

// ����ͨ���򵥵������߲�ѯ�����ԣ�����
// $("#adom .classa"); // ����idΪadom��DOM�������������ӽڵ��У���һ����ʽ�������classa�Ķ���

// 4 �¼�

// ��һ��element��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event,listener,false);
    }
    else if(element.attachEvent) {
        var ieEvent = "on" + event;
        element.attachEvent(ieEvent,listener);
    }
}

// �Ƴ�element�������event�¼�����ʱִ��listener����Ӧ
function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(event,listener,false);
    }
    else if(element.detachEvent) {
        var ieEvent = "on" + event;
        element.detachEvent(ieEvent,listener);
    }
}

// ʵ�ֶ�click�¼��İ�
function addClickEvent(element, listener) {
    addEvent(element,click,listener);
}

// ʵ�ֶ��ڰ�Enter��ʱ���¼���
function addEnterEvent(element, listener) {
    element.onkeydown = function(event) {
        var event = event || window.event;
        if(event && event.keyCode === 13) {
            addEvent(element,event,listener);
        }
    }
}

// �¼�����,�ȼ�һЩ
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

//��������װΪ������ʽ
var Event = {};
//�¼���
Event.on(selector, event, listener) {
    var element = $(selector);//����$()
    if(element.addEventListener) {
        element.addEventListener(event,listener,false);
    }
    else if(element.attachEvent) {
        var ieEvent = "on" + event;
        element.attachEvent(ieEvent,listener);
    }
}
//����¼�
Event.click(selector, listener) {
    Event.on(selector,click,listener);//����Event.on()
}
//����¼���
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
//�¼�����
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

// ʹ��ʾ����
// $.click("[data-log]", logListener);
// $.delegate('#list', "li", "click", liClicker);


// 5 BOM

// �ж��Ƿ�ΪIE�����������-1���߰汾��
function isIE() {
    return !-[1,];
}

// ����cookie
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

// ��ȡcookieֵ
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

        //ɾ����һ�� &
        if(temp.charAt(0) === "&"){
            temp = temp.slice(1);
        }

        return temp;
    }
}

// ʹ��ʾ����
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

// options��һ������������԰����Ĳ���Ϊ��

// type: post����get��������һ��Ĭ��ֵ
// data: ���͵����ݣ�Ϊһ����ֵ�������Ϊһ����&���ӵĸ�ֵ�ַ���
// onsuccess: �ɹ�ʱ�ĵ��ú���
// onfail: ʧ��ʱ�ĵ��ú���
