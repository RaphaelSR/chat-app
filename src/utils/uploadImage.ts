import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebase";
import { uriToBlob } from "./uriToBlob";

export async function uploadImage(uri: string, userId: string) {
  let blob;
  blob = await uriToBlob(uri);
  const ref = storageRef(storage, `avatars/${userId}`);
  await uploadBytes(ref, blob);

  const url = await getDownloadURL(ref);

  return url;
}
