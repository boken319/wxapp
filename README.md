欢迎来到我的项目，这是中国海洋大学的移动软件开发课程的实验项目
作者：wsy     学号23020007119
移动软件开发课程一：微信小程序用户信息获取功能
项目介绍
本项目是基于微信小程序开发的用户信息获取 Demo，实现了「默认头像 / 昵称展示」「微信头像选择」「微信昵称获取」核心功能，遵循微信小程序最新开发规范，适配真机运行，可作为小程序入门学习的实践案例。
项目特点：
初始状态显示默认头像（/images/default-avatar.jpg）和默认昵称「Hello World」
点击按钮可唤起微信原生接口，选择头像或获取微信昵称（无需用户手动输入）
不做本地数据持久化，每次重启小程序恢复默认状态
界面风格统一，按钮采用紫色主题（#663399），弹窗布局适配移动端
技术栈：
微信小程序原生框架（WXML/WXSS/JS/JSON）
微信开发者工具（调试与预览）
微信小程序原生接口：chooseAvatar（头像选择）、input type="nickname"（昵称获取）

效果预览<img width="100" height="200" alt="屏幕截图 2025-08-25 220450" src="https://github.com/user-attachments/assets/5929ff22-4e7c-400c-8cf4-b347423d31df" />
<img width="100" height="200" alt="屏幕截图 2025-08-25 220532" src="https://github.com/user-attachments/assets/fc2805e1-90c7-48e9-a5d5-6b961f24bbf5" />


项目结构
plaintext
wechat-user-info-demo/
├── images/                  # 图片资源目录
│   └── default-avatar.jpg   # 默认头像图片（需自行添加）
├── pages/                   # 页面目录
│   └── index/               # 首页
│       ├── index.wxml       # 页面结构
│       ├── index.wxss       # 页面样式
│       ├── index.js         # 页面逻辑
│       └── index.json       # 页面配置
├── app.json                 # 全局配置
├── app.js                   # 全局逻辑
├── app.wxss                 # 全局样式
└── README.md                # 项目说明文档
功能说明
功能模块	实现方式	交互流程
默认信息展示	初始化data中name: "Hello World"、touxiang: "/images/default-avatar.jpg"	小程序启动后自动渲染默认头像和昵称
微信头像选择	使用<button open-type="chooseAvatar">唤起微信原生选择器	点击「选择头像」→ 选择相册 / 拍摄 → 页面实时更新头像
微信昵称获取	使用<input type="nickname">自动关联微信昵称选择	点击「获取昵称」→ 弹窗输入框聚焦 → 选择「使用微信昵称」→ 确认后更新昵称
空昵称校验	confirmNickname方法中判断输入框内容是否为空	未选择 / 输入昵称时点击「确定」→ 弹出「请选择或输入昵称」提示
快速开始
1. 环境准备
安装微信开发者工具
注册微信小程序账号（个人账号即可，开发时可使用「测试号」）
2. 项目拉取与配置
克隆本仓库到本地：
bash
git clone https://github.com/你的GitHub用户名/你的仓库名.git

打开微信开发者工具，点击「+ 新小程序项目」：
项目名称：自定义（如「用户信息获取 Demo」）
目录：选择克隆到本地的项目文件夹
AppID：选择「测试号」（若无个人 AppID）
取消勾选「创建 QuickStart 项目」，点击「创建」
3. 补充默认头像
在项目根目录的images文件夹中，放入一张名为default-avatar.jpg的图片（建议尺寸 200x200px）
若修改图片名称 / 路径，需同步更新index.js中data.touxiang的初始值
4. 运行与预览
点击微信开发者工具左侧「模拟器」，可实时查看界面效果
点击顶部「预览」按钮，生成二维码，用微信扫描可在真机上测试
核心代码解析
1. 头像选择逻辑（index.js）
javascript
// 选择头像事件：点击「选择头像」按钮触发
onChooseAvatar(e) {
  // 获取微信返回的头像临时路径
  const { avatarUrl } = e.detail;
  // 更新data，页面自动重新渲染头像
  this.setData({
    touxiang: avatarUrl
  });
}
2. 昵称获取逻辑（index.js）
javascript
// 打开昵称弹窗：自动聚焦输入框，唤起微信昵称选择
openNicknameModal() {
  this.setData({
    showNicknameModal: true,
    focusInput: true // 输入框聚焦，触发微信昵称选择弹窗
  });
}

