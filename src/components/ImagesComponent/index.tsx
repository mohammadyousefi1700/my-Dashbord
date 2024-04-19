import React, { ChangeEvent } from "react";
import Image from "./ImageUploader";

type Props = {
  UploadImage: string;
  handleUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
  classNameImage?: string;
};
function ImageUploader(props: Props) {
  const { UploadImage, handleUploadImage, classNameImage } = props;
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
        {UploadImage ? (
          <Image classNames={classNameImage} uploadedFile={UploadImage} />
        ) : (
          <div className="w-28 border-neutral-500 border-1 box-border shadow-slate-500 shadow-md p-1 h-24 rounded-lg place-content-between font-medium text-center text-[10px]  ">
            <p className="w-full h-full rounded-lg border-[1px]  flex items-center justify-center border-gray-500">
              {" "}
              لطفا عکس خود را آپلود کنید.
            </p>{" "}
          </div>
        )}
      </label>
    </div>
  );
}

export default ImageUploader;
