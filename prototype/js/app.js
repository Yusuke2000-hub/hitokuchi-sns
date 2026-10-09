/* =====================================================
   Hitokuchi プロトタイプ 共通JavaScript
   ===================================================== */

/* === localStorage キー定数 === */
const KEYS = {
  INITIALIZED:     'hk_initialized',
  CURRENT_USER_ID: 'hk_current_user_id',
  USERS:           'hk_users',
  POSTS:           'hk_posts',
  COMMENTS:        'hk_comments',
  LIKES:           'hk_likes',
  FOLLOWS:         'hk_follows',
};

/* === 投稿の初期最大文字数 === */
const POST_MAX_CHARS    = 280;
const PROFILE_MAX_CHARS = 160;
const POSTS_PER_PAGE    = 10;
const POSTS_INCREMENT   = 5;

/* === ダミーデータ === */
const SEED_USERS = [
  { id: 1, username: 'hitokuchi_user', email: 'user@example.com',
    bio: 'Hitokuchiユーザーです。よろしくお願いします！', password: 'password123' },
  { id: 2, username: 'alice', email: 'alice@example.com',
    bio: '食べるの大好き！毎日新しいレシピを試しています。', password: 'password123' },
  { id: 3, username: 'bob', email: 'bob@example.com',
    bio: '東京在住のエンジニア。コーヒーとコードが好き。', password: 'password123' },
  { id: 4, username: 'charlie', email: 'charlie@example.com',
    bio: '旅行と写真が趣味。世界を一口ずつ味わい中。', password: 'password123' },
];

/* ダミー投稿（新着順、id 降順） */
const SEED_POSTS = [
  { id: 18, userId: 2, content: 'アリスの最新投稿！今日はパスタを作りました。', imageUrl: null,  likesCount: 8,  commentsCount: 2, createdAt: '2026-10-09T08:00:00' },
  { id: 17, userId: 1, content: 'おはようございます！今日も一日よろしくお願いします。', imageUrl: null, likesCount: 5,  commentsCount: 1, createdAt: '2026-10-09T07:30:00' },
  { id: 16, userId: 3, content: 'コードレビューを依頼しました。フィードバック待ちです。', imageUrl: null, likesCount: 3,  commentsCount: 0, createdAt: '2026-10-08T22:10:00' },
  { id: 15, userId: 4, content: '旅行写真を整理中。いい思い出がたくさん。', imageUrl: null,  likesCount: 12, commentsCount: 3, createdAt: '2026-10-08T20:00:00' },
  { id: 14, userId: 1, content: 'Hitokuchiプロトタイプが動いてる！テスト投稿です。', imageUrl: null, likesCount: 20, commentsCount: 5, createdAt: '2026-10-08T18:45:00' },
  { id: 13, userId: 2, content: '今日のランチ！手作りサンドイッチ。具材はアボカドとチキン。', imageUrl: null, likesCount: 7,  commentsCount: 1, createdAt: '2026-10-08T13:00:00' },
  { id: 12, userId: 3, content: 'Spring Boot 4.0を試してみました。かなり速い！', imageUrl: null, likesCount: 15, commentsCount: 4, createdAt: '2026-10-08T11:00:00' },
  { id: 11, userId: 4, content: '京都の紅葉シーズンが楽しみ。今年こそ行きたい。', imageUrl: null,  likesCount: 9,  commentsCount: 2, createdAt: '2026-10-07T19:30:00' },
  { id: 10, userId: 1, content: 'SNS開発は楽しいですね。ユーザー体験を考えるのが好きです。', imageUrl: null, likesCount: 6,  commentsCount: 1, createdAt: '2026-10-07T17:00:00' },
  { id: 9,  userId: 2, content: '新しいレシピに挑戦。ガパオライスがうまくできました！', imageUrl: null, likesCount: 11, commentsCount: 3, createdAt: '2026-10-07T12:00:00' },
  { id: 8,  userId: 3, content: 'Reactの最新アップデートを確認しました。', imageUrl: null, likesCount: 4,  commentsCount: 0, createdAt: '2026-10-06T21:00:00' },
  { id: 7,  userId: 4, content: '写真の現像が完了。100枚以上ありました。', imageUrl: null,  likesCount: 18, commentsCount: 2, createdAt: '2026-10-06T16:00:00' },
  { id: 6,  userId: 1, content: '設計書のレビューが終わりました。実装フェーズへ。', imageUrl: null, likesCount: 3,  commentsCount: 0, createdAt: '2026-10-06T14:00:00' },
  { id: 5,  userId: 2, content: 'カフェでリモートワーク中。集中できる環境大事。', imageUrl: null, likesCount: 7,  commentsCount: 1, createdAt: '2026-10-05T10:00:00' },
  { id: 4,  userId: 3, content: 'PostgreSQLのクエリ最適化が面白い。インデックス設計は奥深い。', imageUrl: null, likesCount: 22, commentsCount: 6, createdAt: '2026-10-05T09:00:00' },
  { id: 3,  userId: 4, content: '旅先での一枚。空が澄んでいてきれいでした。', imageUrl: null,  likesCount: 30, commentsCount: 8, createdAt: '2026-10-04T08:00:00' },
  { id: 2,  userId: 2, content: '料理は心のリセットになります。今日は煮込みハンバーグ。', imageUrl: null, likesCount: 14, commentsCount: 2, createdAt: '2026-10-03T19:00:00' },
  { id: 1,  userId: 1, content: 'Hitokuchiへようこそ！一口サイズの言葉を投稿しよう。', imageUrl: null, likesCount: 50, commentsCount: 10, createdAt: '2026-10-01T00:00:00' },
];

