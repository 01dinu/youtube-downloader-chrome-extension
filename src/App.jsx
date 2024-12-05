import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [qualities, setQualities] = useState(['720p', '1080p', '480p']);

  useEffect(() => {
    // Check current YouTube tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url?.includes('youtube.com/watch')) {
        setVideoUrl(tabs[0].url);
      }
    });
  }, []);

  const handleDownload = (quality) => {
    // Send message to background script
    chrome.runtime.sendMessage({
      action: "downloadVideo",
      url: videoUrl,
      quality: quality
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log(response);
      }
    });
  };

  return (
    <div className="w-[400px] p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-red-600">
        YouTube Video Downloader
      </h1>

      <div className="mb-4">
        <input 
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="YouTube Video URL"
          className="w-full p-2 border rounded mb-2"
        />
      </div>

      <div className="space-y-2">
        {qualities.map((quality) => (
          <button
            key={quality}
            onClick={() => handleDownload(quality)}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Download {quality}
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Paste YouTube URL or open a video in your browser</p>
      </div>
    </div>
  );
}

export default App;