// 昵称变更：获取输入框内容（含微信昵称选择结果）
onNicknameChange(e) {
  this.setData({
    tempNickname: e.detail.value
  });
}

// 确认昵称：校验并更新页面显示
confirmNickname() {
  if (this.data.tempNickname.trim()) {
    this.setData({
      name: this.data.tempNickname.trim(),
      showNicknameModal: false
    });
  } else {
    // 空昵称提示
    wx.showToast({
      title: '请选择或输入昵称',
      icon: 'none',
      duration: 1500
    });
  }
}

常见问题
Q：默认头像不显示怎么办？
A：检查images文件夹是否存在、默认头像文件名是否为default-avatar.jpg、index.js中初始路径是否正确（需以/开头，如/images/default-avatar.jpg）。
Q：点击「获取昵称」不弹出微信昵称选择弹窗？
A：确保input标签添加了type="nickname"，且openNicknameModal方法中设置了focusInput: true；部分模拟器可能不支持，建议用真机测试。
开发者信息
开发者：王书一（中国海洋大学）
项目用途：微信小程序开发课程实验
开发时间：2025 年 8 月 25 日



移动软件开发课程二：微信小程序天气查询应用
项目介绍
本项目是一个基于微信小程序原生开发的天气查询工具，集成和风天气 API，支持全国省市区三级联动选择，实时展示温度、天气状态、湿度、气压、能见度、风向风速等核心气象数据，界面简洁直观，适配不同尺寸的微信客户端。
项目旨在实践微信小程序开发流程与第三方 API 调用逻辑，适合小程序初学者学习参考。
功能特性
地区三级联动选择：通过小程序原生picker组件，支持省 - 市 - 区快速切换，选择后自动刷新对应地区天气。
实时天气数据展示：
核心信息：实时温度、天气状态文本、天气图标；
详细数据：湿度（%）、大气压强（hPa）、能见度（km）、风向、风速（km/h）、风力等级；
自适应布局：采用 Flex 布局与rpx自适应单位，适配手机、平板等不同屏幕尺寸。
数据动态更新：页面加载时自动获取默认地区天气，切换地区时实时请求最新数据。
技术栈
前端框架：微信小程序原生语法（WXML/WXSS/JavaScript）
第三方 API：和风天气 API（城市搜索接口 + 实时天气接口）
布局方案：Flex 布局
版本控制：Git/GitHub
项目预览：
<img width="100" height="200" alt="image" src="https://github.com/user-attachments/assets/cf5bb0a8-58bd-4556-8c3d-f39e8a2cb54b" />