const SEED_COMMENTS = [
  { id: 1,  postId: 14, userId: 2, content: 'すごい！動いてるんですね！',             createdAt: '2026-10-08T19:00:00' },
  { id: 2,  postId: 14, userId: 3, content: 'テスト投稿にいいね！',                   createdAt: '2026-10-08T19:30:00' },
  { id: 3,  postId: 14, userId: 4, content: 'お疲れ様です！',                         createdAt: '2026-10-08T20:00:00' },
  { id: 4,  postId: 4,  userId: 1, content: '確かに！実行計画を読むのが楽しくなってきた。', createdAt: '2026-10-05T09:30:00' },
  { id: 5,  postId: 4,  userId: 2, content: 'インデックス設計大事ですよね。',         createdAt: '2026-10-05T10:00:00' },
  { id: 6,  postId: 12, userId: 1, content: 'どう速くなりましたか？',                 createdAt: '2026-10-08T11:30:00' },
  { id: 7,  postId: 12, userId: 2, content: '起動時間が全然違いました！',             createdAt: '2026-10-08T12:00:00' },
  { id: 8,  postId: 1,  userId: 2, content: 'よろしくお願いします！',                 createdAt: '2026-10-01T01:00:00' },
  { id: 9,  postId: 1,  userId: 3, content: '一口...うまいネーミング。',             createdAt: '2026-10-01T02:00:00' },
  { id: 10, postId: 9,  userId: 3, content: 'ガパオおいしそう！レシピ教えて！',       createdAt: '2026-10-07T12:30:00' },
  { id: 11, postId: 17, userId: 3, content: 'おはようございます！',                   createdAt: '2026-10-09T08:00:00' },
  { id: 12, postId: 18, userId: 1, content: 'パスタ美味しそう！',                     createdAt: '2026-10-09T08:10:00' },
];

/* 初期いいね: hitokuchi_user(id=1) が 5件にいいね済み */
const SEED_LIKES = {
  1: [14, 12, 9, 4, 1],
  2: [14, 1, 17],
  3: [18, 14, 9],
  4: [14, 1],
};

/* 初期フォロー: hitokuchi_user(id=1) が alice(2), bob(3) をフォロー */
const SEED_FOLLOWS = {
  1: [2, 3],
  2: [1],
  3: [1, 4],
  4: [2],
};

/* ===================================================
   Storage ユーティリティ
   =================================================== */
const Storage = {
  load(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  /** 初回のみダミーデータを投入する */
  initIfNeeded() {
    if (Storage.load(KEYS.INITIALIZED, false)) return;
    Storage.save(KEYS.USERS,    SEED_USERS);
    Storage.save(KEYS.POSTS,    SEED_POSTS);
    Storage.save(KEYS.COMMENTS, SEED_COMMENTS);
    Storage.save(KEYS.LIKES,    SEED_LIKES);
    Storage.save(KEYS.FOLLOWS,  SEED_FOLLOWS);
    Storage.save(KEYS.INITIALIZED, true);
  },
};

/* ===================================================
   Auth ユーティリティ
   =================================================== */
const Auth = {
  getCurrentUserId() {
    return Storage.load(KEYS.CURRENT_USER_ID, null);
  },
  getCurrentUser() {
    const id = Auth.getCurrentUserId();
    if (!id) return null;
    return Storage.load(KEYS.USERS, []).find(u => u.id === id) || null;
  },
  isLoggedIn() {
    return Auth.getCurrentUserId() !== null;
  },
  login(userId) {
    Storage.save(KEYS.CURRENT_USER_ID, userId);
  },
  logout() {
    localStorage.removeItem(KEYS.CURRENT_USER_ID);
  },
  /** 未ログイン時は login.html へリダイレクト */
  requireAuth() {
    if (!Auth.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },
};

/* ===================================================
   バリデーション
   =================================================== */
const Validate = {
  /** メールアドレス形式チェック */
  email(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  },
  /** 空文字・空白のみでないかチェック */
  required(v) {
    return v.trim().length > 0;
  },
  /** 文字数チェック */
  maxLength(v, max) {
    return v.length <= max;
  },
  /** パスワード8文字以上 */
  password(v) {
    return v.length >= 8;
  },
};

/* ===================================================
   UI ユーティリティ
   =================================================== */
const UI = {
  /** 指定要素にエラーメッセージを表示する */
  showError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
  },
  /** 指定要素のエラーを消す */
  clearError(el) {
    if (!el) return;
    el.textContent = '';
  },
  /** 日時文字列を "YYYY/MM/DD HH:MM" 形式に変換する */
  formatDate(isoStr) {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  },
  /** URL クエリパラメータを取得する */
  getParam(name) {
    return new URLSearchParams(location.search).get(name);
  },
};

/* ===================================================
   アバターレンダリング
   =================================================== */
function renderAvatar(user, sizeClass = 'avatar--md') {
  if (!user) return `<div class="avatar ${sizeClass}" style="background:#9CA3AF">?</div>`;
  const initial = user.username.charAt(0).toUpperCase();
  /* ユーザー名から一定のhue値を算出し常に同じ色を返す */
  const hue = [...user.username].reduce((s, c) => s + c.charCodeAt(0), 0) % 360;
  return `<div class="avatar ${sizeClass}" style="background-color:hsl(${hue},55%,60%)" aria-label="${user.username}のアイコン">${initial}</div>`;
}

/* ===================================================
   文字数カウンター初期化
   =================================================== */
function initCharCounter(textarea, counterEl, max) {
  function update() {
    const len = textarea.value.length;
    counterEl.textContent = `${len} / ${max} 文字`;
    counterEl.classList.toggle('char-counter--over', len > max);
  }
  textarea.addEventListener('input', update);
  update();
}

/* ===================================================
   モーダル（削除確認など）
   =================================================== */
function showModal(message, onConfirm) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return onConfirm(); /* モーダルなければそのまま実行 */
  document.getElementById('modal-message').textContent = message;
  overlay.hidden = false;
  const confirmBtn = document.getElementById('modal-confirm');
  const cancelBtn  = document.getElementById('modal-cancel');
  const close = () => { overlay.hidden = true; };
  confirmBtn.onclick = () => { close(); onConfirm(); };
  cancelBtn.onclick  = close;
  overlay.onclick = e => { if (e.target === overlay) close(); };
}

