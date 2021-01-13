import './library/jquery.js';
import './library/jquery.lazyload.js';
import { cookie } from './library/cookie.js';
//首页数据渲染
let id = location.search.split('=')[1];
//发送请求
$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        let temp = '';

        res.forEach((elm, i) => {
            console.log(elm)
            let picture = JSON.parse(elm.picture);
            // console.log(picture);
            let title = JSON.parse(elm.title);
            console.log(1);
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
        console.log($('.phone-right>ul'));

    }
});


//封装方法
function addItem(id, price, num) {
    let shop = cookie.get('shop'); // 获得cookie数据
    let product = {
        id,
        price,
        num
    };
    console.log(1)
    if (shop) { // 判断购物车是否有添加过数据
        shop = JSON.parse(shop); //将JSON字符串转回数组

        // 判断购物车中是否存在该商品
        if (shop.some(elm => elm.id == id)) {
            // 修改数量
            shop.forEach(el => {
                el.id == id ? el.num = num : null;
            });
        } else {
            shop.push(product);
        }

    } else {
        shop = []; // 初始没有数据 初始化一个空数组
        shop.push(product); // 将第一个商品添加进数组
    }


    cookie.set('shop', JSON.stringify(shop), 1);

}


//图片懒加载

$("img.lazy").lazyload({
    effect: "fadeIn"
});


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
                        elms.index = 4;
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
                (function() {
                    let dian = $('.slideshow-down>a');
                    dian.eq(elms.index - 1).addClass('active').siblings().removeClass('active');

                })()
            }.bind(this);

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