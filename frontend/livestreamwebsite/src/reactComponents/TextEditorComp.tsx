import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import showdown from "showdown";
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

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const TextEditor: React.FC = () => {
  const [editorHtml, setEditorHtml] = useState<string>("");
  const [blogName, setBlogName] = useState<string>("");
  const converter = new showdown.Converter();

  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  const handlePublish = async () => {
    const markdownContent = converter.makeMarkdown(editorHtml);
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const formData = new FormData();
    formData.append("blog", blob, `${blogName}.md`);
    try {
      const response = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Success");
        alert("Blog uploaded successfully!");
      } else {
        console.log("Error");
        alert("Error uploading the blog!");
      }
    } catch (error) {
      console.log("Error");
        alert("Error uploading the blog!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Create Blog</DialogTrigger>
      <DialogContent className="w-screen max-w-[80%] max-h-[80%]">
        <DialogTitle>Create New Blog</DialogTitle>
        <div>
          <Label htmlFor="blogName" className="text-md text-bold">
            Blog Name
          </Label>
          <Input id="blogName" autoFocus onChange={(e) => setBlogName(e.target.value)} />
        </div>
        <DialogDescription>
          <div style={{ height:"600px" }}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={editorHtml}
              onChange={handleChange}
              style={{
                height: "60%",
                maxHeight: "60%",
                overflowY: "auto",
                border: "1.5px solid #d1d5db",
              }}
            />
            <Button
              onClick={handlePublish}
              className="mt-4 h-[50px] w-40 text-xl"
            >
              Publish
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
export default TextEditor;
