let activeDomain = "";
let startTime = null;

function getDomain(url) {
    try {
        return new URL(url).hostname;
    } catch (error) {
        return null;
    }
}

chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.url) {
            handleTabChange(tab.url);
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab && tab.url && changeInfo.status === "complete") {
        handleTabChange(tab.url);
    }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        saveTimeSpent();
    } else {
        chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
            if (tabs[0] && tabs[0].url) {
                handleTabChange(tabs[0].url);
            }
        });
    }
});

function handleTabChange(newUrl) {
    saveTimeSpent();

    activeDomain = getDomain(newUrl);
    startTime = new Date().getTime();
}

function saveTimeSpent() {
    if (!activeDomain || !startTime) return;

    const endTime = new Date().getTime();
    const timeSpent = (endTime - startTime) / 1000;

    chrome.storage.local.get(["activityData"], (result) => {
        const data = result.activityData || {};
        data[activeDomain] = (data[activeDomain] || 0) + timeSpent;

        chrome.storage.local.set({ activityData: data });
    });

    activeDomain = "";
    startTime = null;
}
