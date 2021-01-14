import './library/jquery.js';
import { cookie } from './library/cookie.js';

let id = location.search.split('=')[1];

// console.log(1);
$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    async: false,
    dataType: "json",
    success: function(res) {

        // console.log(res);
        let picture = JSON.parse(res.picture);
        let title = JSON.parse(res.title);
        let temp = `
        <div class="main-l">
        <div>
            <img src="${picture[1].src}" alt="">
         
        </div>
    </div>
    <div class="main-r">
        <div>
            <h2>${title[0].tit}</h2>
            <p>${res.details}</p>
            <p style="color: #ff6709;">小米自营</p>
            <p class="price">${res.price} 元</p>
            <div class="line"></div>
        </div>
        <div class="address">
            <p>北京 北京市 海淀区 清河街道</p>
            <p  style="color: #ff6709;font-size: 18px; ">库存：${res.num}</p>
        </div>
        <div class="joincar">
        <div class="clear">
        <em class="iconfont icon-jian"></em>
        <input id="num" class="num" type="text" value="1" style="text-align:center";>
        <em class="iconfont icon-jia"></em>
        </div>
        <a href="">
        <form>
            <input id="addItem"  value="加入购物车"  type="button">
        </form>
        </a>
    </div>
    <div>
        <div class="option">
            <div class="option-tit">选择版本</div>
            <div class="option-box">
                <ul class="clear">
                    <li class="active">8GB+128GB</li>
                    <li>8GB+256GB</li>
                    <li>12GB+256GB</li>
                </ul>
            </div>
            <div class="option-tit">选择颜色</div>
            <div class="option-box">
                <ul class="clear">
                    <li class="active">黑色</li>
                    <li>蓝色</li>
                    <li>白色</li>
                    <li>紫色</li>
                </ul>
            </div>
            <div class="option-tit">选择套装</div>
            <div class="option-box">
                <ul class="clear">
                    <li class="active">标准版</li>
                    <li>套装（赠充电器）</li>
                </ul>
            </div>
            <div class="option-tit">选择小米提供的尊享服务
                <a style="color: #ff6709;" href="">了解尊享服务 ></a>
            </div>
            <div class="service">
                <div class="ser-left">
                    <input type="checkbox">
                    <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1608263434.1526595.png" alt="">
                </div>
                <div class="ser-right">
                    <h3>MiCare保障服务<em>679元</em></h3>
                    <p>2年2次碎屏 1年延保维修 1年保值换新</p>
                    <div>
                        <input type="checkbox">我已阅读
                        <a href="">服务条款 |</a><a href="">常见问题</a>
                        <p>679元</p>
                    </div>
                </div>

            </div>
            <div class="option-tit">选择小米提供的意外保护
                <a style="color: #ff6709;" href="">了解意外保护 ></a>
            </div>
            <div class="service">
                <div class="ser-left">
                    <input type="checkbox">
                    <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1608263434.1526595.png" alt="">
                </div>
                <div class="ser-right" style="border-bottom: 0;">
                    <h3>意外保障服务<em>349元</em></h3>
                    <p>手机意外碎屏/进水/碾压等损坏</p>
                    <div>
                        <input type="checkbox">我已阅读
                        <a href="">服务条款 |</a><a href="">常见问题</a>
                        <p>349元</p>
                    </div>
                </div>

            </div>
            <div class="service">
                <div class="ser-left">
                    <input type="checkbox">
                    <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1608263434.1526595.png" alt="">
                </div>
                <div class="ser-right">
                    <h3>碎屏保障服务<em>249元</em></h3>
                    <p>手机意外碎屏</p>
                    <div>
                        <input type="checkbox">我已阅读
                        <a href="">服务条款 |</a><a href="">常见问题</a>
                        <p>349元</p>
                    </div>
                </div>

            </div>
            <div class="option-tit">选择小米提供的延长保修
                <a style="color: #ff6709;" href="">了解延长保修 ></a>
            </div>
            <div class="service">
                <div class="ser-left">
                    <input type="checkbox">
                    <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1608263434.1526595.png" alt="">
                </div>
                <div class="ser-right">
                    <h3>延长保修服务<em>159元</em></h3>
                    <p>厂保延一年，性能故障免费维修</p>
                    <div>
                        <input type="checkbox">我已阅读
                        <a href="">服务条款 |</a><a href="">常见问题</a>
                        <p>159元</p>
                    </div>
                </div>

            </div>
            <div class="option-tit">选择小米提供的云空间服务
                <a style="color: #ff6709;" href="">了解云空间服务 ></a>
            </div>
            <div class="services">
                <div class="servi">
                    <div class="ser-left">
                        <input type="checkbox">
                        <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1600176481.06844959.png" alt="">
                    </div>
                    <div class="ser-right">
                        <h3>云空间年卡200G<em>159元</em></h3>
                        <p>主商品签收后，自动激活至下单帐号</p>
                        <div>
                            <input type="checkbox">我已阅读
                            <a href="">服务条款 |</a><a href="">常见问题</a>
                            <p>159元</p>
                        </div>
                    </div>
                </div>
                <div class="servi">
                    <div class="ser-left">
                        <input type="checkbox">
                        <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1600176481.06844959.png" alt="">
                    </div>
                    <div class="ser-right">
                        <h3>云空间年卡50G<em>49元</em></h3>
                        <p>主商品签收后，自动激活至下单帐号</p>
                        <div>
                            <input type="checkbox">我已阅读
                            <a href="">服务条款 |</a><a href="">常见问题</a>
                            <p>49元</p>
                        </div>
                    </div>
                </div>
                <div class="servi">
                    <div class="ser-left">
                        <input type="checkbox">
                        <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1600176481.06844959.png" alt="">
                    </div>
                    <div class="ser-right">
                        <h3>云空间月卡200G<em>已省18元</em></h3>
                        <p>主商品签收后，自动激活至下单帐号</p>
                        <div>
                            <input type="checkbox">我已阅读
                            <a href="">服务条款 |</a><a href="">常见问题</a>
                            <p>1元</p>
                        </div>
                    </div>
                </div>
                <div class="servi">
                    <div class="ser-left">
                        <input type="checkbox">
                        <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1600176481.06844959.png" alt="">
                    </div>
                    <div class="ser-right">
                        <h3>云空间月卡50G<em>6元</em></h3>
                        <p>主商品签收后，自动激活至下单帐号</p>
                        <div>
                            <input type="checkbox">我已阅读
                            <a href="">服务条款 |</a><a href="">常见问题</a>
                            <p>6元</p>
                        </div>
                    </div>
                </div>

            </div>
        `;
        $('.main>.container').append(temp).find('#addItem').on('click', function() {
            addItem(res.id, res.price, $('#num').val());
        });
        let num = parseInt($('.num').val());
        $('.num').on('input', function() {
            // console.log(num)
            // console.log(parseInt(res.num))
            num = parseInt($('.num').val());
            if (num > parseInt(res.num)) {
                num = parseInt(res.num);
                $('.num').val(num);
            }
        });
        $('.icon-jia').on('click', function() {
            num = parseInt($('.num').val());
            if (num < res.num) {
                num++;
                console.log(num)
            }
            $('.num').val(num);
        });
        $('.icon-jian').on('click', function() {
            num = parseInt($('.num').val());
            if (num > 0) {
                num--;
                $('.num').val(num)
            }
        });
    }
});

function addItem(id, price, num) {
    let shop = cookie.get('shop'); // 获得cookie数据
    let product = {
        id,
        price,
        num
    };
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


$(function() {

    let headli = $('.head-navli');
    const headchild = $('.headchild');
    const headWidth = $(document).width();
    headli.on('mouseenter', function(ev) {
        headchild.attr('style', ` width:${headWidth}px`);
        let index = headli.index(ev.target);
        // headchild.each(function(i) {


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

$('.service').each(function() {
    let ele = $(this);
    // console.log(ele.find('input'));
    ele.find('input').on('click', function() {
        if (ele.find('input').prop("checked")) {
            ele.find('input').prop("checked", true);
        } else {
            ele.find('input').prop("checked", false);
        }
    })
})
$('.servi').each(function() {
    let ele = $(this);
    // console.log(ele.find('input'));
    ele.find('input').on('click', function() {
        if (ele.find('input').prop("checked")) {
            ele.find('input').prop("checked", true);
        } else {
            ele.find('input').prop("checked", false);
        }
    })
})