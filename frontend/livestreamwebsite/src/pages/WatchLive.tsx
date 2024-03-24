import { useEffect, useRef } from 'react';
import io from 'socket.io-client'
import Peer from 'peerjs';

const WatchLive = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startWatching();
    return () => {
      stopWatching();
    };
  });

  const startWatching = () => {
    const roomID = new URLSearchParams(window.location.search).get("liveId");
    const username = new URLSearchParams(window.location.search).get("name");

    console.log("Viewer", {
      username: username,
      roomId: roomID,
    });

    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      socket.emit("join-room", roomID, socket.id);
      console.log("Connected as viewer in room " + roomID);
    });

    socket.on("end-live", () => {
      alert("The broadcaster has ended the live stream");
      stopWatching();
    });

    // Create a new Peer object
    const myPeer = new Peer();

    // Event handler for when the Peer connection is open
    myPeer.on("open", (viewerId) => {
      console.log("Viewer ID:", viewerId);
      socket.emit("get-stream", { roomName:roomID, viewerId : viewerId });
    });

    myPeer.on("call", (call) => {
      call.answer();
      console.log("Answering call");
      call.on("stream", (stream) => {
        addVideoStream(stream);
      });
    });

    const addVideoStream = (mediaStream: MediaStream) => {
      mediaStreamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    };
  }
  
  const stopWatching = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }

  return (
    <div>
      <h1>SweatStream.com</h1>
      <main>
        <section className="video-section">
          <video id="videoplayer" ref={videoRef} autoPlay muted></video>
        </section>         
      </main>
    </div>
  );
}

export default WatchLive;