项目结构
plaintext
weather-miniprogram/
├─ images/                # 静态资源文件夹
│  └─ weather_icon/       # 天气图标文件夹（需自行补充图标文件）
│     ├─ 100.png          # 晴天图标（示例）
│     ├─ 101.png          # 多云图标（示例）
│     └─ ...（其他天气图标）
├─ pages/                 # 页面文件夹
│  └─ index/              # 首页（唯一页面）
│     ├─ index.wxml       # 页面结构（地区选择+天气展示）
│     ├─ index.wxss       # 页面样式（布局+配色）
│     ├─ index.js         # 页面逻辑（API调用+数据处理）
│     └─ index.json       # 页面配置（默认配置）
├─ app.js                 # 小程序入口逻辑
├─ app.json               # 小程序全局配置
├─ app.wxss               # 小程序全局样式
└─ README.md              # 项目说明文档（本文档）
环境准备
1. 和风天气 API 准备
注册和风天气开发者账号：和风天气开发者平台
创建应用，获取API 密钥（X-QW-Api-Key）（项目默认使用测试密钥，建议替换为个人密钥以避免调用限额）
项目中使用的 API 接口：
城市搜索接口：https://n55ctuk93r.re.qweatherapi.com/geo/v2/city/lookup（获取城市 ID）
实时天气接口：https://n55ctuk93r.re.qweatherapi.com/v7/weather/now（获取实时天气数据）
2. 天气图标资源
在和风天气开发者文档中下载【天气图标集】：和风天气图标文档
将图标文件（如100.png、101.png等）放入项目/images/weather_icon/文件夹下，确保图标代码与 API 返回的now.icon字段匹配。
快速开始
1. 克隆项目
bash
git clone https://github.com/你的GitHub用户名/weather-miniprogram.git
cd weather-miniprogram
2. 配置 API 密钥
打开pages/index/index.js文件，找到以下代码，将X-QW-Api-Key的值替换为你的和风天气 API 密钥：
javascript
运行
header: {
    'X-QW-Api-Key': '320b1d6a698b4855ba3a51722198b5e4' // 替换为你的API密钥
}
3. 导入小程序项目
打开微信开发者工具，点击【+ 新小程序项目】；
输入项目名称（如 “天气查询”）、目录（选择克隆后的项目文件夹）；
填写小程序 AppID（可使用 “测试号 AppID”，需在微信公众平台申请）；
勾选【不校验合法域名、web-view（业务域名）等】（开发阶段便捷测试，正式上线需配置合法域名）；
点击【创建】，即可在模拟器中运行项目。
核心代码解析
1. 页面结构（index.wxml）
地区选择器：picker mode="region"实现三级联动，绑定regionChange事件监听选择变化；
核心天气展示：text组件显示温度与天气状态，image组件加载对应天气图标；
详细数据区：通过flex布局的bar（行）和box（单元格），整齐展示湿度、气压等 6 项数据。
2. 逻辑处理（index.js）
数据初始化：data中定义默认地区（北京市东城区）与天气数据结构；
地区切换逻辑：regionChange函数更新选中地区，并调用getWeather重新获取天气；
API 调用流程：
调用城市搜索接口，传入 “区名 + 市名” 获取城市 ID（locationId）；
携带城市 ID 调用实时天气接口，解析返回数据并通过setData更新页面。
3. 样式设计（index.wxss）
使用flex布局实现页面垂直居中与数据区多列对齐；
采用rpx单位适配不同屏幕，核心温度文本使用大字体（80rpx）与蓝色（#3C5F81）突出显示。
常见问题
1. 城市匹配失败（无locationId返回）
原因：仅传入区名可能导致重名匹配错误（如 “朝阳区” 存在于多个城市）；
解决：确保 API 请求中同时传入location（区名）和adm（市名），代码中已通过that.data.region[2]（区名）和that.data.region[1]（市名）实现，无需额外修改。
2. 天气图标不显示
原因：图标路径错误或图标文件缺失；
解决：检查image组件的src路径是否为/images/weather_icon/{{now.icon}}.png，并确保对应图标文件已放入weather_icon文件夹。
3. API 调用无响应
原因：未配置合法域名，小程序拦截请求；
解决：开发阶段勾选 “不校验合法域名”，正式上线前在微信公众平台 “开发设置” 中添加和风天气 API 域名（n55ctuk93r.re.qweatherapi.com）。
功能扩展建议
错误提示优化：添加wx.showToast提示 API 调用失败（如网络超时、密钥无效）；
下拉刷新：实现onPullDownRefresh函数，支持手动下拉刷新天气数据；
天气预报：集成和风天气/v7/weather/3d接口，添加未来 3 天天气预报；
空气质量：调用/v7/air/now接口，展示 PM2.5、空气质量指数（AQI）；
主题切换：增加浅色 / 深色主题，根据系统设置或用户选择自动切换。
许可证
本项目仅供学习使用，数据来源为和风天气 API，需遵守【和风天气开发者许可协议】（查看协议）。禁止用于商业用途，如需商用请联系和风天气获取正式授权。

开发者信息
开发者：王书一（中国海洋大学）
项目用途：微信小程序开发课程实验
开发时间：2025 年 8 月 26 日

移动软件开发三：
垃圾分类微信小程序（云开发版）
项目介绍
本项目是基于 微信云开发 实现的垃圾分类查询小程序，核心功能为 文本搜索垃圾分类（实验重点验证功能），可选集成百度智能云图像识别接口实现 “拍照识垃圾”（接口稳定性需结合网络 / 设备环境调试）。项目无需自建服务器，通过微信云开发提供的云函数、云数据库完成后端逻辑与数据存储，适合作为微信小程序云开发的入门实验项目。
核心功能
文本搜索查询：输入垃圾名称（如 “塑料瓶”“苹果核”）或点击热门搜索词条，快速查询垃圾所属类别（可回收物 / 湿垃圾 / 有害垃圾 / 干垃圾）及投放建议。
分类展示：展示四大类垃圾的基础定义与简易区分口诀，帮助用户建立垃圾分类基础认知。
可选图像识别：集成百度智能云图像识别 API，通过扫描 / 上传图片识别垃圾（需调试 API 稳定性，实验中优先保证文本搜索功能）。
环境准备
基础工具：
微信开发者工具（下载地址）
Git（用于拉取代码）
账号与密钥：
微信小程序账号（需实名认证，注册地址，获取小程序 AppID）
百度智能云账号（需实名认证，注册地址，创建图像识别应用获取 API Key 和 Secret Key）
数据文件：
项目中已包含 trash.json（垃圾 - 分类映射数据）和 type.json（垃圾类别定义数据），无需额外下载。
部署步骤
1. 百度智能云配置
登录百度智能云，进入【人工智能】→【图像识别】，创建应用（接口选择 “图像识别全选”）。
完成实名认证后，在应用详情页复制 API Key 和 Secret Key（后续配置用）。
领取图像识别免费资源（避免 API 调用超限，领取地址）。
2. 微信云开发环境创建
打开微信开发者工具，登录微信账号，点击【云开发】按钮，按照提示创建云环境（免费版足够实验使用）。
环境创建完成后，复制 环境 ID（后续配置用）。
3. 项目导入与配置
拉取本项目代码到本地：
bash
git clone https://github.com/你的GitHub用户名/你的仓库名.git

