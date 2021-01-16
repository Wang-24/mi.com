import './library/jquery.js';
import './library/jquery.lazyload.js';
import { cookie } from './library/cookie.js';
//首页数据渲染

//发送请求
$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        let temp = '';

        res.forEach((elm, i) => {
            // console.log(elm)
            let picture = JSON.parse(elm.picture);
            // console.log(picture);
            let title = JSON.parse(elm.title);
            // console.log(1);
            temp += `<li>
                     <a href="./shop.html?id=${elm.id}">
                     <div>
                     <img src="${picture[0].src}" alt="">
                     </div>
                     <h3>${title[0].tit}</h3>
                     <p class="spe">${title[1].tit}</p>
                     <p class="price">
                     ${elm.price}元起</p>
                     </a>
                     </li>`;

        });
        $('.phone-right>ul').append(temp);
        // console.log($('.phone-right>ul'));
        $("img.lazy").lazyload({
            effect: "fadeIn"
        });

    }
});
//图片懒加载
// $("img.lazy").lazyload({
//     effect: "fadeIn"
// });

//登录状态
$(function() {
    let isLoad = cookie.get('isLogined');
    let username = cookie.get('username');
    console.log(username)
    let temp = ``;
    if (isLoad) {
        temp = `<a class="isload" href="javascript:;">${username}
        <div>
        <p>个人中心</p>
        <p>评价晒单</p>
        <p>我的喜欢</p>
        <p>小米账户</p>
        <p class="over">注销</p>
        </div></a>
        <span>|</span>
        <a href="">消息通知</a>
        <span>|</span>
        <a href="">我的订单</a>
        
        `;
        $('.load').html(temp)
    } else {
        temp = `<a href="../html/loading.html">登录</a><span>|</span><a href="../html/login.html">注册</a><span>|</span><a href="">消息通知</a>`;
        $('.load').html(temp)
    }
    $('.over').on('click', function() {
        cookie.remove('isLogined', '', -1);
        cookie.remove('username', '', -1);
        alert('账户已退出')
        location.reload();
    })

})

//倒计时
$(function() {
    setInterval(function() {
        let now = new Date();
        let futuer = new Date(2022, 0, 1, 0, 0, 0)
        let d = new Date(futuer - now);
        let h = d.getHours() - 8;
        let m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        let s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        $('.h').html(h)
        $('.m').html(m)
        $('.s').html(s)
    }, 1000)
})

//返回顶部
$(function() {
    $(window).scroll(function() {

        getScrollTop() > getClientHeight() ? $('.app-down').css('display', 'block') : $('.app-down').css('display', 'none');
    })

    //获取滚动条高度
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    //获取窗口高度
    function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }


})

//主页下滑栏
$(function() {
    let headli = $('.head-navli');
    const headchild = $('.headchild');
    const headWidth = $(document).width();
    headli.on('mouseenter', function(ev) {
        headchild.attr('style', ` width:${headWidth}px`);
        let index = headli.index(ev.target);
        // headchild.each(function(i) {
        //     // console.log(headli);

        //     headchild.eq(i).removeClass('active');
        // });
        headchild.stop().eq(index).addClass('active').siblings('.headchild').removeClass('active');

        // console.log(headli, ev.target)
        // console.log(index, headchild)
        headli.on('mousemove', function() {
                headli.stop();
            })
            // headli.on('mouseleave', function() {
            //     headchild.eq(index).removeClass('active');
            // })
    });
});


//轮播图
(function($) {
    $.fn.extend({
        slider: function(options) {
            let defaults = {
                speed: 500, // 动画执行时间
                delay: 3000 // 图片停留时间
            };

            // 合并参数
            $.extend(defaults, options);

            // 定义变量
            let main = null, // 主函数
                init = null, // 初始化
                start = null, // 开始动画
                stop = null, // 停止动画
                next = null, // 下一张
                prev = null, // 上一张
                timer = null, // 计时器
                // a = null, //灰点
                elms = {}; // 命名空间

            let dian = $('.slideshow-down>a');

            init = function() {
                // 获取元素
                elms.sliderElm = this.children('div').children('.clear');
                elms.btnsPrev = this.children('div').children('.slideshow-prev');
                elms.btnsNext = this.children('div').children('.slideshow-next');

                // 复制第一张图片
                elms.sliderElm.append(elms.sliderElm.find('img').first().clone());
                // 获得元素宽度
                elms.imgWidth = elms.sliderElm.find('img').first().width();

                // 设置轮播索引值
                elms.index = 1;

                // 悬停事件
                this.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                });

                // 按钮事件
                elms.btnsPrev.on('click', function() {
                    prev();
                });
                elms.btnsNext.on('click', function() {
                    next();
                });

            }.bind(this);

            start = function(direction) {
                let left = `-=${elms.imgWidth}`;

                if (!direction) {
                    left = `+=${elms.imgWidth}`; // 改变方向

                    if (elms.index === 1) {
                        elms.index = 5;
                        let divLeft = elms.sliderElm.offset().left,
                            imgLeft = elms.sliderElm.find('img').last().offset().left;
                        elms.sliderElm.css('left', `-${imgLeft-divLeft}px`);
                    }
                }

                elms.sliderElm.animate({
                    left: left
                }, defaults.speed, function() {
                    if (direction) {
                        elms.index++;
                    } else {
                        elms.index--;
                    }

                    if (elms.index === 5) {
                        elms.index = 1;
                        elms.sliderElm.css('left', 0);
                    }
                });
                // console.log(1);
                (function() {
                    let i = elms.index - 1;
                    dian.eq(i).addClass('active').siblings().removeClass('active');
                })();
            }.bind(this);
            dian.on('click', function(ev) {
                elms.index = dian.index(ev.target);
                console.log(elms.index)
                dian.eq(elms.index).addClass('active').siblings().removeClass('active');
                let left = `-=${elms.imgWidth}`;
                // (function() {
                //     console.log(1);


                //     if (elms.index === 1) {
                //         elms.index = 5;
                //         let divLeft = elms.sliderElm.offset().left,
                //             imgLeft = elms.sliderElm.find('img').last().offset().left;
                //         elms.sliderElm.css('left', `-${imgLeft-divLeft}px`);
                //     }

                // })();

            })

            stop = function() {
                clearInterval(timer);
                elms.sliderElm.stop(true, true);
            }
            prev = function() {
                stop();
                start(0);
            }
            next = function() {
                stop();
                start(1);
            }
            main = function() {
                init();
                timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
            }



            main();
        }
    });
})(jQuery);

$('.slider').slider({
    delay: 2000,
    speed: 500
});

//tab切换
$(function() {
        const li = $('.tit-li');
        const div = $('.styl-right');


        li.on('mouseover', function(ev) {
            let ele = li.index(ev.target);


            console.log(ele)
            li.eq(ele).siblings('.tit-li').removeClass('show');
            div.eq(ele).siblings('.styl-right').removeClass('show');

            li.eq(ele).addClass('show').siblings('.tit-li').removeClass('show');
            div.eq(ele).addClass('show').siblings('.styl-right').removeClass('show');


        });
    })
    //侧边条hover效果
$(function() {
    let div = $('.app');


    div.on('mouseenter', function() {
        console.log($(this).children('.show'));
        $('.show').removeClass('.show').siblings('img').addClass('.show')

    })

})