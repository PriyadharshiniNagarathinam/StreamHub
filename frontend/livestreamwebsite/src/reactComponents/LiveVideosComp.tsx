import { useContext } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { LiveVideosContext } from "../utils/LiveVideosContext";
import { useNavigate } from "react-router-dom";

export default function LiveVideosComp() {
  const liveVideos = useContext(LiveVideosContext).liveVideos;
  const navigate = useNavigate();

  return (
    <>
      {liveVideos.length > 0 ? (
        <Table>
          <TableCaption>A list of all livestreams.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Broadcaster</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>ViewersCount</TableHead>
              <TableHead className="text-right">Join</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {liveVideos.map(
              (liveVideo: {
                broadcaster: string;
                title: string;
                description: string;
                viewers: number;
                ended: boolean;
              }) => (
                <TableRow key={liveVideo.title}>
                  <TableCell className="font-medium">
                    {liveVideo.broadcaster}
                  </TableCell>
                  <TableCell>{liveVideo.title}</TableCell>
                  <TableCell>{liveVideo.description}</TableCell>
                  <TableCell>{liveVideo.viewers}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => {
                        navigate(
                          `/watch-live?name=${liveVideo.broadcaster}&liveId=${liveVideo.title}`
                        );
                      }}
                      disabled={liveVideo.ended}
                    >
                      Join Live
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      ) : (
        <h1>No live videos available</h1>
      )}
    </>
  );
}
