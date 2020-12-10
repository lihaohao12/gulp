var id = location.search.split("=")[1];
console.log(id);
var str = "";

$.get(`http://jx.xuzhixiang.top/ap/api/detail.php?id=${id}`).then(data => {

    // console.log(data.data.pimg)
    str += `

    <div id="foyt">   
    <!-- 第一部分左边 -->
    <div class="foyt-one">
        <div id="zoomBox">
            <div id="midArea">
                <img src="${data.data.pimg}" />
                <div id="zoom"></div>
            </div>
            <div id="bigArea">
                <img src="${data.data.pimg}" />
            </div>
        </div>
        <!-- <div class="foyt-one-one">
            <img src="${data.data.pimg}" alt="" />
        </div> -->

        <div class="foyt-one-two">
            <img src="${data.data.pimg}" alt="" />
            <img src="${data.data.pimg}" alt="" />
            <img src="${data.data.pimg}" alt="" />
            <img src="${data.data.pimg}" alt="" />
            <img src="${data.data.pimg}" alt="" />
        </div>
    </div>
    <!-- 第二部分右边 -->
    <div class="foyt-two">
        <!-- 右边第一个div -->
        <div class="foyt-two-one">
            <div class="foyt-two-a">
                <span> ${data.data.pname}
               
        </span>
            </div>
            <div class="foyt-two-b">
                <span>【新品，全金属窄边框】学生网课办公娱乐，全新11代酷睿，MX450独显，全金属100%sRGB高色域，指纹背光,快充(更多尖货)查看></span
        >
      </div>
    </div>
    <!-- 右边第二个div-->
    <div class="foyt-two-two">
      <div class="foyt-two-two-c">
        <span>京 东 价</span>
                <span>${data.data.pprice}</span>
                <span>预售说明</span>
                <span>累计评价15.1万+</span>
            </div>
            <div class="foyt-two-two-d">
                <span>优 惠 券</span>
                <span>满300享9折</span>
                <span>满299减20</span>
                <span>满159减15</span>
                <span>更多>></span>
            </div>
            <div class="foyt-two-two-e">
                <span>促 销</span>
                <span>满额返券</span>

                <span>购母购母婴、玩具、清洁、个护、厨具、生鲜、食品、宠物、酒水、家电、电脑数码部分自营商品满1元返券包</span
        >
      </div>
    </div>
    <!-- 右边第三个div-->
    <div class="foyt-two-three">
      <div class="foyt-two-three-a">
        <span>配 送 至</span>
                <input type="text" placeholder="河南郑州市高新区枫杨街道" id="" />
                <span>有货</span>
                <span>支持</span>
                <ul>
                    <li>运费险</li>
                    <li>闪电退款</li>
                    <li>极速审核</li>
                    <li>货到付款</li>
                </ul>
            </div>
            <div class="foyt-two-three-b">
                <span>发货时间</span><span>预计最晚三天内送达 </span>
            </div>
            <div class="foyt-two-three-c">
                <span>由<strong>京东</strong>发货, 并提供售后服务. </span>
            </div>
        </div>
        <!-- 右边第四个div-->
        <div class="foyt-three">
            <div class="foyt-four">
                <span>选择操作</span>
            </div>
            <div class="foyt-five">
               
                <div class="foyt-seven">
                    <span class="minus">-</span>
                    <input type="text" value="1" name="" id="txt" />
                    <span class="plus">+</span>
                    <a href="./gouwuche.html"><input type="button" value="加入购物车" id="btn" data-id="${id}"/></a>
                </div>
            </div>
        </div>
    </div>
</div>



        `
    $("#foyt-wrap").html(str)




    let num = Number($("#txt").val());
    console.log(num);
    $(".minus").click(function() {
        if (num <= 1) {
            return
        }
        num--
        $("#txt").val(num)

    })
    $(".plus").click(function() {
        num++;
        console.log(num)
        $("#txt").val(num)
    })


    $("#btn").click(function() {
        let uid = JSON.parse(localStorage.getItem("uid"))
        console.log(uid);
        console.log(id);
        $.get("http://jx.xuzhixiang.top/ap/api/add-product.php", {
            uid: uid,
            pid: id,
            pnum: num

        }).then(res => {
            console.log(res);
            location.href = "gouwuche.html"
        })

    })
    foo()
});

function foo() {
    function $(id) {
        return document.getElementById(id);
    }

    function Zoom() {
        this.zoomBox = $("zoomBox");
        this.midArea = $("midArea");
        this.midImg = this.midArea.children[0];
        this.zoom = $("zoom");
        this.bigArea = $("bigArea");
        this.bigImg = this.bigArea.children[0];
    }
    Zoom.prototype.start = function() {
        this.midArea.onmouseover = () => {
            this.zoom.style.display = "block";
            this.bigArea.style.display = "block";
        };
        this.midArea.onmouseout = () => {
            this.zoom.style.display = "none";
            this.bigArea.style.display = "none";
        };
        this.midArea.onmousemove = (e) => {
            let evt = e || event;
            let x = evt.pageX - this.zoomBox.offsetLeft;
            let y = evt.pageY - this.zoomBox.offsetTop;

            let l = x - this.zoom.offsetWidth / 2;
            let t = y - this.zoom.offsetHeight / 2;

            let mw = this.zoomBox.offsetWidth - this.zoom.offsetWidth;
            let mh = this.zoomBox.offsetHeight - this.zoom.offsetHeight;

            l = l <= 0 ? 0 : l >= mw ? mw : l;
            t = t <= 0 ? 0 : t >= mh ? mh : t;

            this.zoom.style.left = l + "px";
            this.zoom.style.top = t + "px";

            this.bigImg.style.left =
                (-this.zoom.offsetLeft * this.bigImg.offsetWidth) /
                this.midImg.offsetWidth +
                "px";
            this.bigImg.style.top =
                (-this.zoom.offsetTop * this.bigImg.offsetHeight) /
                this.midImg.offsetHeight +
                "px";
        };
    };

    let zoom = new Zoom();
    zoom.start();
}