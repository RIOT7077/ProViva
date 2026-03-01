import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "ProViva",
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
  baseUrl: "https://api.inngest.com",
});
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } =
      event.data;
    try {
      await connectDB();
      const newUser = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
      };
      await User.create(newUser);
      await upsertStreamUser({
        id: newUser.clerkId.toString()  ,
        name: newUser.name,
        image: newUser.profileImage,
      });
    } catch (error) {
      console.error("Error syncing user:", error);
    }
  },
);
const deleteUserFromDb = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    try {
      await connectDB();
      await User.deleteOne({ clerkId: id });
      await deleteStreamUser(id.toString());
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
);
export const functions = [syncUser, deleteUserFromDb];
