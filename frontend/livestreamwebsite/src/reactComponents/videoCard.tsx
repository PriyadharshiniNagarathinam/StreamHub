import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  key: string;
  username: string;
  title: string;
  thumbnail_filename: string;
  id: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  key,
  title,
  username,
  thumbnail_filename,
  id
}) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/thumbnails/${thumbnail_filename}`
        );
        if (response.ok) {
          const data = await response.blob();
          const imageUrl = URL.createObjectURL(data);
          setImageUrl(imageUrl);
        } else {
          console.error("Failed to fetch image");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImageUrl();
  }, []);
  return (
    <Card className="m-3 w-72 p-0">
      <CardContent className="p-0">
        <img
          className="h-52 w-full rounded-t-lg"
          src={imageUrl}
          alt="thumbnail"
        />
        <div className="p-6 pb-2">
          <p className="text-2xl font-bold">{title}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div>
          <div className="flex items-center space-x-2 mt-1 mb-1">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/examples/avatar-1.jpg" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">{username}</p>
          </div>
          <Button
            onClick={() => {
              navigate("/home/video-player?id=" + id);
            }}
          >
            Watch Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
