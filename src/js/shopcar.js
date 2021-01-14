import './library/jquery.js';
import { cookie } from './library/cookie.js';


let shop = cookie.get('shop');
if (shop) {

    shop = JSON.parse(shop); // 有cookie数据才需要转换
    // console.log(shop)
    let idList = shop.map(elm => elm.id).join(); // 获得所有id

    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: {
            idList
        },
        dataType: "json",
        success: function(res) {
            console.log(res)
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
                <input class="number" data-idnum="${elm.id}" type="text" value="${arr[0].num}" max="${elm.num}" min="1" style="text-align:center";>
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
                // console.log(num)
                let inpu;

                $('.number').on('input', function(ev) {
                    inpu = ev.target;
                    num = parseInt($(inpu).attr("value"));
                    $(ev.target).attr("value", num);
                    if (num > parseInt(inpu.max)) {
                        num = parseInt(inpu.max);
                        $(inpu).attr("value", num);
                    } else {
                        $(inpu).attr("value", num);
                        subtotal = (parseInt($(inpu).parent().siblings('.price').text()) * num).toFixed(2);
                    }
                    console.log(num)
                    console.log(subtotal)
                    $(inpu).parent().siblings('.subtotal').children('em').text(subtotal);
                });
                // +++++
                $('.icon-jia').on('click', function(ev) {
                    let jia = ev.target;
                    num = parseInt($(jia).siblings('.number').attr("value"));
                    if (num < parseInt($(jia).siblings('.number').attr('max'))) {
                        num++;
                        $(jia).siblings('.number').attr("value", num);
                    } else {
                        num = $(jia).siblings('.number').max;
                        $(jia).siblings('.number').attr("value", num);
                    }
                    subtotal = (parseInt($(jia).parent().siblings('.price').text()) * num).toFixed(2);

                    $(jia).parent().siblings('.subtotal').children('em').text(subtotal);
                });
                // -----
                $('.icon-jian').on('click', function(ev) {
                    let jian = ev.target;
                    num = parseInt($(jian).siblings('.number').attr("value"));
                    if (num > 1) {
                        num--;
                        $(jian).siblings('.number').attr("value", num);
                    }
                    subtotal = (parseInt($(jian).parent().siblings('.price').text()) * num).toFixed(2);
                    console.log(subtotal)
                    $(jian).parent().siblings('.subtotal').children('em').text(subtotal);
                });

                // 复选框联动
                (function() {  
                    let priceAll = 0;
                    let other = $('.all');                 
                    $('.alls').on('click', function() {

                        $('.all').prop('checked', $('.alls').prop('checked'));
                        priceAll = 0
                        if ($('.alls').prop('checked') === true) {
                            $('.subtotal>em').each((i, elm) => {

                                priceAll += parseInt($(elm).html());
                                console.log(priceAll)
                            })
                            $('.num-p').html(priceAll)
                        } else {
                            $('.num-p').html(priceAll)
                        }
                    })                
                    other.on('click', function() {       
                        let  isAllCheck  =  Array.from(other).every(el =>  $(el).prop('checked'));    
                        let priceA = [];
                        let count = 0;

                         
                        $(other).each((i, elm) => { 

                            if ($(elm).prop('checked')) {

                                priceA.push(parseInt($(elm).parent().siblings('.subtotal').children('em').html()));
                            }

                        });  
                        console.log(priceA)

                        priceA.forEach(elm => count += elm);

                        $('.num-p').html(count);
                        console.log(count)

                        isAllCheck ? $('.alls').prop('checked', true) : $('.alls').prop('checked', false)
                    })

                        
                })();

                //计算总价格
                // (function() {
                //     let priceall;
                //     $('.alls').on('click', function() {
                //         if ($('.alls').prop('checked') === true) {
                //             console.log(2)
                //         }
                //     })
                // })();
            })()
        }
    });

}