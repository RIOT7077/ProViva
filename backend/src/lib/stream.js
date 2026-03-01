import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apikey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apikey || !apiSecret) {
  console.error("Stream API key and secret are required");
  process.exit(1);
}

export const chatClient = StreamChat.getInstance(apikey, apiSecret);
export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream User Upserted successfully", userData);
  } catch (error) {
    console.log("Error Upserting Stream User", error);
  }
};
export const deleteStreamUser = async (userID) => {
  try {
    await chatClient.deleteUser(userID);
    console.log("Stream User Deleted successfully", userID);
  } catch (error) {
    console.log("Error Deleting Stream User", error);
  }
};


//smthg else