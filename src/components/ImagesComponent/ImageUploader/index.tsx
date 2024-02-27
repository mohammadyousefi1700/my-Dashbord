import React from "react";

type Props = {
  uploadedFile: string;
  classNames?: string;
};

function Image(props: Props) {
  const { uploadedFile, classNames } = props;
  return (
    <img
      alt="img"
      src={uploadedFile as string}
      className={classNames ? classNames : "w-32 h-32 rounded-full"}
    />
  );
}

export default Image;
