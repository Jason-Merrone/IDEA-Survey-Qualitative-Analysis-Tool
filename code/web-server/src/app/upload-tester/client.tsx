"use client";
import UploadPdfPond from "~/components/uploadFile";
import { useState } from "react";

export default function UploadTesterClient() {
  const [fileContent, setFileContent] = useState<string[]>([]);

  return (
    <div>
      <UploadPdfPond onUpload={setFileContent} />
      {fileContent && <pre>{fileContent}</pre>}
    </div>
  );
}
