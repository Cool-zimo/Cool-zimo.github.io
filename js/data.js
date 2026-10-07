/**
 * 作品数据。
 *
 * 字段约定（缺一个就会在界面上渲染出 undefined）：
 *   name     显示名
 *   icon     emoji
 *   tagline  一句话定位
 *   desc     一段说明
 *   status   右上角状态标签
 *   feats    亮点数组
 *   usage    使用步骤数组（渲染成 步骤 → 步骤）
 *   live     在线地址（没有则为空串）
 *   repo     源码地址
 *   tag      筛选分组
 *   c1 / c2  卡片主色 / 副色
 *   story    来龙去脉：[{k: 小标题, v: 正文}]，渲染成卡片里可折叠的一段
 *            v 里允许 <b> 和 <code>，会按 HTML 渲染（所以用 innerHTML，不是 textContent）
 */
window.PROJECTS = [
  {
    name: 'AnyLearn · 通学万义',
    icon: '🦉',
    tagline: '会跑代码、会记笔记、会催你复习的编程教程',
    desc: '不是一个只能看的教程站。代码在浏览器里真实执行，笔记和进度写进你自己的 GitHub 私有仓库，学完的课按艾宾浩斯曲线自动排进复习队列。25 本教材，中英双语。',
    status: '持续更新',
    feats: [
      'Pyodide 真跑 Python —— 不是简化版，import math 随便用',
      '25 本教材中英双语，从零基础到算法、网页、桌面',
      '每节小测 + 每章大测，后台真跑 assert 判分',
      '艾宾浩斯复习：1→2→4→7→15→30→60 天，没过就退回重来',
      '节奏守护：连续 45 分钟、单日 3 小时自动打断',
      '笔记逐条 LWW 合并，手机和电脑不会互相抹掉',
    ],
    usage: ['打开中文站', '用 GitHub Token 登录', '挑一本书', '边学边跑代码'],
    live: 'https://cool-zimo.github.io/al/zh/',
    repo: 'https://github.com/Cool-zimo/al',
    tag: '学习',
    c1: '#7c5cff', c2: '#22d3ee',
    story: [
      { k: '起因', v: '学编程最大的问题不是看不懂，是记不住。一章看完，下周就忘。' },
      { k: '转折', v: '发现 Pyodide 能在浏览器里跑真正的 Python —— 那就不是"教程"，是能动手的教程。改一行立刻看到结果，import math 随便用。' },
      { k: '最难的', v: '判分引擎只按逗号切参数，不支持空格。因为 <code>hello world -&gt; 5</code> 这种单参数字符串会全废。这是两害相权，最后靠三层兜住：模板统一用逗号、校验器拦截、编辑器当场标黄。' },
      { k: '还有一个坑', v: '随机题光判范围不够 —— <code>return 3</code> 每次都在 1~6 里，但不是随机。所以要检查是否真出现了多种不同的值。' },
    ],
  },
  {
    name: 'GitHub Drive',
    icon: '📁',
    tagline: '把多个 GitHub 仓库合成一个云端硬盘',
    desc: '基于 GitHub API 的虚拟文件系统。关联几个仓库，在一个界面里管理所有文件，完全感觉不到文件其实分散在不同仓库。拖拽上传、一键分享、在线预览，纯前端零后端。',
    status: '可用',
    feats: [
      '虚拟文件系统：多仓库映射成统一路径',
      '拖拽上传，大文件走 Git Data API，单个最大 100MB',
      '一键分享：自动建公开仓库 + Pages 下载页，直接给链接',
      '跨仓库搜索、收藏、最近使用',
      '图片 / 文本 / PDF 在线预览',
      '纯前端无后端，Token 只存在浏览器本地',
    ],
    usage: ['建一个 Token（repo 权限）', '新建或关联仓库', '把文件拖进去', '右键分享拿链接'],
    live: 'https://cool-zimo.github.io/github_drive/',
    repo: 'https://github.com/Cool-zimo/github_drive',
    tag: '工具',
    c1: '#22d3ee', c2: '#34d399',
    story: [
      { k: '起因', v: '发现 GitHub API 其实能当文件系统用：几个仓库能合成一个网盘，用的人根本感觉不到文件分散在不同仓库。' },
      { k: '转折', v: '一开始传 1GB 要 3 小时。查出来是每片固定 5.7 秒 —— 512KB 一片、每片 7 次 API 请求。改成动态分片 + 并发 + 一次提交后：<b>3 小时 14 分 → 2 分 17 秒</b>。' },
      { k: '反直觉的', v: '片数越少越好。64MB 切 4 片比切 16 片快 3.5 倍 —— 每片那 1~2 秒固定开销是按片数付的，而单片变大后传输本身几乎不增加耗时。' },
      { k: '最坑的', v: 'commit 固定 5.7 秒，提交 4 个文件和 64 个文件一样久。所以批次数要尽量少，不是文件数。' },
    ],
  },
  {
    name: '仓鼠 Cangshu',
    icon: '🐹',
    tagline: '囤好你的每一个 GitHub 仓库',
    desc: '纯前端的 GitHub 仓库管理面板。卡片上直接看到可见性、语言、大小、Star、Pages 状态、最新 commit hash；文件树能递归浏览，右键还能直接丢进 vscode.dev 编辑。',
    status: '可用',
    feats: [
      '配置存在你的私有仓库 cangshu-config，换设备自动同步',
      '新建仓库：可选私有、初始化 README、一键开 Pages',
      '改名、切公开/私有、删除（双重确认）',
      '卡片直接显示 Pages 状态和最新 commit hash',
      '文件树递归浏览 + 文本文件预览',
      '右键文件 → 在 vscode.dev 里直接改',
    ],
    usage: ['Token 登录', '把仓库加进来', '卡片上一眼看状态', '右键进 vscode.dev 改'],
    live: 'https://cool-zimo.github.io/cangshu/',
    repo: 'https://github.com/Cool-zimo/cangshu',
    tag: '工具',
    c1: '#fb923c', c2: '#ec4899',
    story: [
      { k: '起因', v: '做着做着仓库越来越多，管理仓库本身也需要一个面板。' },
      { k: '关键决定', v: '配置存在你自己的私有仓库 cangshu-config，换设备自动同步 —— 和其他应用同一套路，不多造一套。' },
      { k: '白捡的', v: '右键文件能在 vscode.dev 里直接改，等于白捡一个在线 IDE，不用自己写编辑器。' },
    ],
  },
  {
    name: 'FaceHub',
    icon: '💬',
    tagline: '像微信一样聊天，数据全在你自己的 GitHub 仓库里',
    desc: '聊天、群聊、朋友圈、小程序，全都有 —— 但没有一行服务端代码。GitHub 只看到密文和公钥，永远看不到明文和私钥。端到端加密是真 E2E：ECDH（P-256）协商密钥，HKDF 派生，AES-GCM 加密，GCM 带认证标签，被篡改直接解密失败。',
    status: '可用',
    feats: [
      '★ 真端到端加密：ECDH P-256 + HKDF + AES-GCM，GitHub 只持有公钥',
      '两人从没"同时在线"也能协商出同一把密钥 —— 靠 ECDH 的数学性质',
      '群聊 = 一个私有仓库，消息走 issue 评论，多人同发不会 409 冲突',
      '朋友圈：点赞评论"一人一个文件"，天然并发安全，不需要 sha',
      '小程序：同域 Pages 应用直接 iframe 进来，令牌同源共享免登录',
      'AI 自动回复（智谱），五重防重复：已处理 id / 并发锁 / 基线时间戳',
    ],
    usage: ['Token 登录', '搜对方的 GitHub 名', '发消息（自动加密）', '群里直接拉人'],
    live: 'https://cool-zimo.github.io/FaceHub/',
    repo: 'https://github.com/Cool-zimo/FaceHub',
    tag: '工具',
    c1: '#07c160', c2: '#22d3ee',
    story: [
      { k: '起因', v: '想看看 GitHub 能不能当聊天服务器用。结论是能。' },
      { k: '最难的', v: '端到端加密。两人从没"同时在线"，不可能像 WhatsApp 那样握手协商密钥。解法：各自把公钥写进仓库，双方用「自己私钥 + 对方公钥」算出<b>完全相同</b>的共享密钥。GitHub 从头到尾只有两个公钥，没有私钥就算不出来。' },
      { k: '踩过的坑', v: '早期文档写的是 X25519，源码实际用 P-256。两者都是 ECDH，但曲线和公钥格式不同 —— 混用的后果是永远协商不出相同密钥，<b>而且不报错，只是解不开</b>。' },
      { k: '两个巧思', v: '群聊 = 一个私有仓库，消息走 issue 评论，多人同时发言天然不会 409；朋友圈点赞"一人一个文件"，各写各的永不冲突。' },
    ],
  },
  {
    name: '粥粥记录 · WEEK OF WEEK',
    icon: '📚',
    tagline: '一周学了几节课，翻一下就知道',
    desc: '一周两节英语、两节数学、一节语文 —— 口头记账谁也记不清，"上上周你欠我一个语文"说过就忘。所以把每节课落到具体日期上，按月看、按周看，欠多少自动算出来。照片存进你自己的 GitHub 私有仓库。',
    status: '可用',
    feats: [
      '月视图：每格直接标"语 / 数 / 英"，没记录显示灰色的"无"',
      '点日期开小窗：勾科目、写笔记、配照片佐证，可多张',
      '周视图：七天卡片 + 进度条 + 往周账本，一眼看清完成和缺口',
      '★ 本周说"还差"，往周才说"欠" —— 周二不该报"欠 1 节"',
      '顶部横幅直接算账："还欠着：语文 欠 1 节"',
      '照片自动压缩后传，存私有仓库 wow-data，不经过任何服务器',
    ],
    usage: ['Token 登录（自动建私有仓库）', '点上学的那天', '勾科目、传照片', '按周看欠了多少'],
    live: 'https://cool-zimo.github.io/week-of-week/',
    repo: 'https://github.com/Cool-zimo/week-of-week',
    tag: '工具',
    c1: '#f59e0b', c2: '#ef4444',
    story: [
      { k: '起因', v: '就是那句话：「上上周你欠我一个语文」。口头记账谁也记不清，说过就忘。' },
      { k: '一个判断', v: '本周不说"欠"。今天才周二就报"欠 1 节"是假警报 —— 本周还有 5 天呢。所以本周用"还差"（中性），往周才用"欠"（红色）。<b>这个区分就是那句话的语义</b>：欠只对过完的周成立。' },
      { k: '后来', v: '加了直接调摄像头拍照 —— 不用切到系统相机 App 拍完再切回来，拍几张笔记要来回切好几次很烦。' },
    ],
  },
  {
    name: 'CoverFit',
    icon: '◧',
    tagline: '图片格式转换与比例裁切，全在本地完成',
    desc: '拖进来一张图，裁成任意比例，导出成想要的格式。11 种常用比例预设，连公众号封面 2.35:1 和小红书 3:4 都有。图片不上传服务器，断网也能用。',
    status: '可用',
    feats: [
      '7 种格式：PNG / JPEG / WebP / GIF / BMP / ICO / AVIF',
      '11 种比例预设，含公众号 2.35:1、小红书 3:4、OG 1.91:1',
      '裁切框可拖可缩放，锁比例时另一边自动跟上',
      '尺寸控制：原尺寸 / 限制最大边 / 指定宽度',
      '一次拖多张，每张保留自己的裁切框，可批量导出',
      'BMP 和 ICO 是自研编码器，不依赖浏览器支持',
    ],
    usage: ['把图拖进去', '选个比例', '拖裁切框调范围', '选格式下载'],
    live: 'https://cool-zimo.github.io/coverfit/',
    repo: 'https://github.com/Cool-zimo/coverfit',
    tag: '工具',
    c1: '#ec4899', c2: '#7c5cff',
    story: [
      { k: '起因', v: '图片裁切和转格式，公众号 2.35:1、小红书 3:4 这些比例每次都要现算。' },
      { k: '最难的', v: 'BMP 和 ICO。浏览器 toBlob 根本不支持导出这两种格式，会<b>静默退化成 PNG</b> —— 不报错，但导出的不是你要的格式。所以自己写了编码器：BMP 的行序是倒着的、每行要 4 字节对齐；ICO 其实是内嵌 PNG。' },
    ],
  },
];

