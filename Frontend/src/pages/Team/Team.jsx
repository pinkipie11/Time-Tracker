import React, { useState } from "react";
import style from "./team.module.css";
import {
  Button,
  Flex,
  Box,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInnerModalOpen, setIsInnerModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openInnerModal = () => {
    setIsInnerModalOpen(true);
  };

  const closeInnerModal = () => {
    setIsInnerModalOpen(false);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true); // Otvaramo "Second Modal" kad se pozove ova funkcija
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false); // Zatvaramo "Second Modal"
  };

  return (
    <div className={style.container}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          // marginLeft: "20px",
          // marginRight: "40px",
          justifyContent: "space-between",
          gap: "25px",
          borderBottom: "1px solid #E2E8F0",
          paddingLeft: "20px",
          paddingRight: "25px",
          paddingTop: "15px",
          paddingBottom: "25px",
        }}
      >
        <Box>
          <span
            style={{
              fontSize: "17px",
              fontWeight: "600",
              color: "#2C1338",
            }}
          >
            Organization
          </span>
        </Box>
        <Box>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#5E4F64",
              cursor: "pointer",
            }}
          >
            Workspaces
          </span>
        </Box>
        <Box>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#5E4F64",
              cursor: "pointer",
            }}
          >
            Team
          </span>
        </Box>
        <Box>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#5E4F64",
              cursor: "pointer",
            }}
          >
            Groups
          </span>
        </Box>
        <Box>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#5E4F64",
              cursor: "pointer",
            }}
          >
            Settings
          </span>
        </Box>
        <Box>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#5E4F64",
              cursor: "pointer",
            }}
          >
            Subscription
          </span>
        </Box>
        <Spacer />
        <Box>
          <Button
            colorScheme="blue"
            onClick={openModal}
            size="sm"
            fontSize="15px"
          >
            + Invite members
          </Button>
        </Box>
      </Box>

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          // marginLeft: "20px",
          // marginRight: "40px",
          justifyContent: "space-between",
          gap: "20px",
          borderBottom: "1px solid #E2E8F0",
          paddingLeft: "20px",
          paddingRight: "25px",
          paddingTop: "10px",
          paddingBottom: "10px",
          boxShadow: "0px 5px 5px -5px rgba(0,0,0,0.9)",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            // border: "1px solid red",
          }}
        >
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme="blue"
              size="sm"
              fontSize="15px"
            >
              Show active members
            </MenuButton>
            <MenuList>
              <MenuItem>Active members</MenuItem>
              <MenuItem>Invited members</MenuItem>
              <MenuItem>Inactive members</MenuItem>
            </MenuList>
          </Menu>
          {/* Dodaj FILTERS i tri dodatna buttona */}
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              // border: "1px solid red",
              marginLeft: "15px",
            }}
          >
            <Box style={{ marginBottom: "0px" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
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
                fontSize="15px"
                bg="transparent"
                _hover={{ bg: "gray.100" }} // Siva pozadina se pojavljuje samo na hover
              >
                Access
              </Button>
              <Button
                size="sm"
                fontSize="15px"
                bg="transparent"
                _hover={{ bg: "gray.100" }} // Siva pozadina se pojavljuje samo na hover
              >
                Groups
              </Button>
              <Button
                size="sm"
                fontSize="15px"
                bg="transparent"
                _hover={{ bg: "gray.100" }} // Siva pozadina se pojavljuje samo na hover
              >
                Workspaces
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              id="search"
              name="search"
              placeholder="Search members..."
              color="#2C1338"
              fontSize="14px"
              fontWeight="400"
              _focus={{
                borderColor: "none",
                bg: "gray.200",
              }}
              _hover={{
                borderColor: "gray.300",
              }}
            />
          </InputGroup>
        </Box>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        isCentered
        colorScheme="blue"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Add one or more emails"
              color="#2C1338"
              fontSize="14px"
              fontWeight="400"
              letterSpacing="0.4px"
              _focus={{
                borderColor: "#2C1338",
              }}
              _hover={{
                borderColor: "#2C1338",
              }}
            />
            <Text
              color="#2C1338"
              fontSize="13px"
              fontWeight="500"
              textAlign="start"
              line-height="17.94px"
              padding="20px 0px 20px"
            >
              When you invite new members, your monthly fee will be recalculated
              accordingly
            </Text>
            <Text
              color="#2C1338"
              fontSize="11px"
              fontWeight="600"
              letterSpacing="0.4px"
              padding="0px 0px 8px"
            >
              WORKSPACES
            </Text>
            <InputGroup padding="0px 0px 20px">
              <Input
                placeholder="Workspaces"
                color="#2C1338"
                fontSize="14px"
                fontWeight="400"
                letterSpacing="0.4px"
              />
              <InputRightElement width="auto">
                <Flex align="center">
                  <Text color="#2C1338" fontSize="14px" fontWeight="500">
                    0
                  </Text>
                  <Text color="#2C1338" fontSize="14px" fontWeight="400">
                    &nbsp;selected
                  </Text>
                  <IconButton
                    icon={<ChevronDownIcon />}
                    onClick={openInnerModal}
                    variant="outline"
                    _hover={{
                      bg: "transparent",
                      border: "none",
                    }}
                  />
                </Flex>
              </InputRightElement>
            </InputGroup>
            <Button
              colorScheme="blue"
              color="#F7F7F7"
              fontSize="14px"
              fontWeight="600"
              width="100%"
              margin="12px 0px 15px 0px"
              onClick={closeModal}
            >
              Invite
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isInnerModalOpen}
        onClose={closeInnerModal}
        isCentered
        colorScheme="blue"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inner Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* Content for the inner modal goes here */}</ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isSecondModalOpen}
        onClose={closeSecondModal}
        isCentered
        colorScheme="blue"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Second Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* Content for the second modal goes here */}</ModalBody>
        </ModalContent>
      </Modal>
      <div>
        <Box className={style.customBox}></Box>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            marginTop: "0px",
            // borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
            paddingLeft: "20px",
            paddingRight: "25px",
            paddingTop: "20px",
            paddingBottom: "20px",
            // position: "relative",
            boxShadow: "0px -5px 5px -5px rgba(0,0,0,0.1)",
            // border: "1px solid green",
          }}
        >
          This is Team section (first Box)
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
            borderBottom: "1px solid #E2E8F0",
            paddingLeft: "20px",
            paddingRight: "25px",
            paddingTop: "15px",
            paddingBottom: "25px",
            // border: "1px solid red",
          }}
        >
          Content for the second Box
        </Box>
      </div>
    </div>
  );
};

export default Team;
