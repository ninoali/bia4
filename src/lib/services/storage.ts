import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    // Create storage reference with unique timestamp
    const timestamp = Date.now();
    const uniquePath = `${path.split('.')[0]}-${timestamp}.${path.split('.')[1]}`;
    const storageRef = ref(storage, uniquePath);
    
    // Set metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadTimestamp: timestamp.toString(),
      },
    };

    // Upload file
    const snapshot = await uploadBytes(storageRef, file, metadata);
    
    // Get download URL
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file. Please check your connection and try again.');
  }
};

export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
};