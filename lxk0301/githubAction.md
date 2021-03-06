## github action使用教程说明

 - 可以参考github@ruicky写的 [@ruicky教程](https://ruicky.me/2020/06/05/jd-sign/)
 
### 注意几个地方就行

- **注意fork的是此 [仓库项目](https://github.com/lxk0301/scripts) , 不是@ruicky教程里面的**

- 使用action的时候其中京东的ck,不要放到 jdCookie.js里面，要放到Secrets里面, 添加 JD_COOKIE的时候。 多账号的cookie， 使用`&`隔开，比如 `账号一cookie&账号二cookie&账号三cookie`，再多账号就依次类推即可
    - 下面给个示例 ``pt_key=xxx1;pt_pin=xxx1;&pt_key=xxx2;pt_pin=xxx2;&pt_key=xxx3;pt_pin=xxx3;``
    - 京东cookie获取看这里 [浏览器获取京东cookie教程](https://github.com/lxk0301/scripts/blob/master/backUp/GetJdCookie.md)

- server酱的推送通知服务, 是可选项, 如果需要 自行申请SCKEY,再填入Secrets里面(Name选项输入 `PUSH_KEY` ,Value选项输入申请的 SCKEY)


- cron时间是按国际标准时间来的， 和北京时间不同，里面写16点才表示北京时间0点，具体可参考下面两个链接写cron

  -  [参考链接一](https://datetime360.com/cn/utc-beijing-time/) ， [参考链接二](http://www.timebie.com/cn/universalbeijing.php)

  - 根据使用经验发现github action 会有延迟现象，一般会延迟15分钟左右吧。比如设置北京时间16:00运行，action其实要16:15左右才会执行脚本的。
    
- 上面 [@ruicky教程](https://ruicky.me/2020/06/05/jd-sign/) 获取ck的方法不对。继续参考我readme里面 [浏览器获取京东cookie教程](https://github.com/lxk0301/scripts/blob/master/backUp/GetJdCookie.md) 获取ck。
不过这里面获取的ck比较长，可以用下面的脚本，在Chrome浏览器按F12，console里面输入下面脚本按enter回车键，这样子整理出关键的ck已经在你的剪贴板上， 可直接粘贴

    ```
    var CV = '这里单引号里面放 https://shimo.im/docs/CTwhjpG6ydvC3qJJ/ 方法获取的 ck';
    var CookieValue = CV.match(/pt_key=.+?;/) + CV.match(/pt_pin=.+?;/);
    copy(CookieValue);
    ```

- fork过后，acton没有看到运行，是因为.yml文件里面的cron时间未到，如需立马看到效果

  - 手动点击仓库的star按钮即可  

- 自动同步Fork后的代码(此部分内容由tg@wukongdada和tg@goukey提供) 注：此项目里面提供的配置文件是方案A  
   
  - 方案A - 强制远程分支覆盖自己的分支
  
      1. 参考tg@wukongdada这篇教程 [保持自己github的forks自动和上游仓库同步的教程](https://note.youdao.com/noteshare?id=6cd72de428957d593c129749194b4352) ， 安装[pull插件](https://github.com/apps/pull) 并确认此项目已在pull插件的作用下（参考@twukongdada这篇教程文中1-d）
      
      2. 确保.github/pull.yml文件正常存在，yml内上游作者填写正确(此项目已填好，无需更改)。
      
      3. 确保pull.yml里面是`mergeMethod: hardreset`(默认就是hardreset)。
      
      4. ENJOY!上游更改三小时左右就会自动发起同步。
      
  - 方案B - 保留自己分支的修改
    
    > 上游变动后pull插件会自动发起pr，但如果有冲突需要自行**手动**确认。
    > 如果上游更新涉及workflow里的文件内容改动，需要自行**手动**确认。
    
    1. 参考tg@wukongdada这篇教程 [保持自己github的forks自动和上游仓库同步的教程](https://note.youdao.com/noteshare?id=6cd72de428957d593c129749194b4352) ， 安装[pull插件](https://github.com/apps/pull) 并确认此项目已在pull插件的作用下（参考@twukongdada这篇教程文中1-d）
    2. 确保.github/pull.yml文件正常存在，yml内上游作者填写正确(此项目已填好，无需更改)。
    3. 将pull.yml里面的`mergeMethod: hardreset`修改为`mergeMethod: merge`保存。
    4. ENJOY!上游更改三小时左右就会自动发起同步。
    
    
- 下方提供使用到的 **Secrets全集合**

    | Name                    |   归属   | 属性   | 说明                                                         |
    | ----------------------- | :----------: | --------- | ------------------------------------------------------------ |
    | `JD_COOKIE`             |   京东   | 必须   | 京东cookie,具体获取参考[Cookie获取教程](https://shimo.im/docs/CTwhjpG6ydvC3qJJ/read) |
    | `PUSH_KEY`              |   微信推送   | 非必须 | cookie失效推送[server酱的微信通知](http://sc.ftqq.com/3.version) |
    | `BARK_PUSH`             |   BARK推送   | 非必须 | cookie失效推送BARK这个APP,填写内容是app提供的 IP/设备码，例如：https://api.day.app/XXXXXXXX |
    | `BARK_SOUND`            |   BARK推送   | 非必须 | bark推送声音设置，例如`choo`,具体值请在`bark`-`推送铃声`-`查看所有铃声` |
    | `TG_BOT_TOKEN`          |   telegram推送   | 非必须 | tg推送,填写自己申请[@BotFather](https://t.me/BotFather)的Token,如`10xxx4:AAFcqxxxxgER5uw` , [具体教程](https://github.com/lxk0301/scripts/pull/37#issuecomment-692415594) |
    | `TG_USER_ID`            |   telegram推送   | 非必须 | tg推送,填写[@getuseridbot](https://t.me/getuseridbot)中获取到的纯数字ID, [具体教程](https://github.com/lxk0301/scripts/pull/37#issuecomment-692415594) |
    | `PET_NOTIFY_CONTROL`    | 推送开关  | 非必须 | 控制京东萌宠是否通知,`false`为通知,`true`不通知              |
    | `FRUIT_NOTIFY_CONTROL`  | 推送开关  | 非必须 | 控制京东农场是否通知,`false`为通知,`true`不通知              |
    | `FruitShareCodes`       |  东东农场互助码  | 非必须 | 填写规则请看 [jdFruitShareCodes.js里面的说明](https://github.com/lxk0301/scripts/blob/master/jdFruitShareCodes.js) |
    | `PETSHARECODES`         |  东东萌宠互助码  | 非必须 | 填写规则请看 [jdPetShareCodes.js里面的说明](https://github.com/lxk0301/scripts/blob/master/jdPetShareCodes.js) |
    | `PLANT_BEAN_SHARECODES` |  种豆得豆互助码  | 非必须 | 填写规则请看 [jdPlantBeanShareCodes.js里面的说明](https://github.com/lxk0301/scripts/blob/master/jdPlantBeanShareCodes.js) |
    
    ##### 互助码的填写规则
    ```
    同一个京东账号的好友互助码用@符号隔开,不同京东账号互助码用&符号隔开,下面给一个文字示例和具体互助码示例说明
    两个账号各两个互助码的文字示例：
    京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
  
    两个账号各两个互助码的真实示例： 
    0a74407df5df4fa99672a037eec61f7e@dbb21614667246fabcfd9685b6f448f3&6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6&6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6
    ```
    
- 如何查看运行状态
    - 查看运行状态
     ![查看运行状态](icon/action1.png)
    - 查看运行日志
        ![查看运行状态](icon/action2.png)
##### 参考文献
[GitHub Actions 手动触发方式进化史](https://p3terx.com/archives/github-actions-manual-trigger.html)    
[GitHub Actions 入门教程](https://p3terx.com/archives/github-actions-started-tutorial.html)