打开微信开发者工具，点击【导入项目】，选择拉取的项目文件夹，输入你的小程序 AppID，勾选 “云开发” 选项。
核心配置修改：
配置云环境 ID：打开 app.js，将 wx.cloud.init() 中的 env 改为你的云环境 ID：
javascript
wx.cloud.init({
  env: "你的云环境ID" // 替换为步骤2中复制的云环境ID
})

配置百度 API 密钥：打开 miniprogram/pages/search/search.js，替换 apiKey 和 secretKey：
javascript
const apiKey = "你的百度API Key"; // 替换为步骤1中复制的API Key
const secretKey = "你的百度Secret Key"; // 替换为步骤1中复制的Secret Key

4. 云函数部署
在微信开发者工具中，展开左侧 cloudfunctions 文件夹，可见 4 个子文件夹（对应核心云函数）。
对每个子文件夹执行：右键 →【上传并部署：不上传 node_modules】。
部署成功标志：子文件夹图标变为绿色（需确保所有 4 个云函数均部署成功）。
5. 云数据库部署
点击微信开发者工具顶部【云开发】，进入云开发控制台。
选择【数据库】→【+ 新建集合】，依次创建两个集合：trash 和 type。
导入数据：
选中 trash 集合 →【导入】→ 选择项目根目录下的 trash.json → 完成导入。
选中 type 集合 →【导入】→ 选择项目根目录下的 type.json → 完成导入。
关键权限设置：将 trash 和 type 集合的权限改为【所有用户可读，仅创建者可写】（避免文本搜索无结果）。
6. 运行小程序
点击微信开发者工具顶部【编译】按钮，小程序启动后即可测试功能。
优先验证 文本搜索：进入 “搜索” 页面，输入 “塑料瓶”“苹果核” 等关键词，确认分类结果正常返回。
核心技术栈
技术 / 服务	用途说明
微信小程序（原生）	前端界面开发与交互逻辑
微信云开发	云函数（处理后端逻辑）、云数据库（存储垃圾数据）
百度智能云图像识别	可选功能：图像识别垃圾类别
JSON 数据集	trash.json（垃圾 - 分类映射）、type.json（类别定义）
常见问题解决
云函数部署失败（仅单个成功）：
需对 cloudfunctions 下所有子文件夹逐一执行 “上传并部署”，确保全部变为绿色。若提示 “依赖缺失”，进入对应云函数文件夹，通过终端执行 npm install 安装依赖后重新部署。
文本搜索无结果：
检查云数据库 trash 集合权限是否为 “所有用户可读”，若不是则修改权限；同时确认 trash.json 已成功导入（可在云开发控制台查看数据条数）。
百度 API 调用失败（提示 “权限不足”）：
确认百度智能云账号已完成实名认证，且已领取图像识别免费资源；检查 search.js 中 apiKey 和 secretKey 是否复制正确（避免多余空格）。
图像识别跨端不稳定（手机行 / 电脑不行）：
检查网络环境（需稳定联网），微信开发者工具调试时选择 “真机调试”，确保手机与电脑处于同一 WiFi；若仍不稳定，可优先聚焦文本搜索功能（实验核心目标）。
项目预览

