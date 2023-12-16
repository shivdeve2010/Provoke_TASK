import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [videos, setVideos] = useState([]);
  const apiKey = 'AIzaSyA0vcf3Zfkn1gGd7IqnOcSpYoSceClWNvk'; // Replace with your API key
  const channelId = ''; // Replace with your channel ID

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&channelId=${channelId}&type=video&maxResults=10`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchVideos();
  }, [apiKey, channelId]);

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.id.videoId} className="video-item">
          <iframe
            title={video.snippet.title}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.description}</p>
          {/* Render other video details as needed */}
        </div>
      ))}
    </div>
  );
}

export default App;