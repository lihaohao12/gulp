$(function() {

    let uid = JSON.parse(localStorage.getItem('uid'))
    console.log(uid);
    $.ajax({
        url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
        type: "get",
        data: {
            id: uid
        }
    }).then(res => {
        console.log(res.data);
        let arr = res.data
        let str = ""
        arr.forEach(item => {
            // console.log(item);


            str += `
            <li>
            <input type="checkbox" class="ck">
            <img src="${item.pimg}">
            <span>${item.pname}</span>
            <span class="price">${item.pprice}</span>
            <span data-id="${item.pid}" class="minus">减少</span>
            <input type="text" value="${item.pnum}" class="num">
            <span data-id="${item.pid}" class="plus">增加</span>
            <span class="numprice">${item.pnum*item.pprice}</span>
            <span data-id="${item.pid}" class="detele">删除</span>
        </li>
        `
        });
        $("#carts").html(str)


        $(".minus").each(ietm => {
            let num = parseInt($(".num").eq(ietm).val())
            console.log(Number($(".num").val()));
            console.log(Number($(".price").html()));

            console.log(ietm);
            $(".minus").eq(ietm).click(function() {
                console.log(($(".price").html()));
                if (num <= 1) {
                    return
                }
                console.log(this);
                console.log($(this).attr("data-id"));
                let pid = $(this).attr("data-id")
                console.log(pid);

                num--

                console.log(num);
                $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                    uid: uid,
                    pid: pid,
                    pnum: num
                }).then(res => {
                    console.log(res);
                    $(".num").eq(ietm).val(num)
                    $(".numprice").eq(ietm).text(Number($(".num").eq(ietm).val()) * parseInt(Number($(".price").eq(ietm).html())))
                    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
                        id: uid
                    }).then(data => {
                        console.log(data);
                    })
                })
            })

            $(".plus").eq(ietm).click(function() {

                console.log(this);
                console.log($(this).attr("data-id"));
                let pid = $(this).attr("data-id")
                console.log(pid);

                num++
                console.log(num);
                $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                    uid: uid,
                    pid: pid,
                    pnum: num
                }).then(res => {
                    console.log(res);
                    $(".num").eq(ietm).val(num)
                    $(".numprice").eq(ietm).text(Number($(".num").eq(ietm).val()) * parseInt(Number($(".price").eq(ietm).html())))



                    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
                        id: uid
                    }).then(data => {
                        console.log(data);
                    })
                })
            })


            $(".detele").eq(ietm).click(function() {
                let pid = $(this).attr("data-id")

                $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php", {

                    uid: uid,
                    pid: pid,

                }).then(res => {
                    console.log(res);
                    $(this).parent().remove()
                })
            })
        })

        clickchoose();
    });



    // function foo() {
    //     $(".ck").click(function() {

    //         let s = $(this).length;
    //         let t = $(".ck:checked").length;
    //         if (s == t) {
    //             $("#checkAll").prop('checked', true);

    //         } else {
    //             $("#checkAll").prop('checked', false);

    //         }
    //     })
    //     $("#checkAll").click(function() {
    //         console.log($("#checkAll")[0].checked == true)
    //         if ($("#checkAll")[0].checked == true) {
    //             $(".ck").prop("checked", true);
    //         } else {
    //             $(".ck").prop("checked", false);
    //         }

    //     })


    // }

    // foo()

    //选择框判断

    function clickchoose() {
        var totoalchoose = document.querySelector("#checkAll");
        var achoose = document.querySelectorAll(".ck"); //单选框
        //点击全选的时候将所有单选框勾选上
        totoalchoose.onclick = function() {
            for (let j = 0; j < achoose.length; j++) {
                if (totoalchoose.checked) {
                    achoose[j].checked = true;
                } else {
                    achoose[j].checked = false;
                }
            }

        };

        //调用的时候遍历一遍单选按钮
        for (let i = 0; i < achoose.length; i++) {
            let flag = true;
            if (!achoose[i].checked) {
                flag = false;
                break;
            }
            totoalchoose.checked = flag;
        }

        //判断勾选的单选框的选择情况，有一个没选择全选按钮就不勾选
        for (let j = 0; j < achoose.length; j++) {
            achoose[j].onclick = function() {
                let flag = true;
                for (let i = 0; i < achoose.length; i++) {
                    if (!achoose[i].checked) {
                        flag = false;
                        break;
                    }
                }
                totoalchoose.checked = flag;

            };
        }
    }


})






// $(".ck").each(data => {
//     console.log(data);
//     $("input[type='checkbox']").attr("checked", true);
//     $(this).prop("checked")

//     $(this).click(function() {
//         console.log("a");
//         console.log($(this).prop("checked"));
//         if ($(".ck").prop("checked")) {
//             $("#checkAll").attr("checked", true);
//         } else {
//             $("#checkAll").attr("checked", false);
//         }
//     })
// })