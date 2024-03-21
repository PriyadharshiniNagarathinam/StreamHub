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
// console.log(videoData);

// export const watchNowVideos: VidoeCardProps[] = [
//   {
//     title: "React Rendezvous",
//     creater: "Ethan Byte",
//     thumbnail:
//       "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
//   },
//   {
//     title: "Async Awakenings",
//     creater: "Nina Netcode",
//     thumbnail:
//       "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
//   },
//   {
//     title: "The Art of Reusability",
//     creater: "Lena Logic",
//     thumbnail:
//       "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
//   },
//   {
//     title: "Stateful Symphony",
//     creater: "Beth Binary",
//     thumbnail:
//       "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
//   },
//   {
//     title: "Stateful Symphony",
//     creater: "Beth Binary",
//     thumbnail:
//       "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
//   },
// ];

// export const recommendedVideos: VidoeCardProps[] = [
//   {
//     title: "Thinking Components",
//     creater: "Lena Logic",
//     thumbnail:
//       "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
//   },
//   {
//     title: "Functional Fury",
//     creater: "Beth Binary",
//     thumbnail:
//       "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
//   },
//   {
//     title: "React Rendezvous",
//     creater: "Ethan Byte",
//     thumbnail:
//       "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
//   },
//   {
//     title: "Stateful Symphony",
//     creater: "Beth Binary",
//     thumbnail:
//       "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
//   },
//   {
//     title: "Async Awakenings",
//     creater: "Nina Netcode",
//     thumbnail:
//       "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
//   },
//   {
//     title: "The Art of Reusability",
//     creater: "Lena Logic",
//     thumbnail:
//       "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
//   },
// ];