<img width="225" height="492" alt="屏幕截图 2025-09-01 174802" src="https://github.com/user-attachments/assets/45cfe87a-5d21-446d-a3f5-9ee8c70f37fe" />
<img width="227" height="507" alt="屏幕截图 2025-09-01 174825" src="https://github.com/user-attachments/assets/3c422de3-49bc-4d54-aad6-65dfdc2da3aa" />
<img width="232" height="499" alt="屏幕截图 2025-09-01 174902" src="https://github.com/user-attachments/assets/5ccc9ccb-cc9d-4d79-b86e-3994d65f3bca" />

移动软件开发实验四：
口述校史视频播放小程序
一、项目介绍
1. 项目背景
本项目基于周文洁老师《微信小程序开发实战》第六章实验，旨在通过小程序媒体 API 实现视频播放功能，核心素材为某高校档案馆《口述校史》栏目视频，记录老教工对大学的回忆，适合小程序初学者学习媒体组件与交互逻辑。
2. 核心功能
视频列表展示与切换：支持 4 位老教工的口述校史视频列表，点击即可切换播放
视频自动播放控制：点击列表项自动停止当前视频、加载新视频并播放
随机颜色弹幕：支持输入文本发送弹幕，弹幕颜色随机生成（十六进制颜色值）
自定义导航栏：金棕色导航栏搭配 “口述校史” 标题，优化视觉体验
二、环境准备
开发工具：微信开发者工具（稳定版），下载地址：微信开发者工具官网
AppID：可使用微信小程序测试号（无需注册企业账号，工具内直接申请）
素材准备：
播放图标 play.png（已提供下载链接，或自行替换为同尺寸图标）
视频资源：默认使用高校档案馆视频地址，若地址失效可替换为公开可访问的 MP4 格式视频链接
三、文件结构说明
plaintext
videoDemo/                # 项目根目录
├─ images/                # 图标资源文件夹
│  └─ play.png            # 播放图标（列表项显示用）
├─ pages/                 # 页面文件夹（仅保留首页index）
│  └─ index/              # 首页相关文件
│     ├─ index.wxml       # 页面结构（视频播放器、弹幕区、列表区）
│     ├─ index.wxss       # 页面样式（布局、颜色、尺寸适配）
│     ├─ index.js         # 页面逻辑（视频控制、弹幕发送、列表交互）
│     └─ index.json       # 页面配置（默认无需修改）
├─ app.js                 # 全局应用逻辑（初始化App实例）
├─ app.json               # 全局配置（导航栏、页面路径）
├─ app.wxss               # 全局样式（默认清空，未使用）
└─ project.config.json    # 项目配置（工具自动生成，无需手动修改）
四、部署与运行步骤
代码下载：将本项目代码克隆或下载到本地，解压至空白文件夹（如videoDemo）
导入项目：
打开微信开发者工具，点击 “+ 新小程序项目”
项目名称填 “口述校史视频播放”，目录选择本地解压的videoDemo文件夹
AppID 选择 “测试号”（或输入个人 / 企业 AppID），取消 “使用云服务”，点击 “创建”
素材替换（可选）：
若play.png图标缺失，下载图标压缩包（链接见下方 “素材链接”），解压后放入images文件夹
若默认视频地址失效，在index.js的list数组中替换videoUrl为公开 MP4 链接
运行项目：点击开发者工具顶部 “编译” 按钮，模拟器将显示小程序界面，可实时预览功能
五、核心功能实现说明
1. 视频列表与切换
通过wx:for循环渲染list数组中的视频标题与图标，wx:key绑定视频id确保渲染性能
点击列表项触发playVideo事件：先停止当前视频，再更新视频地址并调用play()方法播放新视频
2. 弹幕功能
视频组件添加enable-danmu属性开启弹幕，danmu-btn显示默认弹幕按钮（可选）
输入框通过bindinput绑定getDanmu事件，实时获取输入内容并存储到danmuTxt
点击 “发送弹幕” 触发sendDanmu事件，调用sendDanmuAPI 发送文本，颜色由getRandomColor生成（随机十六进制颜色）
3. 导航栏自定义
在app.json的window配置中，设置navigationBarBackgroundColor为金棕色（#987938），navigationBarTitleText为 “口述校史”
六、素材链接
播放图标play.png下载：https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/images_play.zip
默认视频地址（来自高校档案馆）：
杨国宜先生：http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4
其他 3 位先生视频地址见index.js的list数组
七、常见问题（FAQ）
Q：播放图标不显示？
A：检查images文件夹路径是否正确（需与index.wxml中image的src一致，如/images/play.png，区分大小写）。
Q：弹幕发送后不显示？
A：确认video组件已添加enable-danmu属性；检查danmuTxt是否在data中初始化（需设为空字符串）。
Q：调用随机颜色函数报错 “getRandomColor is not defined”？
A：确保getRandomColor函数在Page()内部定义，调用时需加this.（如this.getRandomColor()）。
Q：视频无法加载？
A：检查videoUrl是否为有效链接；若使用自定义链接，确保链接支持跨域访问（小程序需配置合法域名，测试号可跳过域名校验）。
八、扩展建议
新增 “视频进度记忆” 功能：记录用户上次播放位置，下次打开自动跳转
优化列表样式：增加视频时长、播放量等信息
支持弹幕速度调节：通过danmu-speed属性自定义弹幕滚动速度
如有问题或优化建议，欢迎在评论区交流！<img width="523" height="1108" alt="屏幕截图 2025-09-02 145928" src="https://github.com/user-attachments/assets/4afa8571-1cf6-4ba7-b49c-690a31bf2c32" />

