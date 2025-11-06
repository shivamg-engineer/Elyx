import express,{type Request,type Response } from "express";
import { validateProfile } from "./middleware/validateProfile.ts";

const app = express();
app.use(express.json());

app.put("/profile", validateProfile, (req: Request, res: Response) => {
  // In a real app, here you would update the database
  const { bio, website } = req.body;
  res.json({
    success: true,
    message: "Profile updated successfully",
    data: { bio, website },
  });
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
