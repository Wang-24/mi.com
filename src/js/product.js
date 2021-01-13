import './library/jquery.js';
import { cookie } from './library/cookie.js';

let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        let picture = JSON.parse(res.picture);

        let temp = `
        <h1>${res.title}</h1>
        <div class="p-picture">
            <img src="../${picture[1].src}">
        </div>
        <div class="p-price">
            <span class="yuan">￥</span>${res.price}
        </div>
        <div class="p-num">
            库存:${res.num}
        </div>
        <input type="number" value="1" min="1" max="${res.num}" id="num">
        <input type="button" value="加入购物车" id="addItem">
        <div>${res.details}</div>
        `;

        $('body').append(temp).find('#addItem').on('click', function() {
            addItem(res.id, res.price, $('#num').val());
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