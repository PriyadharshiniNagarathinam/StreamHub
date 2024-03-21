import React, { useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { io } from "socket.io-client";
import Peer from "peerjs";

const StreamLive: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const peerConnections: { [viewerId: string]: RTCPeerConnection } = {};
  const connectedViewers: { [viewerId: string]: string } = {};

  useEffect(() => {
    startRecording();
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    const broadcastID = new URLSearchParams(window.location.search).get("id");
    const username = new URLSearchParams(window.location.search).get("name");
    const roomURL = window.location.origin + "/home?id=" + broadcastID;

    console.log("Broadcaster", {
      username: username,
      roomId: broadcastID,
      viewer: roomURL,
    });

    const socket = io("http://localhost:3001");
    // const peer = new Peer();

    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("broadcaster", broadcastID);
      console.log("Connected as a streamer");
    });

    // peer.on("open", (id) => {
    //   console.log("Streamer ID: ", id);
    // });

    // socket.on("viewer-connected", (viewerId) => {
    //   console.log("Viewer connected: ", viewerId);
    //   peer.call(viewerId, mediaStreamRef.current!);
    // });

    // ! -> non-null assertion operator
    socket.on("viewer", (viewerId, iceServers, username) => {
      console.log(
        "a new view is joined the stream",
        viewerId,
        iceServers,
        username
      );
      const newPeerConn = new RTCPeerConnection(iceServers);
      peerConnections[viewerId] = newPeerConn;
      addViewer(viewerId, username);
      mediaStreamRef.current!.getTracks().forEach((track) => {
        newPeerConn.addTrack(track, mediaStreamRef.current!);
      });
    });

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const addViewer = (id: string, username: string) => {
    connectedViewers[id] = username;
    console.log("ConnectedViewers", {
      connected: username,
      connectedViewers: connectedViewers,
    });
  };
  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      {/* <Button onClick={startRecording}>Go Live</Button>
            <Button onClick={stopRecording}>Stop</Button> */}
    </div>
  );
};

export default StreamLive;