/* ===================================================
   共通ヘッダー初期化（ユーザー名表示・ログアウト）
   =================================================== */
function initHeader() {
  const profileLink = document.getElementById('header-profile-link');
  const logoutBtn   = document.getElementById('header-logout-btn');
  const user = Auth.getCurrentUser();

  if (user) {
    if (profileLink) {
      profileLink.textContent = `@${user.username}`;
      profileLink.href = `profile.html?username=${encodeURIComponent(user.username)}`;
    }
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        Auth.logout();
        window.location.href = 'index.html';
      });
    }
  } else {
    /* 未ログイン: ユーザー名とログアウトボタンを隠し、ログイン・新規登録リンクを表示 */
    if (profileLink) profileLink.hidden = true;
    if (logoutBtn)   logoutBtn.hidden   = true;
    const nav = logoutBtn ? logoutBtn.closest('nav') : null;
    if (nav) {
      const loginLink = Object.assign(document.createElement('a'), {
        href:        'login.html',
        className:   'btn btn--secondary btn--sm',
        textContent: 'ログイン',
      });
      const registerLink = Object.assign(document.createElement('a'), {
        href:        'register.html',
        className:   'btn btn--primary btn--sm',
        textContent: '新規登録',
      });
      nav.appendChild(loginLink);
      nav.appendChild(registerLink);
    }
  }
}

/* ===================================================
   いいねトグル
   =================================================== */
function toggleLike(postId, btnEl) {
  const userId = Auth.getCurrentUserId();
  if (!userId) { window.location.href = 'login.html'; return; }

  const likes = Storage.load(KEYS.LIKES, {});
  const userLikes = likes[userId] ? [...likes[userId]] : [];
  const idx = userLikes.indexOf(postId);
  const isNowLiked = idx === -1;

  if (isNowLiked) {
    userLikes.push(postId);
  } else {
    userLikes.splice(idx, 1);
  }
  likes[userId] = userLikes;
  Storage.save(KEYS.LIKES, likes);

  /* hk_posts の likesCount を更新する */
  const posts   = Storage.load(KEYS.POSTS, []);
  const postIdx = posts.findIndex(p => p.id === postId);
  if (postIdx !== -1) {
    posts[postIdx].likesCount = Math.max(0, posts[postIdx].likesCount + (isNowLiked ? 1 : -1));
    Storage.save(KEYS.POSTS, posts);
  }

  /* DOM を直接更新する */
  if (btnEl) {
    btnEl.classList.toggle('btn-like--active', isNowLiked);
    const iconEl  = btnEl.querySelector('.btn-like__icon');
    const countEl = btnEl.querySelector('.like-count');
    if (iconEl)  iconEl.textContent  = isNowLiked ? '♥' : '♡';
    if (countEl) {
      const current = parseInt(countEl.textContent, 10) || 0;
      countEl.textContent = current + (isNowLiked ? 1 : -1);
    }
  }
}

/* ===================================================
   投稿カードHTMLを生成する
   =================================================== */
function renderPostCard(post, currentUserId) {
  const users    = Storage.load(KEYS.USERS, []);
  const likes    = Storage.load(KEYS.LIKES, {});
  const author   = users.find(u => u.id === post.userId);
  if (!author) return '';

  const userLikes = (likes[currentUserId] || []);
  const isLiked   = userLikes.includes(post.id);
  const likeClass = isLiked ? 'btn-like--active' : '';

  const imageHtml = post.imageUrl
    ? `<img class="post-card__image" src="${post.imageUrl}" alt="投稿画像">`
    : '';

  return `
    <div class="post-card" data-post-id="${post.id}">
      <div class="post-card__header">
        <a href="profile.html?username=${encodeURIComponent(author.username)}" onclick="event.stopPropagation()">
          ${renderAvatar(author, 'avatar--md')}
        </a>
        <div class="post-card__meta">
          <a class="post-card__username" href="profile.html?username=${encodeURIComponent(author.username)}" onclick="event.stopPropagation()">@${author.username}</a>
          <div class="post-card__date">${UI.formatDate(post.createdAt)}</div>
        </div>
      </div>
      <div class="post-card__content">${escapeHtml(post.content)}</div>
      ${imageHtml}
      <div class="post-card__actions">
        <button class="btn-like ${likeClass}" data-like-post-id="${post.id}" onclick="event.stopPropagation()">
          <span class="btn-like__icon">${isLiked ? '♥' : '♡'}</span>
          <span class="like-count">${post.likesCount}</span>
        </button>
        <a class="btn-comment" href="post-detail.html?id=${post.id}" onclick="event.stopPropagation()">
          💬 <span>${post.commentsCount}</span>
        </a>
      </div>
    </div>
  `;
}