移动软件开发实验五：
第一个 HarmonyOS 应用
本项目是一个基于 HarmonyOS 的基础入门示例工程，采用 ArkTS 语言和 Stage 模型 开发，核心功能是实现两个页面之间的跳转与返回，包含基础 UI 组件（Text、Button）、线性布局（Row/Column）和页面路由（Router）的使用，适合 HarmonyOS 应用开发新手学习参考。
通过本项目，可掌握：
DevEco Studio 开发环境的基础使用
ArkTS 声明式 UI 的基本语法
Stage 模型工程目录结构
页面路由跳转逻辑实现
基础组件样式配置
环境准备
1. 开发工具
DevEco Studio：最新版（推荐 5.0+，下载地址：华为开发者联盟）
HarmonyOS SDK：API Version 5.1.1 (19)（需在 DevEco Studio 中自动 / 手动安装）
2. 运行环境
模拟器：DevEco Studio 内置 HarmonyOS 模拟器（需在 SDK Manager 中安装对应版本模拟器插件）
实机设备：HarmonyOS 4.0+ 系统的手机 / 平板（开启开发者模式）
预览器：DevEco Studio 内置 Previewer（无需额外配置，可快速预览 UI）
3. 依赖说明
无第三方依赖库，仅使用 HarmonyOS 系统内置 API（@kit.BasicServicesKit 等）。
快速开始
1. 克隆仓库
bash
# 克隆本项目到本地
git clone https://github.com/your-username/your-repo-name.git
# 进入项目目录
cd your-repo-name
2. 打开工程
启动 DevEco Studio，点击 File > Open，选择克隆后的项目根目录（注意：路径中不可包含中文字符或空格）。
工程加载后，DevEco Studio 会自动检测 SDK 配置，若提示 "SDK not found"，点击 Setup SDK，在弹出的窗口中选择 API Version 5.1.1 (19) 并完成安装。
等待工程同步完成（底部状态栏显示 "Sync finished"），同步过程中需保持网络通畅（用于下载依赖资源）。
3. 预览页面
在左侧 Project 窗口中，展开 entry > src > main > ets > pages，双击打开 Index.ets。
点击编辑窗口右上角的 Previewer 按钮（图标为眼睛），启动预览器。
预览器加载完成后，可直接看到第一个页面（显示 "Hello World" 和 "Next" 按钮），点击按钮可预览页面跳转效果。
4. 实机 / 模拟器运行
连接实机设备（开启开发者模式 + USB 调试），或启动内置模拟器（Tools > Device Manager，选择对应设备并启动）。
点击 DevEco Studio 顶部工具栏的 Run 'entry' 按钮（绿色三角图标），或使用快捷键 Shift + F10。
等待编译和安装完成，设备上会自动启动应用，测试页面跳转功能。
项目结构（Stage 模型）
plaintext
FirstHarmonyApp/          # 项目根目录
├── AppScope/             # 应用全局配置
│   └── app.json5         # 应用名称、版本、图标等全局配置
├── entry/                # 主模块（生成 HAP 包）
│   ├── src/
│   │   └── main/
│   │       ├── ets/      # ArkTS 源码目录
│   │       │   ├── entryability/  # 应用入口（生命周期管理）
│   │       │   └── pages/         # 页面目录
│   │       │       ├── Index.ets  # 第一个页面（首页）
│   │       │       └── Second.ets # 第二个页面（跳转页）
│   │       └── resources/         # 资源文件（图片、字符串等）
│   │           └── base/
│   │               └── profile/
│   │                   └── main_pages.json # 页面路由配置
│   ├── build-profile.json5        # 模块编译配置
│   └── module.json5               # 模块基础配置（HAP 信息、设备适配）
├── build-profile.json5    # 工程级编译配置（签名、产品配置）
└── README.md              # 项目说明文档（本文档）
核心功能说明
1. 页面功能
页面文件	功能描述
Index.ets	首页 - 显示 "Hello World" 文本 + "Next" 按钮，点击按钮跳转到 Second 页面
Second.ets	跳转页 - 显示 "Hi there" 文本 + "Back" 按钮，点击按钮返回 Index 页面
2. 关键技术点
声明式 UI：使用 @Entry、@Component 装饰器定义页面和组件，build() 方法描述 UI 结构。
线性布局：通过 Row()（水平布局）和 Column()（垂直布局）嵌套，实现组件居中显示。
状态管理：使用 @State 装饰器定义页面状态变量（如 message），变量变化时 UI 自动更新。
页面路由：通过 UIContext.getRouter() 获取路由实例，调用 pushUrl()（跳转）和 back()（返回）实现页面导航。
日志输出：通过 console.info()/console.error() 打印操作日志，便于调试（在 DevEco Studio 底部 Console 窗口查看）。

