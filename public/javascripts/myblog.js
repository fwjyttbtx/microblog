/**
 * Created by Administrator on 14-2-27.
 */
(function () {
    var getCcap = function () {
        var capImg = $(".captchaImg");
        capImg.attr("src", "/getCaptcha");
    };

    $('#captcha').one("click", function () {
        getCcap();
    });

    $(".captchaImg").click(function () {
        getCcap();
        checkCaptcha();
    });

    $("#username").blur(function(){
        var usernameVal = $("#username").val();
        if(!/^[A-Za-z0-9_-]{3,20}$/.test(usernameVal)){
            $("#username").parent("div").parent("div").addClass("error");
            $("#username-error-icon").show();
            $("#username-ok-icon").hide();
            $(".username-error").text("用户名必须大于3个字符并且小于20个字符");
        }else{
            $("#username").parent("div").parent("div").removeClass("error");
            $("#username-error-icon").hide();
            $("#username-ok-icon").show();
            $(".username-error").text("");
        }
    });
    $("#password, #password-repeat").blur(function(){
        var passwordVal = $("#password").val();
        var passwordRepeatVal = $("#password-repeat").val();
        if(passwordVal == null || passwordVal.trim() == "" || / /.test(passwordVal)){
            $("#password").parent("div").parent("div").addClass("error");
            $("#password-error-icon").show();
            $("#password-ok-icon").hide();
            $(".password-error").text("密码不能为空,且不能有空格");
        }else{
            $("#password").parent("div").parent("div").removeClass("error");
            $("#password-error-icon").hide();
            $("#password-ok-icon").show();
            $(".password-error").text("");
        }
        if(passwordRepeatVal){
            if(passwordRepeatVal != passwordVal){
                $("#password-repeat").parent("div").parent("div").addClass("error");
                $("#password-repeat-error-icon").show();
                $("#password-repeat-ok-icon").hide();
                $(".password-repeat-error").text("两次密码输入不一致");
            }else{
                $("#password-repeat").parent("div").parent("div").removeClass("error");
                $("#password-repeat-error-icon").hide();
                $("#password-repeat-ok-icon").show();
                $(".password-repeat-error").text("");
            }
        }
    });
    //输入验证码的框失焦时候的
    $("#captcha").change(function(){
        checkCaptcha();
    });
    //检验验证码是否正确
    var checkCaptcha = function(){
        var captchaVal = $("#captcha").val();
        //向后台发请求验证
        $.ajax({
            "url" : "/checkCaptcha",
            "type" : "get",
            'data':{captchaVal:captchaVal},
            'dataType':'html',
            //成功之后的回调
            'success':function(msg){
                if(msg == '0'){
                    $("#captcha-repeat").parent("div").parent("div").addClass("error");
                    $("#captcha-error-icon").show();
                    $("#captcha-ok-icon").hide();
                    $(".captcha-error").text("验证码输入不正确");
                }else if(msg=='1'){
                    $("#captcha").parent("div").parent("div").removeClass("error");
                    $("#captcha-error-icon").hide();
                    $("#captcha-ok-icon").show();
                    $(".captcha-error").text("");
                }
            }
        })
    }
})();