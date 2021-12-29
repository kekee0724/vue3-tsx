let username;
let exchangeUrl;

// 正则：判断手机号码
function isPoneAvailable(tel) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(tel)) {
    return false;
  } else {
    return true;
  }
}

// 判断手机号是否正确
function telResult(telText) {
  var telText = $('.tel').val(),
    result = isPoneAvailable(telText); //判断手机是否正确
  if (result === false) {
    $('.tel').css({ color: '#fe684d', 'border-color': '#fe684d' });
    $('.msg').text('请填写正确的手机号');
    $('.msg').css({
      content: '"请填写正确的手机号"',
      color: '#fe684d',
      'font-size': '.18rem',
      'text-align': 'left',
      display: 'block',
      width: '5.6rem',
      margin: '0 auto',
    });
    return false;
  } else {
    $('.tel').css({ color: '#333', 'border-color': '#dadada' });
    $('.msg').text('验证码已发送');
    authorize(telText);
    return true;
  }
}

function authorize(telText) {
  if (username !== telText) {
    $.ajax({
      url: server.url + server.auth.oauth2Url + '/authorize',
      type: 'GET',
      data: {
        client_id: server.apiKey.apiKey,
        client_secret: server.apiKey.secret,
        response_type: server.apiKey.responseType,
        username: telText,
      },
      success: function (res) {
        username = telText;
      },
    });
  }
}

function exchangeCode(mobile, token) {
  $.ajax({
    url:
      server.url +
      `app/abm-distribute/exchange-code/${mobile}/${client.productName}/${client.versionType}`,
    type: 'GET',
    headers: {
      Authorization: token,
    },
    success: function (exchangeCode) {
      exchangeUrl = server.redeemUrl + `/?code=${exchangeCode}&ctx=apps`;
      console.log('exchangeUrl', exchangeUrl);
      localStorage.setExpire(
        'exchangeUrl',
        exchangeUrl,
        client.expire * 24 * 3600 * 1000
      ); //存入 参数： 1.调用的值 2.所要存入的数据
    },
  });
}

$('.oBtn').click(function () {
  var telText = $('.tel').val();
  let txtCode = $("input[name='txtCode']").val().trim();
  if (telText == '') {
    alert('手机号不能为空');
    return false;
  }
  if (txtCode == '') {
    alert('验证码不能为空');
    return false;
  }
  telResult(telText);
  $.ajax({
    url: server.url + server.auth.oauth2Url + '/access_token',
    type: 'GET',
    data: {
      client_id: server.apiKey.apiKey,
      client_secret: server.apiKey.secret,
      // grant_type: 'client_credentials',
      grant_type: 'authorization_mobile',
      username: telText,
      code: txtCode,
    },
    error: function (data, status, e) {
      $('.codeMsg').text(data.responseJSON.errmsg);
      $('.codeMsg').css({
        content: data.responseJSON.errmsg,
        color: '#fe684d',
        'font-size': '.18rem',
        'text-align': 'left',
        display: 'block',
        width: '5.6rem',
        margin: '0 auto',
      });
    },
    success: function (result) {
      exchangeCode(telText, result.token_str);
      if (result.token_str) {
        //兑换成功
        $('.oOrder').hide();
        $('.oWin').show();
      }
    },
  });
});

// 兑换
$('.footer')
  .find('.ios')
  .on('click', function () {
    const exchangeUrl = localStorage.getExpire('exchangeUrl');
    if (exchangeUrl) {
      window.location = './exchange.html';
      return;
    }
    $('.Login').show();
    $('html,body').scrollTop({ toT: 0 });
  });
$('.Login')
  .find('.oClose')
  .on('click', function () {
    $('.Login').hide();
  });
$('.Login')
  .find('.oKnow')
  .on('click', function () {
    $('.Login').hide();
    const exchangeUrl = localStorage.getExpire('exchangeUrl');
    if (exchangeUrl) {
      window.location = './exchange.html';
      return;
    }
  });

$('body').delegate('.tel', 'blur', function () {
  telResult();
});