常见问题（FAQ）
预览器显示空白？
解决：
检查代码是否有语法错误（左侧目录树中文件是否有红色波浪线），修复后重新编译；
单击编辑窗口右上角侧边工具栏中的 "Previewer" 按钮
等待预览器初始化完成，首次加载可能需要几秒钟
预览器中会显示当前页面的效果，可通过预览器下方的控件调整预览设备和尺寸
<img width="789" height="813" alt="image" src="https://github.com/user-attachments/assets/21686295-34b7-4382-b498-1226741cec94" />

移动软件开发实验六：
推箱子游戏（微信小程序）
项目介绍
本项目是基于微信小程序开发的简易推箱子游戏，源自周文洁老师《微信小程序开发实战》第十三章案例。通过综合运用小程序canvas组件、绘图 API、页面路由与数据交互等技术，实现了包含 “关卡选择” 与 “游戏操作” 的完整交互流程，支持 4 个不同难度关卡，具备主角移动、箱子推动、游戏成功判断与重新开始等核心功能。
技术栈
开发框架：微信小程序原生框架（WXML + WXSS + JavaScript）
核心组件：canvas（游戏画面绘制）、view（布局容器）、button（交互按钮）
核心 API：wx.createCanvasContext（画布上下文创建）、wx.navigateTo（页面跳转）、wx.showModal（弹窗提示）
项目结构
plaintext
boxGame/
├── images/                # 图片素材目录
│   ├── level01.png        # 第1关预览图
│   ├── level02.png        # 第2关预览图
│   ├── level03.png        # 第3关预览图
│   ├── level04.png        # 第4关预览图
│   └── icon/              # 游戏元素图标
│       ├── bird.png       # 游戏主角（小鸟）
│       ├── box.png        # 箱子
│       ├── ice.png        # 道路
│       ├── pig.png        # 终点
│       └── stone.png      # 墙壁
├── pages/                 # 页面目录
│   ├── index/             # 首页（关卡选择）
│   │   ├── index.js       # 首页逻辑
│   │   ├── index.json     # 首页配置
│   │   ├── index.wxml     # 首页布局
│   │   └── index.wxss     # 首页样式
│   └── game/              # 游戏页
│       ├── game.js        # 游戏逻辑（核心）
│       ├── game.json      # 游戏页配置
│       ├── game.wxml      # 游戏页布局
│       └── game.wxss      # 游戏页样式
├── utils/                 # 工具目录
│   └── data.js            # 公共地图数据（4个关卡）
├── app.js                 # 小程序入口逻辑
├── app.json               # 小程序全局配置
├── app.wxss               # 小程序全局样式
└── project.config.json    # 项目配置（开发者工具）
功能说明
1. 首页（关卡选择）
界面展示：2×2 网格布局显示 4 个关卡，每个关卡包含 “预览图 + 关卡文本”（如 “第 1 关”）。
交互功能：点击任意关卡，通过wx.navigateTo跳转至游戏页，并携带关卡下标参数（如level=0对应第 1 关）。
2. 游戏页（核心交互）
（1）游戏元素
地图：8×8 网格布局，包含墙壁（灰色）、道路（浅蓝色）、终点（粉色）三种静态元素。
动态元素：
主角（黄色小鸟）：可通过方向键控制移动。
箱子（棕色方块）：仅可被主角推动，不可穿过墙壁或其他箱子。
（2）核心操作
操作	功能描述
方向键（上 / 下 / 左 / 右）	控制主角沿对应方向移动；若主角前方有箱子且箱子前方无障碍，可推动箱子移动。
重新开始按钮	重置当前关卡，将主角与箱子回归初始位置，重新开始游戏。
（3）游戏规则
目标：将所有箱子推动至 “终点” 位置（箱子与粉色终点图标重叠）。
成功判断：当所有箱子均位于终点时，自动弹出 “游戏成功” 提示框。
部署与运行
1. 环境准备
安装微信开发者工具（稳定版）。
注册微信小程序账号（个人账号即可），获取 AppID（或使用测试号）。
2. 项目导入
克隆本仓库到本地：
bash
git clone https://github.com/你的GitHub用户名/boxGame.git

