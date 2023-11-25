import React from "react";
import { Modal } from "../components";
import { useSelector } from "react-redux";
import { closeModal } from "../app/slices/modalSlice";
import { getPreviewData, setPreviewNull } from "../app/slices/previewSlice";

const PreviewModal = () => {
  const isModalOpen = useSelector((state) => state.isModalOpen);
  console.log(isModalOpen);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        setPreviewNull={setPreviewNull}
        getPreviewData={getPreviewData}
        title={"Preview"}
      />
    </>
  );
};

export default PreviewModal;
