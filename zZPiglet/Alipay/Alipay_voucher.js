/*
qx(tf 1.0.11(316)) 及 loon(tf 2.1.1(163))、 surge(tf 4.10.0(1807))  及更新版本可用。
半自动提醒支付宝抢消费券，请在所在城市有消费券的时候使用。

qx:
52 59 9 * * 0,5,6 https://raw.githubusercontent.com/zZPiglet/Task/master/Alipay/Alipay_voucher.js

loon:
cron "52 59 9 * * 0,5,6" script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/Alipay/Alipay_voucher.js

shortcut:
https://www.icloud.com/shortcuts/2c37e7de80a24a6cbe9ca80e96337e1f

到时候点击通知即可跳转至支付宝消费券。

自不用 by zZPiglet
*/

const $ = new cmp()

let voucher = "alipays://platformapi/startapp?appId=2021001162654785"

$.notify("支付宝", "", "点击跳转抢消费券啦", voucher)

$done()

function cmp() {
    _isQuanX = typeof $task != "undefined"
    _isLoon = typeof $loon != "undefined"
    _isSurge = typeof $httpClient != "undefined" && !_isLoon
    this.notify = (title, subtitle, message, url) => {
        if (_isLoon) $notification.post(title, subtitle, message, url)
        if (_isQuanX) $notify(title, subtitle, message, { "open-url": url })
        if (_isSurge) $notification.post(title, subtitle, message, { url: url })
    }
}