window.MINIS = [
  { group: 'GitHub Drive 生态',
    name: '桌面版（Electron）', icon: '🖥️', desc: '让插件能读写本地文件、执行系统命令，用权限模型兜住风险。',
    live: '', repo: 'https://github.com/Cool-zimo/github-drive-desktop', mc: '#7c5cff' },
  { group: 'GitHub Drive 生态',
    name: 'gdpy（Python 版）', icon: '🐍', desc: 'Tkinter 实现的桌面客户端，Actions 编译成可执行文件，免装 Python 直接跑。',
    live: '', repo: 'https://github.com/Cool-zimo/gdpy', mc: '#34d399' },
  { group: 'GitHub Drive 生态',
    name: '本地服务端', icon: '⚙️', desc: 'Go 写的本地能力平台：CORS 反向代理、B 站视频解析、命令执行。',
    live: '', repo: 'https://github.com/Cool-zimo/github-drive-server', mc: '#fb923c' },
  { group: 'GitHub Drive 生态',
    name: '插件市场', icon: '🧩', desc: '任何人建一个 GD-Plugin-xxx 仓库，插件广场就能搜到你的插件。',
    live: 'https://cool-zimo.github.io/github_drive/', repo: 'https://github.com/Cool-zimo/github_drive_plugins', mc: '#ec4899' },
  { group: 'GitHub Drive 生态',
    name: 'CoolClock 插件', icon: '🕐', desc: '炫酷时钟 —— 第三方插件的参考实现，照着它的结构改就能做自己的。',
    live: '', repo: 'https://github.com/Cool-zimo/GD-Plugin-CoolClock', mc: '#22d3ee' },
  { group: 'GitHub Drive 生态',
    name: '使用文档', icon: '📖', desc: '使用指南 + 插件开发 + API 参考，单独一个 Pages 站。',
    live: 'https://cool-zimo.github.io/github_drive_documentation/', repo: 'https://github.com/Cool-zimo/github_drive_documentation', mc: '#a78bfa' },

  { group: 'FaceHub 生态',
    name: '我的 FaceHub 主页', icon: '👤', desc: 'facehub-cool-zimo —— 个人主页仓库：昵称头像、ECDH 公钥、关注列表、朋友圈帖子。',
    live: '', repo: 'https://github.com/Cool-zimo/facehub-cool-zimo', mc: '#07c160' },

  { group: '学习',
    name: 'Python 从零到进阶', icon: '🐍', desc: 'AnyLearn 的中文单本站，同样能在页面里跑代码、记笔记、排复习。',
    live: 'https://cool-zimo.github.io/python-tutorial/', repo: 'https://github.com/Cool-zimo/python-tutorial', mc: '#34d399' },
  { group: '学习',
    name: '教材内容仓库', icon: '📚', desc: 'AnyLearn 的教材单独存放，避免和主站代码互相干扰。',
    live: '', repo: 'https://github.com/Cool-zimo/al-textbooks', mc: '#7c5cff' },
  { group: '学习',
    name: '第三方书籍索引', icon: '📇', desc: 'al-book 格式规范 + 收录索引，任何人都能提交自己的教材。',
    live: 'https://cool-zimo.github.io/al-docs/', repo: 'https://github.com/Cool-zimo/al-docs', mc: '#22d3ee' },

  { group: '库与组件',
    name: 'tiny-md', icon: '📝', desc: '零依赖 Markdown + LaTeX 渲染器。先转义再生成标签，公式不用打 $ 也能渲染。',
    live: 'https://cool-zimo.github.io/tiny-md/demo.html', repo: 'https://github.com/Cool-zimo/tiny-md', mc: '#22d3ee' },
  { group: '库与组件',
    name: 'fengjson', icon: '📦', desc: 'Python json 标准库的封装，生产级：完善的单元测试、报错与日志。',
    live: '', repo: 'https://github.com/Cool-zimo/fengjson', mc: '#34d399' },
  { group: '库与组件',
    name: 'gitstore.js', icon: '🧰', desc: '把 GitHub 当后端的轮子：自动加解密、自动管理仓库、多账号。从前面几个项目里抽出来的。',
    live: 'https://cool-zimo.github.io/gitstore/', repo: 'https://github.com/Cool-zimo/gitstore', mc: '#a78bfa' },

  { group: '玩票',
    name: '修仙模拟器', icon: '🌿', desc: '纯前端文字修仙游戏，闭关、突破、渡劫，全在浏览器里。',
    live: '', repo: 'https://github.com/Cool-zimo/xiudao', mc: '#a78bfa' },
  { group: '玩票',
    name: 'Cat Sigma', icon: '🐱', desc: 'Cat Sigma GIF 展示页 —— 纯属好玩。',
    live: 'https://cool-zimo.github.io/cat-sigma/', repo: 'https://github.com/Cool-zimo/cat-sigma', mc: '#fb923c' },
];

