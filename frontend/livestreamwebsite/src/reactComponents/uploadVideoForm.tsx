import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import React from "react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../utils/AuthContext";

const UploadVideoForm: React.FC = () => {
  const { username } = useAuth();
  const handleUpload = async () => {
    const videoFile = document.getElementById("video") as HTMLInputElement;
    const thumbnailFile = document.getElementById(
      "thumbnail"
    ) as HTMLInputElement;
    const titleInput = document.getElementById("title") as HTMLInputElement;

    if (videoFile && thumbnailFile && titleInput) {
      const formData = new FormData();

      if (videoFile.files) {
        formData.append("video", videoFile.files[0]);
      }
      if (thumbnailFile.files) {
        formData.append("thumbnail", thumbnailFile.files[0]);
      }
      formData.append("title", titleInput.value);
      formData.append("username", username);

      try {
        const response = await fetch("http://localhost:3001/videos", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Success");
          alert("Video uploaded successfully")
        } else {
          console.log("Error");
          alert("Error uploading video");
        }
      } catch (error) {
        console.error(error);
        alert("Error uploading video");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Upload Video</DialogTrigger>
      <DialogContent className="w-screen max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Upload a Video</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="grid w-full items-center gap-1.5 m-3 p-3 ml-0 pl-0">
            <div className="mb-3">
              <Label className="font-bold text-lg" htmlFor="title">
                Title
              </Label>
              <Input className="mt-3 w-full" id="title" type="text" />
            </div>
            <div className="mb-3">
              <Label className="font-bold text-lg" htmlFor="thumbnail">
                Thumbnail
              </Label>
              <Input className="mt-3 w-full" id="thumbnail" type="file" />
            </div>
            <div className="mb-3">
              <Label className="font-bold text-lg" htmlFor="video">
                Video
              </Label>
              <Input className="mt-3 w-full" id="video" type="file" />
            </div>
            <div className="mb-3">
              <Button
                onClick={handleUpload}
                className="mt-4 h-[50px] w-40 text-xl"
              >
                Upload
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
export default UploadVideoForm;