/** XSS対策: HTMLエスケープ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ===================================================
   ページ別初期化関数
   =================================================== */

/* --- S-01: ログイン --- */
function initLogin() {
  if (Auth.isLoggedIn()) {
    window.location.replace('index.html');
    return;
  }
  const form       = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passInput  = document.getElementById('password');
  const emailErr   = document.getElementById('email-error');
  const passErr    = document.getElementById('password-error');
  const globalErr  = document.getElementById('global-error');

  form.addEventListener('submit', e => {
    e.preventDefault();
    UI.clearError(emailErr);
    UI.clearError(passErr);
    UI.clearError(globalErr);

    let ok = true;
    if (!Validate.required(emailInput.value)) {
      UI.showError(emailErr, 'メールアドレスは必須です');
      ok = false;
    } else if (!Validate.email(emailInput.value)) {
      UI.showError(emailErr, 'メールアドレスの形式が正しくありません');
      ok = false;
    }
    if (!Validate.required(passInput.value)) {
      UI.showError(passErr, 'パスワードは必須です');
      ok = false;
    }
    if (!ok) return;

    const users = Storage.load(KEYS.USERS, []);
    const user  = users.find(u => u.email.toLowerCase() === emailInput.value.trim().toLowerCase()
                                   && u.password === passInput.value);
    if (!user) {
      UI.showError(globalErr, 'メールアドレスまたはパスワードが正しくありません');
      return;
    }
    Auth.login(user.id);
    window.location.href = 'index.html';
  });
}

/* --- S-02: 新規登録 --- */
function initRegister() {
  if (Auth.isLoggedIn()) {
    window.location.replace('index.html');
    return;
  }
  const form          = document.getElementById('register-form');
  const usernameInput = document.getElementById('username');
  const emailInput    = document.getElementById('email');
  const passInput     = document.getElementById('password');
  const usernameErr   = document.getElementById('username-error');
  const emailErr      = document.getElementById('email-error');
  const passErr       = document.getElementById('password-error');

  form.addEventListener('submit', e => {
    e.preventDefault();
    UI.clearError(usernameErr);
    UI.clearError(emailErr);
    UI.clearError(passErr);

    let ok = true;
    if (!Validate.required(usernameInput.value)) {
      UI.showError(usernameErr, 'ユーザー名は必須です'); ok = false;
    }
    if (!Validate.required(emailInput.value)) {
      UI.showError(emailErr, 'メールアドレスは必須です'); ok = false;
    } else if (!Validate.email(emailInput.value)) {
      UI.showError(emailErr, 'メールアドレスの形式が正しくありません'); ok = false;
    }
    if (!Validate.required(passInput.value)) {
      UI.showError(passErr, 'パスワードは必須です'); ok = false;
    } else if (!Validate.password(passInput.value)) {
      UI.showError(passErr, 'パスワードは 8 文字以上で入力してください'); ok = false;
    }
    if (!ok) return;

    const users = Storage.load(KEYS.USERS, []);
    if (users.find(u => u.username.toLowerCase() === usernameInput.value.trim().toLowerCase())) {
      UI.showError(usernameErr, 'このユーザー名はすでに使用されています'); return;
    }
    if (users.find(u => u.email.toLowerCase() === emailInput.value.trim().toLowerCase())) {
      UI.showError(emailErr, 'このメールアドレスはすでに登録されています'); return;
    }

    const newUser = {
      id:       (Math.max(...users.map(u => u.id), 0) + 1),
      username: usernameInput.value.trim(),
      email:    emailInput.value.trim().toLowerCase(),
      bio:      '',
      password: passInput.value,
    };
    users.push(newUser);
    Storage.save(KEYS.USERS, users);
    Auth.login(newUser.id);
    window.location.href = 'index.html';
  });
}

/* --- S-03: タイムライン --- */
function initTimeline() {
  initHeader();

  const listEl       = document.getElementById('timeline-list');
  const loadMoreBtn  = document.getElementById('load-more-btn');
  const tabs         = document.querySelectorAll('.tab');
  const fab          = document.querySelector('.fab');
  const currentUser  = Auth.getCurrentUser();
  let   activeTab    = 'all';
  let   displayCount = POSTS_PER_PAGE;

  /* ログイン状態でFABを制御する */
  if (fab) fab.classList.toggle('hidden', !Auth.isLoggedIn());

  /* タブ切替（フォロー中タブは未ログイン時にログイン画面へ） */
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab === 'following' && !Auth.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
      }
      tabs.forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      activeTab    = tab.dataset.tab;
      displayCount = POSTS_PER_PAGE;
      renderList();
    });
  });

  function getFilteredPosts() {
    const posts   = Storage.load(KEYS.POSTS, []);
    const follows = Storage.load(KEYS.FOLLOWS, {});
    if (activeTab === 'following') {
      if (!currentUser) return [];
      const following = follows[currentUser.id] || [];
      return posts.filter(p => following.includes(p.userId));
    }
    return posts;
  }

  function renderList() {
    const posts    = getFilteredPosts();
    const userId   = Auth.getCurrentUserId();
    const visible  = posts.slice(0, displayCount);

    if (visible.length === 0) {
      const msg = activeTab === 'following'
        ? 'フォロー中のユーザーの投稿がありません。'
        : 'まだ投稿がありません。';
      listEl.innerHTML = `<div class="empty-state"><div class="empty-state__icon">📭</div><div class="empty-state__text">${msg}</div></div>`;
    } else {
      listEl.innerHTML = visible.map(p => renderPostCard(p, userId)).join('');
    }

    loadMoreBtn.hidden = displayCount >= posts.length;

    /* 投稿カードクリックで詳細画面へ */
    listEl.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', () => {
        window.location.href = `post-detail.html?id=${card.dataset.postId}`;
      });
    });

    /* いいねボタン */
    listEl.querySelectorAll('[data-like-post-id]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!Auth.isLoggedIn()) { window.location.href = 'login.html'; return; }
        toggleLike(parseInt(btn.dataset.likePostId), btn);
      });
    });
  }

  /* 「もっと見る」ボタン */
  loadMoreBtn.addEventListener('click', () => {
    displayCount += POSTS_INCREMENT;
    renderList();
  });

  renderList();
}

