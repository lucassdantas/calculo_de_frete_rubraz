import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";

interface CropModalProps {
  photoPreview: string;
  onCropComplete: (file: File) => void;
  onCancel: () => void;
}

const CropModal: React.FC<CropModalProps> = ({ photoPreview, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    const croppedImg = await getCroppedImg(photoPreview, croppedAreaPixels);
    setCroppedImage(URL.createObjectURL(croppedImg));
  };

  const handleConfirm = async () => {
    if (croppedImage) {
      const blob = await fetch(croppedImage).then(res => res.blob());
      onCropComplete(blob as File);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="relative w-full h-[300px] bg-gray-200">
          <Cropper
            image={photoPreview}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
          <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between bg-gray-800 bg-opacity-50">
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
