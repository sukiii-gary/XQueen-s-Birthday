# 给你的生日礼物

直接双击 `index.html` 即可打开，无需安装依赖或联网。手机端可在后续部署为网页后通过链接打开。

## 修改专属内容

编辑 `config.js`：`recipient` 为称呼，`opening` 为开场文案，`birthdayWish` 为吹灭蜡烛后的祝福，`letter` 为贺卡段落，`signature` 为落款，`ending` 为收尾文案。

相册已加入过去一年的 12 张合照。`photos` 文件夹中的 JPEG 是从原始 HEIC 生成的网页副本，保留正确方向，最长边不超过 1920 像素；源目录中的原文件未修改。编辑 `config.js` 的 `photos`，可调整 `src`（照片路径）、`caption`（卡片标题）、`memory`（放大预览中的回忆文案）与 `alt`（照片描述）。留空时显示占位卡片。内容只在本地读取，不上传照片。照片按照提供的回忆顺序展示，不代表拍摄时间顺序。

## 操作

依次打开礼物、许愿吹蜡烛、阅读贺卡、浏览相册、进入收尾。上方或左侧章节按钮可返回已经开启的章节。“再看一遍”会重置流程。相册支持左右方向键切换、Esc 关闭；所有按钮均支持 Tab 和 Enter 操作。系统开启减少动态效果时，网页会关闭装饰动画和彩纸效果。

初版不包含背景音乐、麦克风吹气或在线发布。

## 角色装饰素材

背景、礼物、蛋糕、贺卡和收尾已加入一二布布与线条小狗贴纸。图片保存在 `assets/characters`，无需在线加载；`config.js` 的 `characters` 可替换各个角色图片。

检索来源：一二布布来自 [SigStick 表情包合集](https://www.sigstick.com/pack/irFMWa1ye0sK9ltDe1PX-%E4%B8%80%E4%BA%8C%E5%B8%83%E5%B8%83)，线条小狗来自 [Moonlab_studio 的 LINE STORE 贴图页](https://store.line.me/emojishop/product/666177dd45171c6ef90f8160/zh-Hant)。各图片的原始地址记录在 `assets/characters/sources.json`；这些来源记录不代表取得了商业使用授权。