/* --- S-04: 投稿詳細 --- */
function initPostDetail() {
  initHeader();
  const postId = parseInt(UI.getParam('id'));
  if (!postId) { window.location.href = 'index.html'; return; }

  const posts    = Storage.load(KEYS.POSTS, []);
  const post     = posts.find(p => p.id === postId);
  if (!post) {
    document.getElementById('post-area').innerHTML =
      '<div class="empty-state"><div class="empty-state__text">投稿が見つかりません。</div></div>';
    return;
  }

  const users      = Storage.load(KEYS.USERS, []);
  const author     = users.find(u => u.id === post.userId);
  const currentUser = Auth.getCurrentUser();
  const currentId  = Auth.getCurrentUserId();
  const likes      = Storage.load(KEYS.LIKES, {});
  const userLikes  = likes[currentId] || [];
  const isLiked    = userLikes.includes(post.id);
  const isOwner    = currentId === post.userId;

  /* 投稿本体 */
  const postArea = document.getElementById('post-area');
  postArea.innerHTML = `
    <div style="padding:16px">
      <div class="post-card__header">
        <a href="profile.html?username=${encodeURIComponent(author.username)}">
          ${renderAvatar(author, 'avatar--md')}
        </a>
        <div class="post-card__meta">
          <a class="post-card__username" href="profile.html?username=${encodeURIComponent(author.username)}">@${author.username}</a>
          <div class="post-card__date">${UI.formatDate(post.createdAt)}</div>
        </div>
      </div>
      <p style="font-size:17px;line-height:1.7;margin:12px 0;white-space:pre-wrap;word-break:break-word">${escapeHtml(post.content)}</p>
      ${post.imageUrl ? `<img class="post-card__image" src="${post.imageUrl}" alt="投稿画像" style="margin-bottom:12px">` : ''}
      <div class="post-card__actions" style="margin-bottom:${isOwner ? '12px' : '0'}">
        <button class="btn-like ${isLiked ? 'btn-like--active' : ''}" id="detail-like-btn" data-like-post-id="${post.id}">
          <span class="btn-like__icon">${isLiked ? '♥' : '♡'}</span>
          <span class="like-count">${post.likesCount}</span>
        </button>
        <span class="btn-comment" style="cursor:default">💬 <span>${post.commentsCount}</span></span>
      </div>
      ${isOwner ? `
        <div style="display:flex;gap:8px">
          <a href="post-edit.html?id=${post.id}" class="btn btn--secondary btn--sm">編集</a>
          <button id="delete-post-btn" class="btn btn--danger btn--sm">削除</button>
        </div>` : ''}
    </div>
  `;

  /* いいねボタン */
  const likeBtn = document.getElementById('detail-like-btn');
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      if (!Auth.isLoggedIn()) { window.location.href = 'login.html'; return; }
      toggleLike(post.id, likeBtn);
    });
  }

  /* 削除ボタン */
  const deleteBtn = document.getElementById('delete-post-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      showModal('この投稿を削除しますか？', () => {
        const all = Storage.load(KEYS.POSTS, []);
        Storage.save(KEYS.POSTS, all.filter(p => p.id !== post.id));
        window.location.href = 'index.html';
      });
    });
  }

  /* コメント一覧 */
  renderComments(postId, currentId, users);

  /* コメント送信フォーム */
  const commentForm  = document.getElementById('comment-form');
  const commentInput = document.getElementById('comment-input');
  if (commentForm && currentId) {
    commentForm.classList.remove('hidden');
    commentForm.addEventListener('submit', e => {
      e.preventDefault();
      const content = commentInput.value.trim();
      if (!content) return;
      const comments = Storage.load(KEYS.COMMENTS, []);
      const newComment = {
        id:        (Math.max(...comments.map(c => c.id), 0) + 1),
        postId:    post.id,
        userId:    currentId,
        content,
        createdAt: new Date().toISOString(),
      };
      comments.push(newComment);
      Storage.save(KEYS.COMMENTS, comments);
      /* コメント数を更新 */
      const posts2 = Storage.load(KEYS.POSTS, []);
      const idx    = posts2.findIndex(p => p.id === post.id);
      if (idx !== -1) {
        posts2[idx].commentsCount = (posts2[idx].commentsCount || 0) + 1;
        Storage.save(KEYS.POSTS, posts2);
      }
      commentInput.value = '';
      renderComments(post.id, currentId, users);
    });
  }
}

