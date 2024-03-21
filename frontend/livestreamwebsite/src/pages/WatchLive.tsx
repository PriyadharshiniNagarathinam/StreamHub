import { useEffect, useRef } from 'react';
import io from 'socket.io-client'

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
    const roomID = new URLSearchParams(window.location.search).get("id");
    const username = new URLSearchParams(window.location.search).get("name");

    console.log("Viewer", {
      username: username,
      roomId: roomID,
    });

    const socket = io("http://localhost:3001");
    const viewerPeer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

    socket.on("connect", () => {
      socket.emit("viewer", roomID, username);
      console.log("Connected as a viewer");
    });

    viewerPeer.addEventListener("track", async (event) => {
      console.log("track event", event);
      const [remoteStream] = event.streams;
      addVideoStream(remoteStream);
    });

    // peer.on("open", (id) => {
    //   console.log("Viewer ID: ", id);
    // });

    // peer.on("call", (call) => {
    //   call.answer();
    //   console.log("Answering call");
    //   call.on("stream", (stream) => {
    //     addVideoStream(stream);
    //   });
    // });

    const addVideoStream = (mediaStream: MediaStream) => {
      mediaStreamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    }
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