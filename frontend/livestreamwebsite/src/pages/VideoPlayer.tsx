import React from "react";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";

const VideoPlayer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const url = `http://localhost:3001/videos/${id}/stream`;

  return (
    <div>
      <ReactPlayer
        url={url}
        controls={true}
        playing={true}
      />
    </div>
  );
};

export default VideoPlayer;
