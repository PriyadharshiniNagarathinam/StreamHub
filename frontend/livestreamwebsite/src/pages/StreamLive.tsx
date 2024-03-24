import Peer from "peerjs";
import React, { useRef } from "react";
import { io } from "socket.io-client";
import { Button } from "../../components/ui/button";
// import { useLiveVideos } from "../utils/LiveVideosContext";

const StreamLive: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  // const { liveVideos } = useLiveVideos();
  const liveID = new URLSearchParams(window.location.search).get("id");
  const username = new URLSearchParams(window.location.search).get("name");
  // const description = liveVideos.find(
  //   (video) => video.title === liveID && video.broadcaster === username
  // )?.description;

  console.log("Broadcaster", {
    username: username,
    roomId: liveID,
    // description: description,
  });

  const socket = io("http://localhost:3001");
  const peerClient = new Peer();

  socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("create-room",liveID);
    console.log("Connected as a streamer");
  });

  peerClient.on("open", (streamerId) => {
    console.log("Streamer ID:", streamerId);
    // socket.emit("join-as-streamer", streamerId);
  });

  const getMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    mediaStreamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  getMediaStream();

  socket.on("viewer-connected", (viewerId) => {
    console.log("Viewer connected", viewerId);
    connectToNewViewer(viewerId, mediaStreamRef.current as MediaStream);
  });

  const connectToNewViewer = (viewerId: string, stream: MediaStream) => {
    console.log("peer call is enabled");
    peerClient.call(viewerId, stream);
  };

  const endLive = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    socket.emit("end-live", liveID);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <Button style={{margin:"20px"}} onClick={endLive}>End Live</Button> 
    </div>
  );
};

export default StreamLive;
