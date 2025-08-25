Page({
  data: {
    name: 'Hello World',  // 默认昵称
    touxiang: '/images/default-avatar.jpg',  // 默认头像
    showNicknameModal: false,  // 控制昵称弹窗显示
    tempNickname: ''           // 临时存储输入的昵称
  },

  // 选择头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      touxiang: avatarUrl
    });
  },

  // 打开获取昵称弹窗
  openNicknameModal() {
    this.setData({
      showNicknameModal: true,
      tempNickname: this.data.name
    }, () => {
      // 弹窗打开后自动聚焦输入框，触发微信昵称选择
      this.setData({
        focusInput: true
      });
    });
  },

  // 关闭昵称弹窗
  closeNicknameModal() {
    this.setData({
      showNicknameModal: false,
      focusInput: false
    });
  },

  // 监听昵称输入变化
  onNicknameChange(e) {
    const nickName = e.detail.value;
    this.setData({
      tempNickname: nickName
    });
  },

  // 确认设置昵称
  confirmNickname() {
    if (this.data.tempNickname.trim()) {
      this.setData({
        name: this.data.tempNickname.trim(),
        showNicknameModal: false,
        focusInput: false
      });
    } else {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 1500
      });
    }
  }
})
