import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { userImagesDirectoryUrl } from "@/constants";
import CropModal from "@/components/UserPopup/CropModal";

interface UserPhotoProps {
  userId: number;
  userHasImage: boolean;
  onPhotoChange: (file: File) => void;
}

const UserPhoto: React.FC<UserPhotoProps> = ({ userId, userHasImage, onPhotoChange }) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "image/jpeg") {
        setPhotoPreview(URL.createObjectURL(file));
        onPhotoChange(file);
        setIsCropping(true);
      } else {
        alert("Somente imagens JPG são aceitas.");
      }
    }
  };

  return (
    <div className="relative flex items-end justify-start">
      <img
        src={userHasImage ? `${userImagesDirectoryUrl}${userId}.jpg` : `${userImagesDirectoryUrl}default.jpg`}
        alt="Foto do usuário"
        className="rounded-full w-24 h-24 object-cover -mr-6"
      />
      <input
        type="file"
        onChange={handlePhotoChange}
        accept="image/jpeg"
        className="hidden"
        id="photoInput"
      />
      <label htmlFor="photoInput" className="bg-yellow-500 p-1 rounded-full cursor-pointer mb-2">
        <MdEdit className="text-white text-sm"/>
      </label>
      {/* Conditionally show CropModal if isCropping is true */}
      {isCropping && photoPreview && (
        <CropModal
          photoPreview={photoPreview}
          onCropComplete={(file) => {
            onPhotoChange(file);
            setIsCropping(false);
          }}
          onCancel={() => setIsCropping(false)}
        />
      )}
    </div>
  );
};

export default UserPhoto;
