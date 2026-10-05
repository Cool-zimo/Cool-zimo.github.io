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
  { date: '2026.10', title: 'CoverFit',
    desc: '图片裁切和转格式。连 BMP 和 ICO 的编码器都是自己写的 —— 浏览器根本不支持导出这两种格式，交给 toBlob 会静默退化成 PNG。',
    tags: ['Canvas', '自研编码器', '纯本地'] },
];

window.STATS = [
  { n: 4,  label: '主打作品',   unit: '' },
  { n: 25, label: 'AnyLearn 教材', unit: '' },
  { n: 35, label: '公开仓库',   unit: '' },
  { n: 0,  label: '后端服务器', unit: '' },
];
