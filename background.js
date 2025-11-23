const MAX_HISTORY_ITEMS = 50;

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 只要 URL 发生变化，或者页面加载完成
  if (changeInfo.url || changeInfo.status === 'complete') {
    const url = tab.url;
    
    // 简单的过滤：必须是 http/https
    if (!url || !url.startsWith('http')) {
      return;
    }

    // 针对 Twitter/X 的详情页过滤
    // 匹配模式: https://x.com/username/status/123456...
    const isTwitterDetail = url.includes('/status/');

    if (isTwitterDetail) {
      // 在 SPA (单页应用) 中，URL 变化时 Title 可能还没更新
      // 所以我们延迟 2 秒再保存，尽量获取到正确的 Title
      setTimeout(() => {
        chrome.tabs.get(tabId, (updatedTab) => {
          // 再次确认 URL 没变（防止用户快速切换走了）
          if (chrome.runtime.lastError || !updatedTab || updatedTab.url !== url) return;

          addToHistory({
            url: updatedTab.url,
            title: updatedTab.title,
            timestamp: new Date().getTime()
          });
        });
      }, 2000);
    }
  }
});

function addToHistory(newItem) {
  chrome.storage.local.get({ pageHistory: [] }, (result) => {
    let history = result.pageHistory;

    // 1. 去重
    history = history.filter(item => item.url !== newItem.url);

    // 2. 添加新记录
    history.unshift(newItem);

    // 3. 限制最大数量
    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS);
    }

    // 4. 保存
    chrome.storage.local.set({ pageHistory: history }, () => {
      console.log('记录已更新:', newItem.title);
    });
  });
}
