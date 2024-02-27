import React, { ChangeEvent } from "react";
import Image from "./ImageUploader";

type Props = {
  UploadImage: string;
  handleUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
};
function ImageUploader(props: Props) {
  const { UploadImage, handleUploadImage } = props;
  return (
    <div className="flex flex-col">
      <label className="self-center cursor-pointer " htmlFor="IMAGE_ID">
        <input
          type="file"
          className="[display:none]"
          onChange={handleUploadImage}
          id="IMAGE_ID"
          accept="image/*"
          placeholder="upload image..."
        />
        <Image uploadedFile={UploadImage} />
      </label>
    </div>
  );
}

export default ImageUploader;
