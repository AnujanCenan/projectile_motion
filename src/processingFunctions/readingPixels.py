#!/usr/bin/python3

# NOT TO BE USED BY THE ACTUAL WEBSITE
# AN DEVELOPMENT PROGRAM USED TO PREPROCESS IMAGES FOR THEIR COLOURS 

from PIL import Image
import sys

inputImageFileName = sys.argv[1] # str
outputImageFileName = sys.argv[2]

im = Image.open(inputImageFileName, 'r')
pix_val = (list(im.getdata()))



with open(outputImageFileName, "w") as f:
    for pix in pix_val:
        f.write(f"{str(pix).removesuffix(')').removeprefix('(')}\n")