打开微信开发者工具，点击 “导入项目”：
项目名称：自定义（如 “推箱子游戏”）。
目录：选择本地克隆的boxGame文件夹。
AppID：输入你的小程序 AppID（或选择 “测试号”）。
点击 “创建”，等待项目加载完成。
3. 运行测试
点击开发者工具顶部的 “编译” 按钮，默认加载首页（关卡选择）。
点击任意关卡进入游戏页，测试方向键操作、箱子推动与重新开始功能。
核心代码说明
1. 地图数据定义（utils/data.js）
通过二维数组定义 4 个关卡的地图，数字对应游戏元素：
0：墙壁外围（不可见）、1：墙壁、2：道路、3：终点、4：箱子、5：主角。
javascript
运行
// 示例：第1关地图数据
var map1 = [
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 2, 2, 1, 1, 1, 0],
  [0, 1, 5, 4, 2, 2, 1, 0],
  [1, 1, 1, 2, 1, 2, 1, 1],
  [1, 3, 1, 2, 1, 2, 2, 1],
  [1, 3, 4, 2, 2, 1, 2, 1],
  [1, 3, 2, 2, 2, 4, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
];
// 暴露地图数据供游戏页引用
module.exports = { maps: [map1, map2, map3, map4] };
2. 画布绘制（pages/game/game.js）
通过drawCanvas函数绘制地图、箱子与主角，确保元素层级正确（主角在最上层）：
javascript
运行
drawCanvas: function () {
  // 清空画布
  this.ctx.clearRect(0, 0, 320, 320);
  // 绘制地图（墙壁/道路/终点）
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let imgName = map[i][j] === 1 ? 'stone' : (map[i][j] === 3 ? 'pig' : 'ice');
      this.ctx.drawImage(`/images/icon/${imgName}.png`, j * 40, i * 40, 40, 40);
      // 叠加绘制箱子
      if (box[i][j] === 4) {
        this.ctx.drawImage('/images/icon/box.png', j * 40, i * 40, 40, 40);
      }
    }
  }
  // 叠加绘制主角（最后绘制，避免被覆盖）
  this.ctx.drawImage('/images/icon/bird.png', col * 40, row * 40, 40, 40);
  // 渲染画布
  this.ctx.draw();
}
3. 方向键逻辑（pages/game/game.js）
以 “上方向键” 为例，实现主角移动与箱子推动逻辑：
javascript
运行
up: function () {
  if (row > 0) { // 主角不在最顶端
    // 前方无墙无箱子，直接移动
    if (map[row - 1][col] !== 1 && box[row - 1][col] !== 4) {
      row--;
    } 
    // 前方有箱子，判断是否可推动
    else if (box[row - 1][col] === 4 && row - 1 > 0) {
      if (map[row - 2][col] !== 1 && box[row - 2][col] !== 4) {
        box[row - 2][col] = 4; // 箱子上移
        box[row - 1][col] = 0; // 清空原箱子位置
        row--; // 主角上移
      }
    }
    this.drawCanvas(); // 重绘画布
    this.checkWin();   // 判断游戏是否成功
  }
}<img width="258" height="518" alt="image" src="https://github.com/user-attachments/assets/0bd3935b-d6aa-4a3b-a492-304d6b93865d" /><img width="244" height="471" alt="image" src="https://github.com/user-attachments/assets/586f0639-0fc0-48b0-b051-f0f08c417363" /><img width="242" height="476" alt="image" src="https://github.com/user-attachments/assets/2b0c8c0e-3925-4187-8067-6f9796e93ffb" />




