import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../services/firebase";

export default async function updateStatus (id, previous, field){
    const washingtonRef = doc(db, "stream-count", id);
    await updateDoc(washingtonRef, {
        [previous]: increment(-1),
        [field]: increment(1),
    });
};

export async function removeFile (id, data){
    const washingtonRef = doc(db, "stream-count", id);
    await updateDoc(washingtonRef, {
        [data]: increment(-1),
    });
};

export const archiveFile = async(id)=>{
    const washingtonRef = doc(db, "stream-count", id);
    await updateDoc(washingtonRef, {
        archived: increment(1),
    });
}