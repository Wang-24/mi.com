import './library/jquery.js';
import { cookie } from './library/cookie.js';

let id = location.search.split('=')[1];



$.ajax({
    type: "get",
    url: "../../interface/getItems.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        let picture = JSON.parse(elm.picture);
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
    console.log(ele.find('input'));
    ele.find('input').on('click', function() {
        if (ele.find('input').prop("checked")) {
            ele.find('input').prop("checked", true);
        } else {
            ele.find('input').prop("checked", false);
        }
    })
})