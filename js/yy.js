// require("./reco.config");
let username;
// 兑换
$('.dowm_')
  .find('.noload')
  .on('click', function () {
    $('.orderList').show();
    $('html,body').scrollTop({ toT: 0 });
  });
$('.orderList')
  .find('.oClose')
  .on('click', function () {
    $('.orderList').hide();
    // $("html,body").scrollTop({ toT: $(".order").offset().top - 230 });
  });
$('.orderList')
  .find('.oKnow')
  .on('click', function () {
    $('.orderList').hide();
    // $("html,body").scrollTop({ toT: $(".order").offset().top - 230 });
  });
// 正则：判断手机号码
function isPoneAvailable(tel) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(tel)) {
    return false;
  } else {
    return true;
  }
}
//正则判断邮箱
function isEmailAvailable(email) {
  var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!myreg.test(email)) {
    return false;
  } else {
    return true;
  }
}

// 判断手机号是否正确
function telResult(telText) {
  var telText = $('.tel').val(),
    result = isPoneAvailable(telText); //判断手机是否正确
  // var telText = $('.tel').val(),result = isEmailAvailable(telText);//判断邮箱是否正确
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
        console.log(res);
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
      let exchangeUrl = server.redeemUrl + `/?code=${exchangeCode}&ctx=apps`;
      console.log('exchangeUrl', exchangeUrl);
      var redeem = document.getElementById('redeem');
      redeem.href = exchangeUrl;
    },
  });
}

$('.redeem').click(function () {
  var href = $(this).attr('href');
  console.log(href);
  window.open(href);
  window.location = './swiper.html';
});

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
      // alert(data.responseJSON.errmsg);
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
    success: function (res) {
      let result = res;
      console.log(result);

      exchangeCode(telText, result.token_str);
      if (result.token_type == 'Bearer') {
        //兑换成功
        $('.oOrder').hide();
        $('.oWin').show();
      } else if (result.token_type == 300) {
        //已兑换
        $('.oOrder').hide();
        $('.oAgin').show();
      } else if (result.token_type == 400) {
        //兑换失败
        $('.oOrder').hide();
        $('.oLose').show();
      }
    },
  });
});

$('body').delegate('.tel', 'blur', function () {
  telResult();
});
