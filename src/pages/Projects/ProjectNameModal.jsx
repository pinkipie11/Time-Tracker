import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function ProjectNameModal({ isOpen, onClose, onSubmit }) {
  const handleModalClick = (e) => {
    // Zatvori modal samo ako kliknete izvan modalnog sadržaja
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent onClick={handleModalClick} style={{ cursor: "pointer" }}>
        <form onSubmit={onSubmit}>
          {/* Uklonjena ModalCloseButton */}
          <ModalBody>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <Input placeholder="Find project..." />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              onClick={(e) => e.stopPropagation()}
            >
              Apply
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ProjectNameModal;
