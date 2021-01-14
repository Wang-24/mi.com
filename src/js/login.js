import './library/jquery.js';
// import { cookie } from './library/cookie.js';
//注册格式判断
$(function() {
    let submit = $('.button');
    let $usernameflag = true;
    let $pwdflag = true;
    let $repassflag = true;
    let $emailflag = true;
    let $telflag = true;
    // console.log(input)
    // const name = [/^[a-zA-Z][a-zA-Z0-9_-]{5,15}$/,
    //     /^.{6,16}$/,
    //     /^.{6,16}$/,
    //     /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // ];
    let count = false;

    // console.log(1)
    //验证用户名
    $('.username').on('focus', function() {
        $('.user').html('用户名不为空').css('color', 'red');
    });
    $('.username').on('input', function() {
        checkuser();
    });

    function checkuser() {
        let nameValue = $('.username').val();
        if (nameValue !== '') { //用户名不为空的情况下
            let len = nameValue.length;
            // console.log(len);
            if (len > 4) {
                $('.user').html('√').css('color', 'green');
                $usernameflag = true;

            } else {
                $('user').html('用户名不能为空').css('color', 'red');
                $usernameflag = false;
            }

        }
    }

    //验证密码
    $('.password').on('input', function() {
        if ($('.password').val() !== '') {
            let reg = /^.{6,16}$/;
            console.log($('.password').val())
            if (reg.test($('.password').val())) {
                $('.pwd').html('√').css('color', 'green');
                $pwdflag = true;
            }
        } else {
            $('.pwd').html('密码不能为空').css('color', 'red');
            $pwdflag = false;
        }
    });
    //验证确认密码
    $('.again').on('input', function() {
        checkrepwd();
    });

    function checkrepwd() {

        let val = $('.again').val();
        if (val === '') {
            $('.repwd').html('确认密码不能为空').css('color', 'red');
            $repassflag = false;
        } else {
            $('.repwd').html('√').css('color', 'green');
            $repassflag = true;
        }

        if (val !== $('.password').val()) {
            $('.repwd').html('两次密码不一致').css('color', 'red');
            $repassflag = false;
        }
    }

    //验证电话
    $('.phone').on('input', function() {
        let val = $('.phone').val();
        if (val !== '') {
            let regTel = /^1\d{10}$/;
            if (regTel.test(val)) {
                $('.teltip').html('√').css('color', 'green');
                $telflag = true;
            } else {
                $('.teltip').html('手机号码输入不正确').css('color', 'red');
                $telflag = false;
            }
        } else {
            $('.teltip').html('手机号码不为空').css('color', 'red');
            $telflag = false;
        }
    });

    $('.phone').on('blur', function() {
        let val = $('.phone').val();
        if (val == '') {
            $('.teltip').html('手机号码不为空').css('color', 'red');
            $telflag = false;
        }
    });

    //验证邮箱
    $('.email').on('input', function() {
        let emailValue = $('.email').val();
        if (emailValue !== '') {
            let regEmail = /^\w{5,}\@[a-zA-Z0-9]{2,}\.(com|net|org)(\.cn)?$/;
            if (regEmail.test(emailValue)) {
                $('.emailtip').html('√').css('color', 'green');
                $emailflag = true;
            } else {
                $('.emailtip').html('邮箱输入不正确').css('color', 'red');
                $emailflag = false;
            }
        } else {
            $('.emailtip').html('邮箱不能为空').css('color', 'red');
            $emailflag = false;
        }
    });


    //阻止提交
    submit.on('submit', function() {
        if ($('.username').val() === '') {
            $('.user').html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        }
        if ($('.password').val() === '') {
            $('.pwd').html('密码不能为空').css('color', 'red');
            $pwdflag = false;
        }
        if ($('.again').val() === '') {
            $('.repwd').html('确认密码不能为空').css('color', 'red');
            $repassflag = false;
        }
        if ($('.phone').val() === '') {
            $('.emailtip').html('邮箱不能为空').css('color', 'red');
            $emailflag = false;
        }
        if ($('.email').val() === '') {
            $('.teltip').html('手机号码不能为空').css('color', 'red');
            $telflag = false;
        }

        if (!$usernameflag || !$pwdflag || !$repassflag || !$emailflag || !$telflag) {
            return false;
        }
    });
})

//传给数据库
// $.ajax({
//     type: "get",
//     url: "../../interface/login.php",
//     data: {
//         username: $('.username'),
//         password: $('.password')
//     },
//     dataType: "json",
//     success: function(response) {
//         console.log(response)
//     }
// });