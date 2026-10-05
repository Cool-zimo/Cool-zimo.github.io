/**
 * 页面的所有交互。
 *
 * 三条硬约束：
 *  1. 数据缺字段时绝不能渲染出 undefined —— 上一版在别的项目上栽过两次。
 *  2. 所有地址必须真的是链接，不能是空 href（点了没反应比不显示更糟）。
 *  3. 关掉动画（prefers-reduced-motion）后页面仍要完整可用。
 */
(function () {
  'use strict';

  const $ = s => document.querySelector(s);
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };

  const reduce = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ================= 自检：数据缺字段立刻报 ================= */
  function audit() {
    const bad = [];
    window.PROJECTS.forEach((p, i) => {
      ['name', 'icon', 'tagline', 'desc', 'status', 'live', 'repo', 'tag'].forEach(k => {
        if (!p[k]) bad.push('PROJECTS[' + i + '](' + (p.name || '?') + ') 缺 ' + k);
      });
      if (!Array.isArray(p.feats) || !p.feats.length) bad.push('PROJECTS[' + i + '] feats 为空');
      if (!Array.isArray(p.usage) || !p.usage.length) bad.push('PROJECTS[' + i + '] usage 为空');
    });
    window.MINIS.forEach((m, i) => {
      ['name', 'icon', 'desc', 'repo'].forEach(k => {
        if (!m[k]) bad.push('MINIS[' + i + '](' + (m.name || '?') + ') 缺 ' + k);
      });
    });
    window.STATS.forEach((s, i) => {
      if (s.n == null) bad.push('STATS[' + i + '] 缺 n');
      if (!s.label) bad.push('STATS[' + i + '] 缺 label');
    });
    if (bad.length) console.error('[home] 数据字段缺失：\n  ' + bad.join('\n  '));
    return bad;
  }

  /* ================= 统计 ================= */
  function renderStats() {
    const box = $('#stats');
    if (!box) return;
    box.innerHTML = '';
    window.STATS.forEach(s => {
      const wrap = el('div');
      const dd = el('dd');
      dd.innerHTML = '<span class="num" data-to="' + (Number(s.n) || 0) + '">0</span>' +
                     (s.unit ? '<small>' + s.unit + '</small>' : '');
      wrap.appendChild(el('dt', null, s.label));
      wrap.appendChild(dd);
      box.appendChild(wrap);
    });
  }

  function countUp() {
    document.querySelectorAll('#stats .num').forEach(node => {
      const to = Number(node.dataset.to) || 0;
      if (!to || reduce) { node.textContent = String(to); return; }
      const dur = 1100, t0 = performance.now();
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        node.textContent = String(Math.round(to * eased));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ================= 作品卡片 ================= */
  const ICON_GH = '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">' +
    '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49' +
    '-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82' +
    '.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15' +
    '-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 ' +
    '2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 ' +
    '1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>';
  const ICON_GO = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" ' +
    'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 17 17 7M9 7h8v8"/></svg>';

  function renderCards(filter) {
    const box = $('#cards');
    const empty = $('#empty');
    if (!box) return;
    const list = window.PROJECTS.filter(p => !filter || filter === '全部' || p.tag === filter);
    box.innerHTML = '';

    list.forEach((p, idx) => {
      const card = el('div', 'card reveal');
      card.style.setProperty('--c1', p.c1 || '#7c5cff');
      card.style.setProperty('--c2', p.c2 || '#ec4899');
      card.style.transitionDelay = (idx * 0.07) + 's';

      const top = el('div', 'card-top');
      const titles = el('div', 'card-titles');
      titles.appendChild(el('h3', null, p.name));
      titles.appendChild(el('div', 'card-tagline', p.tagline));
      top.appendChild(el('div', 'card-icon', p.icon));
      top.appendChild(titles);
      top.appendChild(el('span', 'status', p.status));

      const ul = el('ul', 'feat');
      (p.feats || []).forEach(f => ul.appendChild(el('li', null, f)));

      const usage = el('div', 'usage');
      usage.appendChild(el('h4', null, '怎么用'));
      const steps = el('div', 'steps');
      (p.usage || []).forEach((s, i) => {
        if (i) steps.appendChild(el('span', 'arrow', '→'));
        steps.appendChild(el('span', 'step', s));
      });
      usage.appendChild(steps);

      const acts = el('div', 'card-acts');
      if (p.live) {
        const a = el('a', 'cbtn go');
        a.href = p.live; a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = '打开使用 ' + ICON_GO;
        acts.appendChild(a);
      }
      if (p.repo) {
        const a = el('a', 'cbtn');
        a.href = p.repo; a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = ICON_GH + ' 看源码';
        acts.appendChild(a);
      }

      card.appendChild(top);
      card.appendChild(el('p', 'card-desc', p.desc));
      card.appendChild(ul);
      card.appendChild(usage);
      card.appendChild(acts);
      box.appendChild(card);
    });

    if (empty) empty.hidden = list.length > 0;
    observeReveal(box);
    bindGlow(box, '.card');
  }

  /* ================= 小卡片 ================= */
  function renderMinis() {
    const box = $('#minis');
    if (!box) return;
    box.innerHTML = '';
    window.MINIS.forEach((m, idx) => {
      const card = el('div', 'mini reveal' + (m.live ? '' : ' nolink'));
      card.style.setProperty('--mc', m.mc || '#7c5cff');
      card.style.transitionDelay = (idx * 0.05) + 's';

      const top = el('div', 'mini-top');
      top.appendChild(el('div', 'mini-ico', m.icon));
      top.appendChild(el('h3', null, m.name));
      card.appendChild(top);
      card.appendChild(el('p', null, m.desc));

      const link = el('a', 'mini-link');
      link.href = m.live || m.repo;
      link.target = '_blank'; link.rel = 'noopener';
      link.textContent = m.live ? '打开 →' : '看源码 →';
      card.appendChild(link);

      box.appendChild(card);
    });
    observeReveal(box);
    bindGlow(box, '.mini');
  }

  /* ================= 筛选 ================= */
  function renderFilters() {
    const box = $('#filters');
    if (!box) return;
    const tags = ['全部'];
    window.PROJECTS.forEach(p => { if (p.tag && tags.indexOf(p.tag) < 0) tags.push(p.tag); });
    box.innerHTML = '';
    tags.forEach((t, i) => {
      const b = el('button', 'fchip' + (i === 0 ? ' on' : ''), t);
      b.type = 'button';
      b.onclick = () => {
        box.querySelectorAll('.fchip').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        renderCards(t);
      };
      box.appendChild(b);
    });
  }

  /* ================= 进场 ================= */
  let io = null;
  function observeReveal(root) {
    const items = (root || document).querySelectorAll('.reveal:not(.in)');
    if (!items.length) return;
    if (reduce) { items.forEach(n => n.classList.add('in')); return; }
    if (!io) {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    }
    items.forEach(n => io.observe(n));
  }

  /* ================= 跟手光晕 ================= */
  function bindGlow(root, sel) {
    if (reduce) return;
    root.querySelectorAll(sel).forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ================= 背景粒子 ================= */
  function initStars() {
    const cv = $('#stars');
    if (!cv || reduce) return;
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, pts = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(80, Math.round(w * h / 18000));
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
          r: Math.random() * 1.4 + .5,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,.40)';
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 13000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(170,190,255,' + (0.15 * (1 - d2 / 13000)) + ')';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(frame);
  }

  /* ================= 进度条 + 吸顶 ================= */
  function initScroll() {
    const bar = $('#progress');
    const nav = $('#nav');
    let raf = 0;
    function upd() {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0).toFixed(2) + '%';
      if (nav) nav.classList.toggle('stuck', window.scrollY > 24);
    }
    window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    upd();
  }

  /* ================= 启动 ================= */
  function init() {
    audit();
    renderStats();
    renderFilters();
    renderCards('全部');
    renderMinis();
    observeReveal(document);
    initStars();
    initScroll();
    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
    setTimeout(countUp, 450);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  window.__home = { audit };
})();
