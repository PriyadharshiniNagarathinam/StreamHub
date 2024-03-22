import React, { createContext, useState, useContext } from "react";

export const LiveVideosContext = createContext(
    {} as {
        liveVideos: any[];
        addLiveVideo: (liveVideo: { broadcaster: string, title: string, description: string }) => void;
    }
);

export const LiveVideosProvider = ({ children }: { children: React.ReactNode }) => {
  const [liveVideos, setLiveVideos] = useState<any[]>([]);

    const addLiveVideo = (liveVideo: { broadcaster: string, title: string, description: string }) => {
        console.log(liveVideo);
        setLiveVideos([...liveVideos, liveVideo]);
        console.log("Live Videos", liveVideos);
    };

    return (
        <LiveVideosContext.Provider value={{ liveVideos, addLiveVideo } as any}>
            {children}
        </LiveVideosContext.Provider>
    );
};

export const useLiveVideos = () => useContext(LiveVideosContext);
