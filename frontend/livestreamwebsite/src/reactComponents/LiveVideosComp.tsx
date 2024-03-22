import { useContext } from "react";
import { Button } from "../../components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../components/ui/table";
import { LiveVideosContext } from "../utils/LiveVideosContext";

export default function LiveVideosComp() {
    const liveVideos = useContext(LiveVideosContext).liveVideos;
    
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
              <TableHead className="text-right">Join</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {liveVideos.map(
              (liveVideo: {
                broadcaster: string;
                title: string;
                description: string;
              }) => (
                <TableRow key={liveVideo.title}>
                  <TableCell className="font-medium">
                    {liveVideo.broadcaster}
                  </TableCell>
                  <TableCell>{liveVideo.title}</TableCell>
                  <TableCell>{liveVideo.description}</TableCell>
                  <TableCell className="text-right">
                    <Button>Join Live</Button>
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
