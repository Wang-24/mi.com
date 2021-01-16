import './library/jquery.js';
import { cookie } from './library/cookie.js';




//登录状态
$(function() {
    let isLoad = cookie.get('isLogined');
    let username = cookie.get('username');
    let temp = ``;
    let tempser = ``;
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
        $('.load').html(temp);

        let shop = cookie.get('shop');

        if (shop) {

            shop = JSON.parse(shop); // 有cookie数据才需要转换

            let idList = shop.map(elm => elm.id).join(); // 获得所有id

            $.ajax({
                type: "get",
                url: "../../interface/getItems.php",
                data: {
                    idList
                },
                dataType: "json",
                success: function(res) {

                    let temp = '';
                    res.forEach((elm, i) => {
                        let picture = JSON.parse(elm.picture);
                        let title = JSON.parse(elm.title);
                        // 让ajax获得的数据结果id与cookie中的id  一一对应
                        // 索引不同

                        let arr = shop.filter(val => val.id == elm.id);
                        // 从购物车的cookie数据中去选择当前遍历的数据

                        temp += `<div class="clear item"><div>
                <input class="all" type="checkbox">
            </div>
            <div><img src="${picture[0].src}" alt="">${title[0].tit}</div>
            <p class="price">${parseFloat(elm.price).toFixed(2)}元</p>
            <div class="clear"> 
                <em class="iconfont icon-jian"></em>
                <input class="number" data-idnum="${elm.id}" type="text"  value="${arr[0].num}" max="${elm.num}" min="1" style="text-align:center";>
                <em class="iconfont icon-jia"></em>
            </div>
            <p class="subtotal"><em>${(elm.price*arr[0].num).toFixed(2)}</em>元</p>
            <div>
                <p class="iconfont icon-delete" data-id="${elm.id}"></p>
            </div></div>`;
                    });
                    $('.car-main').append(temp).find('.icon-delete').on('click', function() {
                        let shop2 = shop.filter(el => el.id != $(this).attr('data-id')); // 获得id不匹配的元素
                        cookie.set('shop', JSON.stringify(shop2), 1); // 将不匹配的元素从新写进cookie
                        location.reload();
                    });
                    (function() {
                        let num = parseInt($('.number').val());
                        let idnum;
                        let subtotal;
                        let price;

                        let inpu;
                        $('.number').on('input', function(ev) {
                            inpu = ev.target;
                            num = parseInt($(inpu).val());
                            $(ev.target).val(num);
                            if (num > parseInt(inpu.max)) {
                                num = parseInt(inpu.max);
                                $(inpu).val(num);
                            } else {
                                $(inpu).val(num);
                                subtotal = (parseInt($(inpu).parent().siblings('.price').text()) * num).toFixed(2);
                            }
                            $(inpu).parent().siblings('.subtotal').children('em').text(subtotal);
                        });
                        // +++++
                        $('.icon-jia').on('click', function(ev) {
                            let jia = ev.target;
                            num = parseInt($(jia).siblings('.number').val());
                            if (num < parseInt($(jia).siblings('.number').attr('max'))) {
                                num++;
                                $(jia).siblings('.number').val(num);
                            } else if (num >= parseInt($(jia).siblings('.number').attr('max'))) {
                                num = $(jia).siblings('.number').attr('max');

                                $(jia).siblings('.number').val(num);
                            }
                            subtotal = (parseInt($(jia).parent().siblings('.price').text()) * num).toFixed(2);

                            $(jia).parent().siblings('.subtotal').children('em').text(subtotal);
                            peice();

                        });
                        // -----
                        $('.icon-jian').on('click', function(ev) {
                            let jian = ev.target;
                            num = parseInt($(jian).siblings('.number').val());
                            if (num > 1) {
                                num--;
                                $(jian).siblings('.number').val(num);
                            }
                            subtotal = (parseInt($(jian).parent().siblings('.price').text()) * num).toFixed(2);

                            $(jian).parent().siblings('.subtotal').children('em').text(subtotal);
                            peice();
                        });
                        // 复选框联动
                        $(function() {  
                            let priceAll = 0;
                            let other = $('.all');                 
                            $('.alls').on('click', function() {
                                $('.all').prop('checked', $('.alls').prop('checked'));
                                priceAll = 0
                                if ($('.alls').prop('checked') === true) {
                                    $('.subtotal>em').each((i, elm) => {
                                        priceAll += parseInt($(elm).html());

                                    })
                                    $('.num-p').html(priceAll.toFixed(2))
                                } else {
                                    $('.num-p').html(priceAll.toFixed(2))
                                }
                            })                
                            other.on('click', function() {       
                                let  isAllCheck  =  Array.from(other).every(el =>  $(el).prop('checked'));    
                                isAllCheck ? $('.alls').prop('checked', true) : $('.alls').prop('checked', false)
                                peice();
                            })    
                        });

                        function peice() {
                            let priceA = [];
                            let count = 0; 
                            $('.all').each((i, elm) => { 
                                if ($(elm).prop('checked')) {
                                    priceA.push(parseInt($(elm).parent().siblings('.subtotal').children('em').html()));
                                }
                            });  
                            priceA.forEach(elm => count += elm);
                            $('.num-p').html(count.toFixed(2));
                        }
                    })()


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

                }


            });

        }

    } else {
        temp = `<a href="../html/loading.html">登录</a><span>|</span><a href="../html/login.html">注册</a>`;
        $('.load').html(temp);
        tempser = `
        <div class="clear">
        <div></div>
        <div class="kong">
            <p>你的购物车还是空的！！！</p>
            <div>

                <a href="./loading.html">马上登录</a>
            </div>

        </div>
        </div>`;
        $('.car-main').append(tempser);

    }
    $('.over').on('click', function() {
        cookie.remove('isLogined', '', -1);
        cookie.remove('username', '', -1);
        alert('账户已退出');
        location.href = '../html/mi.html';
    })

})