function renderComments(postId, currentUserId, users) {
  const comments    = Storage.load(KEYS.COMMENTS, []).filter(c => c.postId === postId);
  const commentList = document.getElementById('comment-list');
  const countEl     = document.getElementById('comment-count');
  if (countEl) countEl.textContent = comments.length;
  if (!commentList) return;

  if (comments.length === 0) {
    commentList.innerHTML = '<div class="empty-state" style="padding:24px"><div class="empty-state__text">まだコメントはありません。</div></div>';
    return;
  }

  commentList.innerHTML = comments.map(c => {
    const u = users.find(u => u.id === c.userId);
    if (!u) return '';
    const canDelete = currentUserId === c.userId;
    return `
      <div class="comment" data-comment-id="${c.id}">
        <div class="comment__header">
          <a href="profile.html?username=${encodeURIComponent(u.username)}">${renderAvatar(u, 'avatar--sm')}</a>
          <div class="comment__meta">
            <a class="comment__username" href="profile.html?username=${encodeURIComponent(u.username)}">@${u.username}</a>
            <span class="comment__date">${UI.formatDate(c.createdAt)}</span>
          </div>
          ${canDelete ? `<button class="btn btn--danger btn--sm" style="margin-left:auto" onclick="deleteComment(${c.id},${postId})">削除</button>` : ''}
        </div>
        <div class="comment__body">${escapeHtml(c.content)}</div>
      </div>
    `;
  }).join('');
}

function deleteComment(commentId, postId) {
  showModal('このコメントを削除しますか？', () => {
    const comments = Storage.load(KEYS.COMMENTS, []);
    Storage.save(KEYS.COMMENTS, comments.filter(c => c.id !== commentId));
    const posts = Storage.load(KEYS.POSTS, []);
    const idx   = posts.findIndex(p => p.id === postId);
    if (idx !== -1 && posts[idx].commentsCount > 0) {
      posts[idx].commentsCount--;
      Storage.save(KEYS.POSTS, posts);
    }
    const users = Storage.load(KEYS.USERS, []);
    renderComments(postId, Auth.getCurrentUserId(), users);
  });
}

/* --- S-05: 投稿作成 --- */
function initPostNew() {
  if (!Auth.requireAuth()) return;
  initHeader();

  const textarea   = document.getElementById('post-content');
  const counter    = document.getElementById('char-counter');
  const submitBtn  = document.getElementById('submit-btn');
  const cancelBtn  = document.getElementById('cancel-btn');
  const imageInput = document.getElementById('image-input');
  const preview    = document.getElementById('image-preview');
  const removeImg  = document.getElementById('remove-image');
  const contentErr = document.getElementById('content-error');
  let   imageDataUrl = null;

  initCharCounter(textarea, counter, POST_MAX_CHARS);

  cancelBtn.addEventListener('click', () => history.back());

  /* 画像選択 */
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      imageDataUrl = e.target.result;
      preview.querySelector('img').src = imageDataUrl;
      preview.hidden = false;
    };
    reader.readAsDataURL(file);
  });

  removeImg.addEventListener('click', () => {
    imageDataUrl = null;
    imageInput.value = '';
    preview.hidden = true;
  });

  submitBtn.addEventListener('click', () => {
    UI.clearError(contentErr);
    const content = textarea.value.trim();
    if (!Validate.required(content)) {
      UI.showError(contentErr, '投稿内容を入力してください'); return;
    }
    if (!Validate.maxLength(content, POST_MAX_CHARS)) {
      UI.showError(contentErr, `${POST_MAX_CHARS} 文字以内で入力してください`); return;
    }

    const posts   = Storage.load(KEYS.POSTS, []);
    const newPost = {
      id:            (Math.max(...posts.map(p => p.id), 0) + 1),
      userId:        Auth.getCurrentUserId(),
      content,
      imageUrl:      imageDataUrl,
      likesCount:    0,
      commentsCount: 0,
      createdAt:     new Date().toISOString(),
    };
    posts.unshift(newPost); /* 先頭に追加（新着順） */
    Storage.save(KEYS.POSTS, posts);
    window.location.href = 'index.html';
  });
}

/* --- S-06: 投稿編集 --- */
function initPostEdit() {
  if (!Auth.requireAuth()) return;
  initHeader();

  const postId = parseInt(UI.getParam('id'));
  if (!postId) { window.location.href = 'index.html'; return; }

  const posts   = Storage.load(KEYS.POSTS, []);
  const post    = posts.find(p => p.id === postId);
  if (!post || post.userId !== Auth.getCurrentUserId()) {
    window.location.href = 'index.html'; return;
  }

  const textarea   = document.getElementById('post-content');
  const counter    = document.getElementById('char-counter');
  const submitBtn  = document.getElementById('submit-btn');
  const cancelBtn  = document.getElementById('cancel-btn');
  const imageInput = document.getElementById('image-input');
  const preview    = document.getElementById('image-preview');
  const removeImg  = document.getElementById('remove-image');
  const contentErr = document.getElementById('content-error');
  let   imageDataUrl = post.imageUrl;

  textarea.value = post.content;
  initCharCounter(textarea, counter, POST_MAX_CHARS);

  if (post.imageUrl) {
    preview.querySelector('img').src = post.imageUrl;
    preview.hidden = false;
  }

  cancelBtn.addEventListener('click', () => {
    window.location.href = `post-detail.html?id=${postId}`;
  });

  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      imageDataUrl = e.target.result;
      preview.querySelector('img').src = imageDataUrl;
      preview.hidden = false;
    };
    reader.readAsDataURL(file);
  });

  removeImg.addEventListener('click', () => {
    imageDataUrl = null;
    imageInput.value = '';
    preview.hidden = true;
  });

  submitBtn.addEventListener('click', () => {
    UI.clearError(contentErr);
    const content = textarea.value.trim();
    if (!Validate.required(content)) {
      UI.showError(contentErr, '投稿内容を入力してください'); return;
    }
    if (!Validate.maxLength(content, POST_MAX_CHARS)) {
      UI.showError(contentErr, `${POST_MAX_CHARS} 文字以内で入力してください`); return;
    }

    const idx = posts.findIndex(p => p.id === postId);
    if (idx !== -1) {
      posts[idx].content  = content;
      posts[idx].imageUrl = imageDataUrl;
      Storage.save(KEYS.POSTS, posts);
    }
    window.location.href = `post-detail.html?id=${postId}`;
  });
}

