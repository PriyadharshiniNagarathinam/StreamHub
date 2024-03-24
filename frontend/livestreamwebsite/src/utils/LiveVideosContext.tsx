import React, { createContext, useState, useContext, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export const LiveVideosContext = createContext(
  {} as {
    liveVideos: any[];
    addLiveVideo: (liveVideo: {
      broadcaster: string;
      title: string;
      description: string;
      viewers: number;
      ended: boolean;
    }) => void;
    updateLiveVideo: (liveVideo: {
      broadcaster: string;
      title: string;
      description: string;
      viewers: number;
      ended: boolean;
    }) => void;
  }
);

export const LiveVideosProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [liveVideos, setLiveVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchLiveVideos = async () => {
      try {
        const response = await fetch("http://localhost:3001/live-videos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLiveVideos(data);
      } catch (error) {
        console.error("Error fetching live videos:", error);
      }
    };

    fetchLiveVideos();

    const roomCreatedListener = () => {
      fetchLiveVideos();
    };

    const roomClosedListener = (title: string) => {
      setLiveVideos((prevLiveVideos) =>
        prevLiveVideos.map((liveVideo) =>
          liveVideo.title === title ? { ...liveVideo, ended: true } : liveVideo
        )
      );
    }

    socket.on("room-created", roomCreatedListener);
    socket.on("room-closed", roomClosedListener);

    return () => {
      socket.off("room-created", roomCreatedListener);
    };

  }, []);

  const addLiveVideo = (liveVideo: {
    broadcaster: string;
    title: string;
    description: string;
    viewers: number;
    ended: boolean;
  }) => {
    const { title, broadcaster, description, viewers, ended } = liveVideo;
    const res = fetch("http://localhost:3001/live-videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        broadcaster: broadcaster,
        description,
        viewers,
        ended,
      }),
    });
  };

  const updateLiveVideo = (liveVideo: {
    broadcaster: string;
    title: string;
    description: string;
    viewers: number;
    ended: boolean;
  }) => {
    const { title, broadcaster, description, viewers, ended } = liveVideo;
    const res = fetch(`http://localhost:3001/live-videos/${title}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        broadcaster: broadcaster,
        description,
        viewers,
        ended,
      }),
    });
  };

  return (
    <LiveVideosContext.Provider value={{ liveVideos, addLiveVideo } as any}>
      {children}
    </LiveVideosContext.Provider>
  );
};

export const useLiveVideos = () => useContext(LiveVideosContext);
