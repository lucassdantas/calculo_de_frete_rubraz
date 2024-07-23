import Cropper from 'cropperjs';

export const getCroppedImg = (imageSrc: string, crop: any) => {
  return new Promise<Blob>((resolve, reject) => {
    const image = document.createElement('img');
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      const cropper = new Cropper(image, {
        viewMode: 1,
        aspectRatio: 1,
        cropBoxResizable: true,
        ready() {
          cropper.setCropBoxData(crop);
          const croppedCanvas = cropper.getCroppedCanvas();
          croppedCanvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to crop image'));
            }
          }, 'image/jpeg');
        },
      });
    };
  });
};