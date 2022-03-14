import { Row } from "@hi-ui/grid";
import Upload from "@hi-ui/upload";
import { UploadFileItem } from "@hi-ui/upload/lib/types/interface";
import React from "react";
interface IProps {
  onChange?: (params: any) => void;
  value?: {
    frontPhoto: UploadFileItem[];
    backPhoto: UploadFileItem[];
  };
}

export const IdentificationUpload: React.FC<IProps> = ({ onChange, value }) => {
  return (
    <Row className="form-basic-identification">
      <Upload
        type="avatar"
        onRemove={(file, fileList, index) => {
          console.log("remove callback", file, fileList, index);
          onChange &&
            onChange({
              ...value,
              frontPhoto: [],
            });
          return new Promise((resolve, reject) => resolve(true));
        }}
        data={{ id: "uid", channel: "youpin" }}
        name={"files[]"}
        fileList={value?.frontPhoto}
        customUpload={(files)=>{
          console.log(files)
          onChange &&
            onChange({
              ...value,
              frontPhoto: files,
            });
        }}
      />

      <Upload
        type="avatar"
        onRemove={(file, fileList, index) => {
          console.log("remove callback", file, fileList, index);
          onChange &&
            onChange({
              ...value,
              backPhoto: [],
            });
          return new Promise((resolve, reject) => resolve(true));
        }}
        data={{ id: "uid", channel: "youpin" }}
        name={"files[]"}
        fileList={value?.backPhoto}
        customUpload={(files)=>{
          console.log(files)
          onChange &&
            onChange({
              ...value,
              backPhoto: files,
            });
        }}
      />
    </Row>
  );
};
