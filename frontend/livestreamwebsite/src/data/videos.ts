import axios from "axios";

export interface VidoeCardProps {
  id: string;
  filename: string;
  path: string;
  processed_path: string;
  thumbnail_path: string;
  username: string;
  title: string;
}

async function getVideoData(): Promise<VidoeCardProps[]> {
  try {
    const response = await axios.get("http://localhost:3001/videos");
    return response.data;
  } catch (error) {
    console.error("Error retrieving video data:", error);
    return [];
  }
}

// Call the function to retrieve video data
export const videoData = await getVideoData();
export const recommendedVideos = videoData.slice(0,5);
export const watchNowVideos = videoData.slice(0, 5);
