$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从 layui中获取 form 对象
    let form = layui.form
    let layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        let data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        // 2. 发起Ajax的POST请求
        $.post('/api/reguser', data, function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                // 将登录成功得到的 token 字符串，保存到localStorage 中
                localStorage.setItem('token', res.token)
                // console.log(res.token)
                // 跳转后台主页
                location.href = '/index.html'
            }
        })
    })
})