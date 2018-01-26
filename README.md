# wechatbot

本项目是基于 wechaty 的一个微信机器人项目，可以用来自动回复消息，建群，踢人，简化管理员操作。

## 安装

需要 docker，和 docker 安装包 zixia/wechaty

## 启动

```
 docker run -ti --volume="$(pwd)":/bot --rm zixia/wechaty mybot.js
```
