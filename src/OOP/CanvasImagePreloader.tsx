import { RefObject } from "react";
import { DrawingToSrcAndImage, SrcAndImage } from "./DrawingImages";

export class CanvasImagePreloader {

  loadImages(objectsToDraw: DrawingToSrcAndImage,callback: Function) {
    var loadedImageCount = 0;

    for (const [key, value] of Object.entries(objectsToDraw)) {
      const img = new Image();
      img.onload = imageLoaded;
      img.src = (value as SrcAndImage).src;

      // images[key] = img;
      (value as SrcAndImage).imageRef.current = img;
    }

      function imageLoaded() {
        const size = Object.keys(objectsToDraw).length;
        loadedImageCount++;
        if (loadedImageCount >= size) {
          
            callback();
        }
    }
  }
}