import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = chatClient.createToken(req.user.clerkId);
    res.status(200).json({
      token,
      userid: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
      res.status(500).json({ message: "Error generating Stream token", error: error.message })
  }
}
