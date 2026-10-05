# Cool-zimo · 作品集

**https://cool-zimo.github.io/**

展示做过的东西：AnyLearn 通学万义、GitHub Drive、仓鼠 Cangshu、CoverFit，
外加一些小工具和实验品。每个都有介绍、用法步骤和直达链接。

## 页面构成

- **Hero** —— 一句话说清这些项目的共同点，四个统计数字
- **主打作品** —— 四张大卡：定位、说明、亮点、怎么用、打开/源码按钮
- **还有这些** —— 九张小卡，点整张卡即跳转
- **关于** —— 为什么都是"纯前端 + 数据归你自己"这个路子

## 实现

纯静态，零依赖，无构建步骤。两个 JS 文件：

```
js/data.js   作品数据（改这里就能增删项目）
js/app.js    渲染 + 交互
```

### 视觉

深色底 + 彩色光晕，光晕会缓慢漂移；背景有粒子连线；卡片带渐变描边和跟手光晕；
滚动进场、统计数字滚动、顶部进度条、吸顶玻璃导航。

**关动画**：系统开了「减少动效」时，所有动画（含粒子）自动关闭，排版不受影响。

### 两条硬约束

1. **数据缺字段不能渲染出 `undefined`**。启动时 `audit()` 自检一遍，
   缺字段直接在控制台报错。渲染全走 `textContent` / `createElement`，不拼 HTML 字符串。
2. **链接不能是空的**。所有卡片至少有一个真实 `http` 链接；
   没有在线站的就指向源码，按钮文案也相应变成「看源码」。

## 改数据

编辑 `js/data.js`：

```js
window.PROJECTS = [{
  name: '项目名',
  icon: '🦉',
  tagline: '一句话定位',
  desc: '一段说明',
  status: '可用',
  feats: ['亮点 1', '亮点 2'],
  usage: ['第一步', '第二步'],
  live: 'https://...',   // 在线地址，没有就留空串
  repo: 'https://github.com/...',
  tag: '分组',
  c1: '#7c5cff', c2: '#22d3ee',   // 卡片主色 / 副色
}];
```

必填：项目的 `name / icon / tagline / desc / status / live / repo / tag`、
`feats`、`usage`；小卡的 `name / icon / desc / repo`。缺了控制台会报。

## 改完记得查链接

```bash
GH_TOKEN=xxx python3 tools/check-links.py
```

查主页上每个 Pages 链接**是不是真打得开**。

为什么需要它：只查 Pages 的 `status == built` 是不够的 —— 构建成功和根路径有内容是两回事。
有一个文档仓库根目录只有 `README.md`，没有 `index.html` / `index.md`，
Jekyll 没有首页可渲染，站点根路径照样 404，而 Pages 状态明明白白是 `built`。
用户点开才发现。

所以这个脚本查的是：那个 URL 落到仓库里的那个文件，到底存在不存在。

## 本地跑

```bash
python3 -m http.server 8000
```
