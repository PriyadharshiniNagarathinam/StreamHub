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

    socket.on("room-created", roomCreatedListener);

    return () => {
      socket.off("room-created", roomCreatedListener);
    };

  }, []);

  const addLiveVideo = (liveVideo: {
    broadcaster: string;
    title: string;
    description: string;
  }) => {
    // console.log(liveVideo);
    // setLiveVideos([...liveVideos, liveVideo]);
    // console.log("Live Videos", liveVideos);
    const {title, broadcaster, description} = liveVideo;
    const res = fetch("http://localhost:3001/live-videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        broadcaster: broadcaster,
        description,
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
