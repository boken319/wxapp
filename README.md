欢迎来到我的项目，这是中国海洋大学的移动软件开发课程的实验项目

移动软件开发课程一：微信小程序用户信息获取功能（中国海洋大学 - 王书一）
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
