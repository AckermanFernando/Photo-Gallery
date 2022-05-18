import { ref, onMounted, watch } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";

const photos = ref<UserPhoto[]>([]);

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

function saveImage(photo: Photo) {
  const fileName = new Date().getTime + ".jpeg";
  const savedFileImage = { filepath: fileName, webviewPath: photo.webPath};
  photos.value = [savedFileImage, ...photos.value];
}


export function usePhotoGallery() {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    saveImage(photo)
//    const fileName = new Date().getTime + ".jpeg";
//    const savedFileImage = { filepath: fileName, webviewPath: photo.webPath, };
//    photos.value = [savedFileImage, ...photos.value];
};

  return {
    photos,
    takePhoto,
  };
}
