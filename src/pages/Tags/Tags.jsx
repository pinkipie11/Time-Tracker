import React, { useState } from "react";
import style from "./tags.module.css";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { IoMdSwitch } from "react-icons/io";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Tags = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewTag("");
  };
  const openModal = () => setIsModalOpen(true);

  const addTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag]);
      closeModal();
    }
  };

  return (
    <div className={style.container} style={{ width: "100%" }}>
      <div className={style.top1}>
        <Box>
          <p style={{ fontSize: "17px", fontWeight: "600" }}>Tags</p>
        </Box>
        <Box>
          <Button colorScheme="blue" size="sm" onClick={openModal}>
            + New Tag
          </Button>
        </Box>
      </div>

      <div className={style.top2}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "0px",
          }}
        >
          <Box style={{ marginBottom: "0px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "10px",
              }}
            >
              FILTERS:
            </span>
          </Box>
          <Box
            style={{
              paddingTop: "2px",
              marginLeft: "5px",
            }}
          >
            <Button
              size="sm"
              fontSize="14px"
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Tag name
            </Button>
          </Box>
        </Box>
      </div>
      <Box width="100%" height="20px" backgroundColor="#FCF7F5" />
      <div className={style.newNavbar}>
        <div
          style={{
            height: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Button
            className={style.bulkBtn}
            colorScheme="blue"
            size="sm"
            leftIcon={<IoMdSwitch />}
            marginBottom="10px"
          >
            Bulk delete
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "gray",
                fontWeight: "500",
                marginRight: "5px",
              }}
            >
              TAG
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FaChevronUp style={{ fontSize: "10px", cursor: "pointer" }} />
              <FaChevronDown style={{ fontSize: "10px", cursor: "pointer" }} />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent style={{ marginTop: "200px" }}>
          <ModalHeader>New Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Tag name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" width="100%" onClick={addTag}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className={style.tagList}>
        {tags.map((tag, index) => (
          <div key={index} className={style.tagItem}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
