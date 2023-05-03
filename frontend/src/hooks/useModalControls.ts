import {useState} from "react";

export const useModalControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);


  const handleClose = () => {
    setIsModalOpen(false);
  }

  return {
    isOpen: isModalOpen,
    onClose: handleClose,
  }
}
