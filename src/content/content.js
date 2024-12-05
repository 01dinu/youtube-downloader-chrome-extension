function extractVideoDetails() {
  // Try to extract video details from the current YouTube page
  const videoTitle = document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const videoUrl = window.location.href;

  return { 
    title: videoTitle, 
    url: videoUrl 
  };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoDetails") {
    const details = extractVideoDetails();
    sendResponse(details);
  }
});

// Optional: Inject download button into YouTube page
function injectDownloadButton() {
  const container = document.querySelector('#top-row.style-scope.ytd-watch-metadata');
  
  if (container && !document.querySelector('#custom-download-btn')) {
    const button = document.createElement('button');
    button.textContent = 'Download';
    button.id = 'custom-download-btn';
    button.className = 'style-scope ytd-watch-metadata';
    
    button.addEventListener('click', () => {
      const details = extractVideoDetails();
      chrome.runtime.sendMessage({
        action: "downloadVideo",
        url: details.url,
        title: details.title
      });
    });

    container.appendChild(button);
  }
}

// Run on page load
injectDownloadButton();