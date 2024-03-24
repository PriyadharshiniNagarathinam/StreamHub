import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

interface VideoCardProps {
  id: string;
  filename: string;
  path: string;
  processed_path: string;
  thumbnail_path: string;
  username: string;
  title: string;
}

export const VideosContext = createContext(
    {} as {
        videosData: VideoCardProps[];
        addVideo: (video: VideoCardProps) => void;
    }
);

// Create the provider component
export const VideosProvider = ({ children }: { children: React.ReactNode }) => {
  const [videosData, setVideosData] = useState<VideoCardProps[]>([]);
  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        const response = await fetch("http://localhost:3001/videos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setVideosData(data);
      } catch (error) {
        console.error("Error fetching live videos:", error);
      }
    };

      fetchVideosData();
      
      socket.on('video-uploaded', () => {
          console.log("HeeeeBird");
        fetchVideosData();
      });

  }, []);

    const addVideo = (video: VideoCardProps) => {
    setVideosData((prevVideos) => [...prevVideos, video]);
    };

  return (
    <VideosContext.Provider value={{ videosData, addVideo }}>
      {children}
    </VideosContext.Provider>
  );
};
