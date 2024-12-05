import React, { useState } from 'react';

const VideoDownloader = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleDownload = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "downloadVideo",
        url: videoUrl
      });
    });
  };

  return (
    <div className="p-4 w-80 bg-white">
      <h2 className="text-xl font-bold mb-4 text-youtube-red">
        YouTube Video Downloader
      </h2>
      
      <input 
        type="text" 
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste YouTube Video URL"
        className="w-full p-2 border rounded mb-4"
      />
      
      <button 
        onClick={handleDownload}
        className="w-full bg-youtube-red text-white p-2 rounded hover:bg-red-700"
      >
        Download Video
      </button>
      
      <div className="mt-4">
        <h3 className="font-semibold">Quality Options:</h3>
        <div className="flex justify-between">
          <button className="bg-gray-200 p-1 rounded">720p</button>
          <button className="bg-gray-200 p-1 rounded">1080p</button>
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;