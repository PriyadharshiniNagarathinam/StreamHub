import { PlusCircle } from "lucide-react";

import { Button } from "../../components/ui/button";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import GoLiveComp from "../reactComponents/GoLiveComp";
import { Menu } from "../reactComponents/Menu";
import { Sidebar } from "../reactComponents/Sidebar";
import { recommendedVideos, videoData, watchNowVideos } from "../data/videos";
import { playlists } from "../data/playlists";
import VideoCard from "../reactComponents/VideoCard";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import TextEditor from "../reactComponents/TextEditorComp";
import UploadVideoForm from "../reactComponents/UploadVideoForm";
import { useAuth } from "../utils/AuthContext";
import LiveVideosComp from "../reactComponents/LiveVideosComp";

export default function Home() {
  // const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <img
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div className="col-span-3 lg:col-span-4 lg:border-l">
                        <div className="h-full px-4 py-6 lg:px-8">
                          <Tabs
                            defaultValue="videos"
                            className="h-full space-y-6"
                          >
                            <div className="space-between flex items-center">
                              <TabsList>
                                <TabsTrigger
                                  value="videos"
                                  className="relative"
                                >
                                  Videos
                                </TabsTrigger>
                                <TabsTrigger value="blogs">Blogs</TabsTrigger>
                                <TabsTrigger value="live">Live</TabsTrigger>
                              </TabsList>
                              <div className="ml-auto mr-4">
                                <Button className="mr-2">
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  <TextEditor />
                                </Button>
                                <Button className="mr-2">
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  <UploadVideoForm />
                                </Button>
                                <Button className="mr-2">
                                  <GoLiveComp />
                                </Button>
                                <Button
                                  onClick={() => {
                                    navigate(
                                      `/watch-live?liveId=thanks&name=priya`
                                    );
                                  }}
                                >
                                  Watch Live
                                </Button>
                              </div>
                            </div>

                            <TabsContent
                              value="videos"
                              className="border-none p-0 outline-none"
                            >
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <h2 className="text-2xl font-semibold tracking-tight">
                                    Watch Now
                                  </h2>
                                  <p className="text-sm text-muted-foreground">
                                    Top picks for you. Updated daily.
                                  </p>
                                </div>
                              </div>
                              <Separator className="my-4" />
                              <div className="relative">
                                <ScrollArea>
                                  <div className="flex space-x-4 pb-4">
                                    {videoData.map((video) => (
                                      <VideoCard
                                        key={video._id}
                                        id={video._id}
                                        title={
                                          video.title || "A technology boom"
                                        }
                                        username={
                                          video.username || "Ethan Byte"
                                        }
                                        thumbnail_filename={
                                          video.thumbnail_filename
                                        }
                                      />
                                    ))}
                                  </div>
                                  <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                              </div>
                              <div className="mt-6 space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                  Made for You
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                  Your personal playlists. Updated daily.
                                </p>
                              </div>
                              <Separator className="my-4" />
                              <div className="relative">
                                {/* <ScrollArea>
                                  <div className="flex space-x-4 pb-4">
                                    {recommendedVideos.map((video) => (
                                      <VideoCard
                                        key={video.title}
                                        heading={video.title}
                                        username={video.creater}
                                        thumbnail={video.thumbnail}
                                      />
                                    ))}
                                  </div>
                                  <ScrollBar orientation="horizontal" />
                                </ScrollArea> */}
                              </div>
                            </TabsContent>
                            <TabsContent
                              value="blogs"
                              className="h-full flex-col border-none p-0 data-[state=active]:flex"
                            >
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <h2 className="text-2xl font-semibold tracking-tight">
                                    New Blogs
                                  </h2>
                                  <p className="text-sm text-muted-foreground">
                                    Your favorite blogs. Updated daily.
                                  </p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent
                              value="live"
                              className="h-full flex-col border-none p-0 data-[state=active]:flex"
                            >
                              <LiveVideosComp/>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    </>
                  }
                />
                <Route path="/video-player" element={<VideoPlayer />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
