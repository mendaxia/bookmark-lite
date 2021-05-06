/*global chrome*/
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // 运行插件运行的页面URL规则
        conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: {} })],
        actions: [new window.chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