/* --- S-07: プロフィール --- */
function initProfile() {
  initHeader();

  const username  = UI.getParam('username');
  const users     = Storage.load(KEYS.USERS, []);
  const user      = users.find(u => u.username === username);
  const currentId = Auth.getCurrentUserId();

  if (!user) {
    document.getElementById('profile-area').innerHTML =
      '<div class="empty-state" style="padding:48px 16px"><div class="empty-state__text">ユーザーが見つかりません。</div></div>';
    return;
  }

  const follows   = Storage.load(KEYS.FOLLOWS, {});
  const posts     = Storage.load(KEYS.POSTS, []);
  const userPosts = posts.filter(p => p.userId === user.id);

  /* フォロー中数・フォロワー数 */
  const followingIds  = follows[user.id] || [];
  const followerIds   = Object.entries(follows)
    .filter(([, ids]) => ids.includes(user.id))
    .map(([id]) => parseInt(id));

  const isSelf     = currentId === user.id;
  const isFollowing = currentId ? (follows[currentId] || []).includes(user.id) : false;

  const profileArea = document.getElementById('profile-area');
  profileArea.innerHTML = `
    <div class="profile-header">
      <div class="profile-header__top">
        ${renderAvatar(user, 'avatar--xl')}
        <div class="profile-header__info">
          <div class="profile-header__username">@${escapeHtml(user.username)}</div>
          ${user.bio ? `<div class="profile-header__bio">${escapeHtml(user.bio)}</div>` : ''}
        </div>
      </div>
      <div class="profile-stats">
        <div class="profile-stat">
          <span class="profile-stat__value">${userPosts.length}</span>
          <span class="profile-stat__label">投稿</span>
        </div>
        <div class="profile-stat">
          <a href="following.html?username=${encodeURIComponent(user.username)}">
            <span class="profile-stat__value">${followingIds.length}</span>
            <span class="profile-stat__label">フォロー中</span>
          </a>
        </div>
        <div class="profile-stat">
          <a href="followers.html?username=${encodeURIComponent(user.username)}">
            <span class="profile-stat__value">${followerIds.length}</span>
            <span class="profile-stat__label">フォロワー</span>
          </a>
        </div>
      </div>
      <div class="profile-header__actions">
        ${isSelf
          ? `<a href="profile-edit.html" class="btn btn--outline">プロフィールを編集</a>`
          : currentId
            ? `<button id="follow-btn" class="btn ${isFollowing ? 'btn--outline btn--following' : 'btn--primary'}">${isFollowing ? 'フォロー中' : 'フォロー'}</button>`
            : ''}
      </div>
    </div>
  `;

  /* フォロー/フォロー解除 */
  const followBtn = document.getElementById('follow-btn');
  if (followBtn) {
    followBtn.addEventListener('click', () => {
      const followsNow = Storage.load(KEYS.FOLLOWS, {});
      const myFollows  = followsNow[currentId] ? [...followsNow[currentId]] : [];
      const idx        = myFollows.indexOf(user.id);
      if (idx === -1) {
        myFollows.push(user.id);
        followBtn.textContent = 'フォロー中';
        followBtn.classList.replace('btn--primary', 'btn--outline');
        followBtn.classList.add('btn--following');
      } else {
        myFollows.splice(idx, 1);
        followBtn.textContent = 'フォロー';
        followBtn.classList.replace('btn--outline', 'btn--primary');
        followBtn.classList.remove('btn--following');
      }
      followsNow[currentId] = myFollows;
      Storage.save(KEYS.FOLLOWS, followsNow);
    });
  }

  /* 投稿一覧 */
  const postList = document.getElementById('post-list');
  if (postList) {
    if (userPosts.length === 0) {
      postList.innerHTML = '<div class="empty-state" style="padding:32px 16px"><div class="empty-state__text">まだ投稿がありません。</div></div>';
    } else {
      postList.innerHTML = userPosts.map(p => renderPostCard(p, currentId)).join('');
      postList.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => {
          window.location.href = `post-detail.html?id=${card.dataset.postId}`;
        });
      });
      postList.querySelectorAll('[data-like-post-id]').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          if (!Auth.isLoggedIn()) { window.location.href = 'login.html'; return; }
          toggleLike(parseInt(btn.dataset.likePostId), btn);
        });
      });
    }
  }
}

