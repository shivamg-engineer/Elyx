import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { upload } from "./upload.ts";
import { error } from "console";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "./data/files.json");

//reads files.json and return
interface FileMeta {
  id: string;
  originalName: string;
  storedName: string;
  path: string;
}



function readMetadata():FileMeta[] {
   if (!fs.existsSync(DATA_FILE)) return [];

 try{
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    if (!content.trim()) return []; // empty file → return empty array

    const data = JSON.parse(content) as FileMeta[];
    return Array.isArray(data) ? data : [];

 }catch(err){
   console.error("Error reading metadata:", err);
    return []; // fallback to empty array
 }
}



//writes to files.json
function saveMetadata(data: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const files: FileMeta[] = readMetadata(); //files will store files.json data
  const id = Date.now().toString();

  const fileInfo = {
    id: Date.now().toString(),
    originalName: req.file.originalname,
    storedName: req.file.filename,
    path: req.file.path,
  };

  files.push(fileInfo); //append fileInfo to files
  saveMetadata(files); //then save it to files.json

  res.json({
    message: "File uploaded successfully",
    file: fileInfo,
  });
});

//  Download endpoint by ID

app.get("/download/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const files = readMetadata();
  const file = files.find((f: FileMeta) => f.id === id);

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  const absolutePath = path.resolve(file.path);
  if (!fs.existsSync(absolutePath)) {
    return res.status(410).json({ error: "File missing from disk" });
  }

  res.download(absolutePath, file.originalName);
});

//  Download by filename
app.get("/download/name/:filename",(req,res)=>{
    const {filename}=req.params;
    const files=readMetadata();
    const file= files.find((f)=>f.originalName===filename);

    if(!file){
        return res.status(404).json({error:"File Not Found"});
    }

    const absolutePath=path.resolve(file.path);
    res.download(absolutePath,file.originalName);
})

app.use("/uploads", express.static(path.join(__dirname,"../uploads")));

app.listen(3000, () => console.log("✅ Server running on port 3000"));