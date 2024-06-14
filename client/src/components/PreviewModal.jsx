import React from "react";
import { Modal, PreviewContent } from "../components";
import { useSelector } from "react-redux";
import { closeModal } from "../app/slices/modalSlice";
import { getPreviewData, setPreviewNull } from "../app/slices/previewSlice";

const PreviewModal = () => {
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const previewData = useSelector((state) => state.previewData);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        setNull={setPreviewNull}
        getData={getPreviewData}
        title={"Preview"}
        data={previewData}
        Body={PreviewContent}
      />
    </>
  );
};

export default PreviewModal;
