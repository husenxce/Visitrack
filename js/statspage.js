window.document.addEventListener("DOMContentLoaded",function populateTable(){
    //Get visit counts map from storage.
    chrome.storage.sync.get(['visitCount'], function(items) {
    	let visitCount = items.visitCount;
    	let urls = Object.keys(visitCount);
    	let tbody = document.querySelector('.stats-info-table > table > tbody');
    	let rows = '';

    	for(let i=0; i<urls.length; i++){
    		rows+= `<tr><td title=${urls[i]}>${urls[i]}</td><td>${visitCount[urls[i]]}</td></tr>`;
    	}

    	tbody.innerHTML = rows;
    });
});