import { db } from "../../config/firebaseConfig";
import { Task } from "../../types/Task";

const collectionTask = db.collection("tasks");

export const addDbTask = async (task: Task) => {
  const id = task.id;
  if (!id) {
    return false;
  }
  const existingTask = await collectionTask.doc(id).get();
  if (existingTask.exists) {
    return false;
  }
  await collectionTask.doc(id).set(task);
  return true;
};