/**
 * 时间线。日期取自各仓库真实的 created_at（GitHub API 查的），不是编的。
 * 字段：date / title / desc / tags
 */
window.TIMELINE = [
  { date: '2025.10', title: 'fengjson',
    desc: '最早的一个。给 Python 的 json 标准库做了一层封装，带完整单元测试和日志 —— 那时候还在练"怎么写得像生产代码"。',
    tags: ['Python'] },
  { date: '2026.08', title: 'GitHub Drive 起步',
    desc: '发现 GitHub API 其实能当文件系统用：把几个仓库合成一个网盘。随后一周内长出了服务端（Go）、插件市场和第一个插件示例。',
    tags: ['GitHub API', '虚拟文件系统', '插件生态'] },
  { date: '2026.09', title: '仓鼠 Cangshu',
    desc: '管理仓库本身也需要一个面板。卡片上直接显示 Pages 状态和最新 commit hash，右键能把文件丢进 vscode.dev 编辑。',
    tags: ['仓库管理', 'vscode.dev'] },
  { date: '2026.09', title: '桌面版与 tiny-md',
    desc: '网页版碰不到文件系统，于是有了 Electron 版和 Python 版两个桌面客户端。同期写了 tiny-md，一个不依赖任何库的 Markdown + LaTeX 渲染器。',
    tags: ['Electron', 'Tkinter', '零依赖'] },
  { date: '2026.09', title: 'AnyLearn · 通学万义',
    desc: '从 python-tutorial 长出来的教程站。用 Pyodide 让代码在浏览器里真跑，加艾宾浩斯复习调度和节奏守护，后来扩成 25 本教材中英双语。',
    tags: ['Pyodide', '艾宾浩斯', '25 本教材'] },
  { date: '2026.09', title: 'FaceHub',
    desc: '想看看 GitHub 能不能当聊天服务器用。最难的是端到端加密：两人从没同时在线，靠 ECDH 让双方算出同一把密钥 —— GitHub 从头到尾只持有公钥。后来长出了群聊、朋友圈和小程序。',
    tags: ['E2E 加密', 'ECDH P-256', '零服务端'] },
  { date: '2026.10', title: 'CoverFit',
    desc: '图片裁切和转格式。连 BMP 和 ICO 的编码器都是自己写的 —— 浏览器根本不支持导出这两种格式，交给 toBlob 会静默退化成 PNG。',
    tags: ['Canvas', '自研编码器', '纯本地'] },
  { date: '2026.10', title: '粥粥记录 · WEEK OF WEEK',
    desc: '起因是"上上周你欠我一个语文"这种账根本记不清。把每节课落到日期上自动算账，还特意区分了措辞：本周没过完只能说"还差"，整周结束了才叫"欠"。',
    tags: ['日历', '自动算账', '照片佐证'] },
];

window.STATS = [
  { n: 6,  label: '主打作品',   unit: '' },
  { n: 25, label: 'AnyLearn 教材', unit: '' },
  { n: 33, label: '公开仓库',   unit: '' },
  { n: 0,  label: '后端服务器', unit: '' },
];
