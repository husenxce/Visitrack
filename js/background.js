// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
    //Open the current website visit statistics.
    chrome.tabs.create({
        url: chrome.extension.getURL('views/stats.html')
    });
});

// React when the user visits a url.
chrome.history.onVisited.addListener(function(history) {

    let url = history.url;

    //Get visit counts map from storage.
    chrome.storage.sync.get(['visitCount'], function(items) {

        let visitCount = items.visitCount;
        // Check if the url already exists and increment the visit count.
        if (visitCount[url] !== undefined) {
            let count = visitCount[url];
            visitCount[url] = ++count;
        }
        // If the url doesn't already exist then add to the map and set visit count to 1. 
        else {
            visitCount[url] = 1;
        }


        // Update it using the Chrome extension storage API.
        chrome.storage.sync.set({
                'visitCount': visitCount
            },
            function() {
                console.log('Data updated.');
            });
    });
});

// React when the extension is first installed.
chrome.runtime.onInstalled.addListener(function() {
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({
        'visitCount': {}
    }, function() {
        console.log('Data initialized.');
    });
});