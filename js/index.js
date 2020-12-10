$.get("http://jx.xuzhixiang.top/ap/api/allproductlist.php?uid=22869").then(data => {
    let str = ""
    data.data.forEach(data => {
        str += ` <a href="xiangqing.html?id=${data.pid}"><div class="deet-two">
    <img src="${data.pimg}" alt="">
    <p>${data.pname}</p>
    <span>${data.pprice}</span>
    
</div></a>`
    });
    $("#deet-one").html(str);
})