/* --- S-11: プロフィール編集 --- */
function initProfileEdit() {
  if (!Auth.requireAuth()) return;
  initHeader();

  const currentUser    = Auth.getCurrentUser();
  const usernameInput  = document.getElementById('username');
  const bioTextarea    = document.getElementById('bio');
  const bioCounter     = document.getElementById('bio-counter');
  const usernameErr    = document.getElementById('username-error');
  const bioErr         = document.getElementById('bio-error');
  const saveBtn        = document.getElementById('save-btn');
  const cancelBtn      = document.getElementById('cancel-btn');
  const avatarPreview  = document.getElementById('avatar-preview');

  if (!currentUser) return;

  /* 現在の値を事前入力する */
  usernameInput.value = currentUser.username;
  bioTextarea.value   = currentUser.bio || '';
  if (avatarPreview) avatarPreview.innerHTML = renderAvatar(currentUser, 'avatar--xl');
  initCharCounter(bioTextarea, bioCounter, PROFILE_MAX_CHARS);

  cancelBtn.addEventListener('click', () => {
    window.location.href = `profile.html?username=${encodeURIComponent(currentUser.username)}`;
  });

  saveBtn.addEventListener('click', () => {
    UI.clearError(usernameErr);
    UI.clearError(bioErr);

    const newUsername = usernameInput.value.trim();
    const newBio      = bioTextarea.value.trim();
    let ok = true;

    if (!Validate.required(newUsername)) {
      UI.showError(usernameErr, 'ユーザー名は必須です'); ok = false;
    }
    if (!Validate.maxLength(newBio, PROFILE_MAX_CHARS)) {
      UI.showError(bioErr, `自己紹介は ${PROFILE_MAX_CHARS} 文字以内で入力してください`); ok = false;
    }
    if (!ok) return;

    const users = Storage.load(KEYS.USERS, []);
    /* 自分以外に同じユーザー名が存在しないか確認する */
    if (users.find(u => u.id !== currentUser.id && u.username.toLowerCase() === newUsername.toLowerCase())) {
      UI.showError(usernameErr, 'このユーザー名はすでに使用されています'); return;
    }

    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) {
      users[idx].username = newUsername;
      users[idx].bio      = newBio;
      Storage.save(KEYS.USERS, users);
    }
    window.location.href = `profile.html?username=${encodeURIComponent(newUsername)}`;
  });
}

/* --- S-08: ユーザー検索 --- */
function initSearch() {
  initHeader();

  const searchInput = document.getElementById('search-input');
  const searchBtn   = document.getElementById('search-btn');
  const resultList  = document.getElementById('result-list');
  const users       = Storage.load(KEYS.USERS, []);

  function renderResults(keyword) {
    const q = keyword.trim().toLowerCase();
    const filtered = q ? users.filter(u => u.username.toLowerCase().includes(q)) : users;
    if (filtered.length === 0) {
      resultList.innerHTML = `<div class="empty-state"><div class="empty-state__text">「${escapeHtml(keyword)}」に一致するユーザーは見つかりませんでした。</div></div>`;
    } else {
      resultList.innerHTML = filtered.map(u => `
        <a class="user-card" href="profile.html?username=${encodeURIComponent(u.username)}">
          ${renderAvatar(u, 'avatar--md')}
          <div class="user-card__info">
            <div class="user-card__username">@${escapeHtml(u.username)}</div>
            <div class="user-card__bio">${escapeHtml((u.bio || '').slice(0, 50))}</div>
          </div>
        </a>
      `).join('');
    }
  }

  /* 初期表示（全ユーザー） */
  renderResults('');

  searchBtn.addEventListener('click', () => renderResults(searchInput.value));
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') renderResults(searchInput.value); });
  searchInput.addEventListener('input', () => renderResults(searchInput.value));
}

/* --- S-09: フォロー中一覧 --- */
function initFollowing() {
  initHeader();
  const username = UI.getParam('username');
  const users    = Storage.load(KEYS.USERS, []);
  const user     = users.find(u => u.username === username);
  if (!user) return;

  const follows     = Storage.load(KEYS.FOLLOWS, {});
  const followingIds = follows[user.id] || [];
  const followingUsers = users.filter(u => followingIds.includes(u.id));

  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = `@${user.username} のフォロー中`;

  renderUserList('user-list', followingUsers);
}

/* --- S-10: フォロワー一覧 --- */
function initFollowers() {
  initHeader();
  const username = UI.getParam('username');
  const users    = Storage.load(KEYS.USERS, []);
  const user     = users.find(u => u.username === username);
  if (!user) return;

  const follows   = Storage.load(KEYS.FOLLOWS, {});
  const followerIds = Object.entries(follows)
    .filter(([, ids]) => ids.includes(user.id))
    .map(([id]) => parseInt(id));
  const followerUsers = users.filter(u => followerIds.includes(u.id));

  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = `@${user.username} のフォロワー`;

  renderUserList('user-list', followerUsers);
}

function renderUserList(containerId, userList) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (userList.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state__text">まだユーザーがいません。</div></div>';
    return;
  }
  el.innerHTML = userList.map(u => `
    <a class="user-card" href="profile.html?username=${encodeURIComponent(u.username)}">
      ${renderAvatar(u, 'avatar--md')}
      <div class="user-card__info">
        <div class="user-card__username">@${escapeHtml(u.username)}</div>
        <div class="user-card__bio">${escapeHtml((u.bio || '').slice(0, 50))}</div>
      </div>
    </a>
  `).join('');
}

/* ===================================================
   初期化処理（ページロード時）
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ダミーデータを初回のみ投入する */
  Storage.initIfNeeded();

  /* data-page 属性でページを判別してルーティングする */
  const page = document.body.dataset.page;
  const initializers = {
    'login':        initLogin,
    'register':     initRegister,
    'timeline':     initTimeline,
    'post-detail':  initPostDetail,
    'post-new':     initPostNew,
    'post-edit':    initPostEdit,
    'profile':      initProfile,
    'profile-edit': initProfileEdit,
    'search':       initSearch,
    'following':    initFollowing,
    'followers':    initFollowers,
  };
  if (initializers[page]) initializers[page]();
});
