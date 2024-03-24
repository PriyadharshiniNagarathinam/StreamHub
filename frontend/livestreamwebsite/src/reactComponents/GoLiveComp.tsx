import React, { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../utils/AuthContext";
import { LiveVideosContext } from "../utils/LiveVideosContext";
import { io } from "socket.io-client";

const GoLiveComp: React.FC = () => {
  const [liveName, setLiveName] = useState<string>("");
  const [liveDesc, setLiveDesc] = useState<string>("");
  const navigate = useNavigate();
  const { username } = useAuth();
  const addLiveVideo = useContext(LiveVideosContext).addLiveVideo;
  
  const goLive = () => {
    console.log("clicked");
    addLiveVideo({ broadcaster: username, title: liveName, description: liveDesc });
    navigate(`/stream-live?name=${username}&id=${liveName}`);
  }

  return (
    <Dialog>
      <DialogTrigger>Go Live</DialogTrigger>
      <DialogContent className="w-screen max-w-[80%] max-h-[80%]">
        <DialogTitle>Go Live</DialogTitle>
        <DialogDescription>
          <div className="mb-2">
            <Label htmlFor="liveName" className="text-md text-bold">
              Title
            </Label>
            <Input
              id="liveName"
              autoFocus
              className="mt-3"
              onChange={(e) => setLiveName(e.target.value)}
            />
          </div>
          <Label htmlFor="livedesc" className="text-md text-bold">
            Description
          </Label>
          <Input
            className="mt-3"
            id="livedesc"
            onChange={(e) => setLiveDesc(e.target.value)}
          ></Input>
        </DialogDescription>
      <Button onClick={()=>goLive()}>Go Live</Button>
      </DialogContent>
    </Dialog>
  );
};
export default GoLiveComp;
