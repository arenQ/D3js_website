/**
 * Created by DELL on 2017/4/16.
 */
addLoadEvent(bindOnblurEvent());
addLoadEvent(lineForA());
addLoadEvent(signFunc());
/*************给登录和注册按钮添加下划线**************/
function lineForA(){
    var div = document.getElementById("form-topfont");
    var links = div.getElementsByTagName("a");
    links[0].style.borderBottom = "2px solid white";
    links[1].onmouseover = function(){
        this.style.borderBottom = "2px solid white";
        links[0].style.border = 0;
    };
    links[1].onmouseout = function(){
        this.style.border = 0;
        links[0].style.border = 0;
    };
    links[0].onmouseover = function () {
        this.style.borderBottom = "2px solid white";
        links[1].style.border = 0;
    };
    links[0].onmouseout = function () {
        this.style.border = 0;
        links[1].style.border = 0;
    };
}

/*************给导航栏输入框绑定onblur事件**************/
function bindOnblurEvent() {
    var input = document.getElementById("navbar-input");
    input.onblur = function(){
        var flag = 0;
        var text = this.value;
        var links = document.getElementsByClassName("demo-link");
        for(var i = 0; i < links.length; i++){
            if(links[i].innerHTML == text){
                window.open(links[i].href);//打开对应的链接网页
                flag = 1;
            }
        }
        if(flag == 0){
            this.value = "该图不存在于本网站!";
        }
        else{
            flag = 0;
        }
    }
}

/*************登录和注册功能的转换**************/
function signFunc(){
    var graph = document.createElement("i");
    graph.setAttribute("class","fa fa-envelope-o fa-lg");

    var input = document.createElement("input");
    input.setAttribute("type","email");
    input.setAttribute("placeholder","Email");
    input.setAttribute("name","Email");
    input.setAttribute("class","form-control Form");

    var input_father = document.createElement("div");
    input_father.setAttribute("class","col-md-2 col-md-offset-5");
    input_father.appendChild(graph);
    input_father.appendChild(input);

    var input_grandfather = document.createElement("div");
    input_grandfather.setAttribute("class","form-group form-input");
    input_grandfather.appendChild(input_father);

    var form = document.getElementById("form");
    var submit = document.getElementById("form-sign");
    var signin = document.getElementById("signin-a");
    var signup = document.getElementById("signup-a");
    var sign = document.getElementById("sign");
    signin.onclick = function(){
        if(input_grandfather){
            input_grandfather.parentNode.removeChild(input_grandfather);
            sign.setAttribute("value","sign in");
            form.setAttribute("action","../login.php");
        }
    };
    signup.onclick = function(){
        form.insertBefore(input_grandfather,submit);
        sign.setAttribute("value","sign up");
        form.setAttribute("action","../register.php");
    };
    console.log(input_father);
}

/*************用来执行多个自定义的函数**************/
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }
    else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}