$(function () {
    // 监听游戏规则按钮
    $('.rules').click(function () {
        // 让游戏规则界面显示
        $('.rule').stop().fadeIn(100)
    })
    // 监听游戏规则关闭按钮
    $('.close').click(function () {
        // 让游戏规则界面关闭
        $('.rule').stop().fadeOut(100)
    })
    // 监听游戏开始按钮
    $('.start').click(function () {
        $(this).stop().fadeOut(100)
        progressHandle()
        startWolfAnimation()
    })
    // 监听重新开始按钮
    $('.restart').click(function () {
        // 游戏结束界面消失
        $('.mask').stop().fadeOut(100)
        // 调用进度条动画
        progressHandle()
        // 调用灰太狼小灰灰动画
        startWolfAnimation()
    })
    // 定义一个进度条宽度减少动画
    function progressHandle() {
        // 将进度条重新复制
        $('.progress').css({
            width: 180
        })
        // 创建一个定时器
        var timer = setInterval(function () {
            // 获取进度条
            var $progressWidth = $('.progress').width()
            // 将进度条宽度减少
            $progressWidth -= 1
            // 将进度条更新到页面
            $('.progress').css({
                width: $progressWidth
            })
            // 当进度条走完，出现游戏结束界面
            if ($progressWidth <= 0) {
                // 关闭定时器
                clearInterval(timer)
                // 出现游戏结束界面
                $('.mask').stop().fadeIn(100)
                // 调用结束动画方法
                stopWolfAnimation()
            }
        }, 100)
    }
    // 定义一个灰太狼小灰灰动画定时器变量
    var wolfTimer
    // 定义一个灰太狼小灰灰动画的方法
    function startWolfAnimation() {
        // 1.定义两个数组来保存灰太狼小灰灰的图片
        var wolf_1 = [
            '灰太狼_images/h0.png',
            '灰太狼_images/h1.png',
            '灰太狼_images/h2.png',
            '灰太狼_images/h3.png',
            '灰太狼_images/h4.png',
            '灰太狼_images/h5.png',
            '灰太狼_images/h6.png',
            '灰太狼_images/h7.png',
            '灰太狼_images/h8.png',
            '灰太狼_images/h9.png'
        ]
        var wolf_2 = [
            '灰太狼_images/x0.png',
            '灰太狼_images/x1.png',
            '灰太狼_images/x2.png',
            '灰太狼_images/x3.png',
            '灰太狼_images/x4.png',
            '灰太狼_images/x5.png',
            '灰太狼_images/x6.png',
            '灰太狼_images/x7.png',
            '灰太狼_images/x8.png',
            '灰太狼_images/x9.png'
        ]
        // 2.定义一个用来保存所有可能出现的位置的数组
        var arrPos = [{
                left: '100px',
                top: '115px'
            },
            {
                left: '20px',
                top: '160px'
            },
            {
                left: '190px',
                top: '142px'
            },
            {
                left: '105px',
                top: '193px'
            },
            {
                left: '19px',
                top: '221px'
            },
            {
                left: '120px',
                top: '275px'
            },
            {
                left: '30px',
                top: '295px'
            },
            {
                left: '209px',
                top: '297px'
            }
        ]

        // 3.创建一个图片
        var $wolfImage = $("<img src='' class = 'wolfImage'>")
        // 随机获取图片的位置
        /*
            round:向上取整，也就是四舍五入
            获取0-8的随机整数
        */
        var posIndex = Math.round(Math.random() * 8)
        // 4.设置显示图片位置
        $wolfImage.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        })
        // 随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2
        // 5.设置图片内容
        window.wolfIndex = 0
        window.wolfIndexEnd = 5
        wolfTimer = setInterval(function () {
            if (wolfIndex > wolfIndexEnd) {
                $wolfImage.remove()
                clearInterval(wolfTimer)
                startWolfAnimation()
            }
            $wolfImage.attr("src", wolfType[wolfIndex])
            wolfIndex++
        }, 150)

        // 6将图片添加到界面
        $('.container').append($wolfImage)

        // 调用处理游戏规则方法
        gameRules($wolfImage)
    }

    function gameRules($wolfImage) {
        $wolfImage.one('click', function () {
            // 修改索引，出现平底锅的动画
            wolfIndex = 5
            wolfIndexEnd = 9
            // 拿到当前点击的图片
            var $src = $(this).attr('src')
            // 根据图片地址判断是否是灰太狼
            // indexof:返回1就是有，返回-1就是没有该字符串
            var flag = $src.indexOf('h') >= 0
            // 根据点击的图片增减分数
            if (flag) {
                // +10
                $('.score').text(parseInt($('.score').text()) + 10)
            } else {
                // -10
                $('.score').text(parseInt($('.score').text()) - 10)
            }
        })
    }
    // 定义一个结束灰太狼小灰灰动画的方法
    function stopWolfAnimation() {
        // 将图片删除
        $('.wolfImage').remove()
        // 将定时器动画关闭
        clearInterval(wolfTimer)
    }


})