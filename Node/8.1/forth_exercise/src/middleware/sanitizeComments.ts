import type { Request, Response, NextFunction } from "express";
import xss from "xss";

export const sanitizeComments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = req.body.comment;

  if (!comment || typeof comment !== "string" || comment.trim().length === 0) {
    return res.status(400).json({ error: "comment cannot be empty" });
  }

  const sanitizedComment = xss(comment,{
    whiteList:{},//remove all HTML tags
    stripIgnoreTag:true,
    stripIgnoreTagBody:["script"],//remove script content
  });

  // Log if comment contained malicious scripts
  if (sanitizedComment !== comment) {
    console.warn("🚨 Malicious script detected in comment:", comment);
  }

  // Replace original comment with sanitized version
  req.body.comment = sanitizedComment;

  next();
};


