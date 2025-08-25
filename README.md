微信小程序用户信息获取功能（中国海洋大学 - 王书一）
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
运行
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
运行
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

