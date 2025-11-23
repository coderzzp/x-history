document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  
  document.getElementById('clearBtn').addEventListener('click', clearHistory);
});

function loadHistory() {
  chrome.storage.local.get({ pageHistory: [] }, (result) => {
    const listElement = document.getElementById('historyList');
    const history = result.pageHistory;

    listElement.innerHTML = ''; 

    if (history.length === 0) {
      showEmptyState(listElement);
      return;
    }

    history.forEach(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url;
      link.target = '_blank';
      
      // --- 数据解析 ---
      let name = 'Unknown';
      let handle = '';
      let content = item.title;

      const titleMatch = item.title.match(/^(.+?)\s\(@([a-zA-Z0-9_]+)\)/);
      if (titleMatch) {
        name = titleMatch[1];
        handle = titleMatch[2];
      } else {
        const urlMatch = item.url.match(/x\.com\/([^\/]+)\/status/);
        if (urlMatch) {
          handle = urlMatch[1];
          name = handle;
        }
      }

      content = content.replace(/(\s·\s|\s\/\s)(Twitter|X)$/, '');

      // --- 头像逻辑 ---
      // 1. 如果有 handle，生成 img 标签。onerror 时隐藏自己，露出底下的 placeholder
      let avatarImgHtml = '';
      if (handle) {
        avatarImgHtml = `<img src="https://unavatar.io/twitter/${handle}" class="avatar-img" onerror="this.style.display='none'">`;
      }
      
      // 2. 总是生成 placeholder，作为垫底
      const initial = (name[0] || '?').toUpperCase();
      const colorClass = `bg-${Math.floor(Math.random() * 6) + 1}`;
      const placeholderHtml = `<div class="avatar-placeholder ${colorClass}">${initial}</div>`;

      link.innerHTML = `
        <div class="avatar-wrapper">
          ${placeholderHtml}
          ${avatarImgHtml}
        </div>
        <div class="content-wrapper">
          <div class="user-row">
            <span class="user-name">${name}</span>
            <span class="user-handle">@${handle}</span>
            <span class="time-dot">·</span>
            <span class="time">${formatTime(item.timestamp)}</span>
          </div>
          <div class="tweet-content">${content}</div>
        </div>
      `;

      li.appendChild(link);
      listElement.appendChild(li);
    });
  });
}

function showEmptyState(container) {
  container.innerHTML = `
    <li class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>暂无浏览记录</span>
    </li>
  `;
}

function clearHistory() {
  if (confirm('确定要清空所有记录吗？')) {
    chrome.storage.local.set({ pageHistory: [] }, () => {
      loadHistory();
    });
  }
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  
  if (isToday) {
    return timeStr;
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
}
