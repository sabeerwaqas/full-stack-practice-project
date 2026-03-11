import { Button } from "../button";
import { Modal } from "../modal";
import { ModalContent, ModalFooter, ModalHeader } from "../modal-component";

export const DeleteInvoiceModal = ({
  isOpen,
  onClose,
  onClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalHeader>Delete Invoice</ModalHeader>
      <ModalContent>
        <p>Are you sure you want to delete this invoice?</p>
      </ModalContent>
      <ModalFooter>
        <Button variant="secondary" buttonType="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="delete" buttonType="button" onClick={onClick}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};
