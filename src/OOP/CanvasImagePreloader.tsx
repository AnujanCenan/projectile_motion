import { RefObject } from "react";

export class CanvasImagePreloader {

  loadImages(arr: string[], refs: RefObject<HTMLImageElement | null>[],callback: Function) {
    type SrcToImage = { [key: string]: HTMLImageElement };

    const images: SrcToImage= {};
    var loadedImageCount = 0;

    // Make sure arr is actually an array and any other error checking
    for (var i = 0; i < arr.length; i++){
        var img = new Image();
        img.onload = imageLoaded;
        img.src = arr[i];
        images[arr[i]] = img;
        refs[i].current = img;
    }

      function imageLoaded() {
        loadedImageCount++;
        if (loadedImageCount >= arr.length) {
            callback();
        }
    }
  }
}