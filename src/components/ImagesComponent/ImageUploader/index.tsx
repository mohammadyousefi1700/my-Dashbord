import React from "react";

type Props = {
  uploadedFile: string;
  classNames?: string;
  [key: string]: any;
};

function Image(props: Props) {
  const { uploadedFile, classNames, ...rest } = props;
  return (
    <img
      {...rest}
      alt="img"
      src={uploadedFile as string}
      className={classNames ? classNames : "w-32 h-32 rounded-full"}
    />
  );
}

export default Image;
