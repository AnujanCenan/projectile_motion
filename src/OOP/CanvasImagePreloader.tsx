import { RefObject } from "react";
import { DrawingToSrcAndImage, SrcAndImage } from "./DrawingImages";

export class CanvasImagePreloader {

  loadImages(objectsToDraw: DrawingToSrcAndImage,callback: Function) {
    var loadedImageCount = 0;

    // Make sure arr is actually an array and any other error checking
    // for (var i = 0; i < objectsToDraw; i++){
    //     var img = new Image();
    //     img.onload = imageLoaded;
    //     img.src = arr[i];
    //     images[arr[i]] = img;
    //     refs[i].current = img;
    // }

    //   function imageLoaded() {
    //     loadedImageCount++;
    //     if (loadedImageCount >= arr.length) {
    //         callback();
    //     }
    // }

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