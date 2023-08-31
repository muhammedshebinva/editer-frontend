


import React, { useEffect,useState } from 'react';

function App() {
  const [responseText, setResponseText] = useState('');
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/');
      const data = await response.text();
      setResponseText(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // useEffect(() => {
  //   async function fetchVideo() {
  //     try {
  //       const response = await fetch('http://localhost:3001/getVideo');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch video');
  //       }
  //       const blob = await response.blob();
  //       const videoUrl = URL.createObjectURL(blob);
  //       setVideoUrl(videoUrl);
  //     } catch (error) {
  //       console.error('Error fetching video:', error);
  //     }
  //   }

  //   fetchVideo();
  // }, []);
  const fetchVideo = async () => {
    try {
      const response = await fetch('http://localhost:3001/getVideo');
      if (response.ok) {
        const videoBlob = await response.blob();
        const videoObjectURL = URL.createObjectURL(videoBlob);
        setVideoUrl(videoObjectURL);
      } else {
        console.error('Failed to fetch video');
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>Response from server: {responseText}</p>

      <h1>File Upload Example</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <button onClick={fetchVideo}>Fetch Video</button>
      {videoUrl && (
        <video controls width="640" height="360">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
          </video>
          )}
  
    </div>
  );
}

export default App;

