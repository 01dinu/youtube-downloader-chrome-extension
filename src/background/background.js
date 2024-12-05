// Listen for download requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadVideo") {
    // Placeholder for video download logic
    console.log('Download requested:', request.url, request.quality);
    
    // Example: Basic download attempt (Note: This is a simplified version)
    chrome.downloads.download({
      url: request.url,
      filename: `youtube_video_${request.quality}.mp4`
    }, (downloadId) => {
      sendResponse({ 
        status: 'Download started', 
        downloadId: downloadId 
      });
    });

    // Return true to indicate we wish to send a response asynchronously
    return true;
  }
});