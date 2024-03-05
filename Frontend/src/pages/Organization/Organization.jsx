import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
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
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

const Organization = () => {
  const [showMembersSection, setShowMembersSection] = useState(false);
  const [showWorkspacesSection, setShowWorkspacesSection] = useState(false);
  const [showGroupsSection, setShowGroupsSection] = useState(false);
  const [showSettingsSection, setShowSettingsSection] = useState(false);
  const [showSubscriptionSection, setShowSubscriptionSection] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInnerModalOpen, setIsInnerModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const [members, setMembers] = useState([]);
  const [selectedSection, setSelectedSection] = useState(members);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    toggleSection(section);
  };

  const menuStyle = {
    fontSize: "15px",
    fontWeight: "500",
    color: "#5E4F64",
    cursor: "pointer",
    padding: "0 10px",
    borderRadius: "8px",
  };

  const selectedMenuStyle = {
    ...menuStyle,
    fontWeight: "bold",
    backgroundColor: "#E2E8F0",
  };

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
    setIsSecondModalOpen(true); // Otvaramo "Second Modal"
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false); // Zatvaramo "Second Modal"
  };

  const toggleSection = (section) => {
    setShowMembersSection(section === "members");
    setShowWorkspacesSection(section === "workspaces");
    setShowGroupsSection(section === "groups");
    setShowSettingsSection(section === "settings");
    setShowSubscriptionSection(section === "subscription");
  };

  useEffect(() => {
    setSelectedSection("members");
    toggleSection("members");
  }, []);

  const renderContent = () => {
    switch (selectedSection) {
      case "workspaces":
        return (
          <>
            <div>
              <Box
                style={{
                  backgroundColor: "#fcf7f5",
                  minHeight: "20px",
                  maxHeight: "20px",
                }}
              ></Box>
            </div>
            <Box
              style={{
                borderBottom: "1px solid #E2E8F0",
                // boxShadow:
                //   "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 20px",
                height: "3.2rem",
              }}
            >
              <Flex align="center">
                <Box marginRight="20rem">
                  <span
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      fontWeight: "500",
                    }}
                  >
                    NAME
                  </span>
                </Box>
                <Box marginRight="20rem">
                  <span
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      fontWeight: "500",
                    }}
                  >
                    ADMINS
                  </span>
                </Box>
                <Box>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      fontWeight: "500",
                    }}
                  >
                    MEMBERS
                  </span>
                </Box>
              </Flex>
              <Box style={{ marginLeft: "auto", marginRight: "15px" }}>
                <FormControl width="5rem">
                  {/* ... Ostatak koda za pretraživanje i filtriranje ... */}
                </FormControl>
              </Box>
            </Box>
          </>
        );

      case "members":
        return (
          <>
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
                    When you invite new members, your monthly fee will be
                    recalculated accordingly
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
                <ModalBody>
                  {/* Content for the inner modal goes here */}
                </ModalBody>
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
                <ModalBody>
                  {/* Content for the second modal goes here */}
                </ModalBody>
              </ModalContent>
            </Modal>
            <div>
              <Box
                style={{
                  backgroundColor: "#fcf7f5",
                  minHeight: "20px",
                  maxHeight: "20px",
                }}
              ></Box>
            </div>
            <Box
              style={{
                height: "3.2rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "gray",
                  fontWeight: "500",
                  marginRight: "5px",
                  marginLeft: "20px",
                }}
              >
                NAME
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FaChevronUp style={{ fontSize: "7px", cursor: "pointer" }} />
                <FaChevronDown style={{ fontSize: "7px", cursor: "pointer" }} />
              </div>
            </Box>
          </>
        );

      case "groups":
        return (
          <Box
            style={{
              borderBottom: "1px solid #E2E8F0",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 15px",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    marginLeft: "6px",
                  }}
                >
                  FILTERS:
                </span>
              </Box>
              <Box
                style={{
                  paddingTop: "2px",
                  marginLeft: "7px",
                }}
              >
                <Button
                  size="sm"
                  fontSize="15px"
                  bg="transparent"
                  _hover={{ bg: "gray.100" }}
                >
                  Workspaces
                </Button>
              </Box>
            </Box>
            <FormControl width="20rem">
              <InputGroup borderColor="gray">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.500" marginLeft="15px" />
                </InputLeftElement>
                <Input
                  id="search"
                  name="search"
                  placeholder="Search groups..."
                  size="md"
                  sx={{
                    height: "calc(2.5rem - 4px)",
                  }}
                  color="#817288"
                  fontSize="15px"
                  fontWeight="400"
                  _focus={{
                    borderColor: "none",
                    bg: "gray.200",
                  }}
                  _hover={{
                    border: "1px solid gray.400",
                  }}
                  focusBorderColor="gray.200"
                  width="100%"
                  marginLeft="10px"
                />
              </InputGroup>
            </FormControl>
          </Box>
        );

      case "settings":
        return (
          <Box>
            {/* Dodajte sadržaj za Settings sekciju ovde */}
            <Text fontSize="16px" fontWeight="600" color="#2C1338">
              Settings Content
            </Text>
          </Box>
        );

      case "subscription":
        return (
          <Box>
            {/* Dodajte sadržaj za Subscription sekciju ovde */}
            <Text fontSize="16px" fontWeight="600" color="#2C1338">
              Subscription Content
            </Text>
          </Box>
        );

      default:
        return null;
    }
  };

  // Dodajte ovu funkciju kako biste postavili članove kada dobijete podatke
  const setReceivedMembersData = (receivedMembersData) => {
    setMembers(receivedMembersData);
  };

  return (
    <div>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "25px",
          borderBottom: "1px solid #E2E8F0",
          paddingLeft: "20px",
          paddingRight: "25px",
          paddingTop: "20px",
          paddingBottom: "20px",
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
        <Box
          style={
            selectedSection === "workspaces" ? selectedMenuStyle : menuStyle
          }
        >
          <span onClick={() => handleSectionClick("workspaces")}>
            Workspaces
          </span>
        </Box>
        <Box
          style={selectedSection === "members" ? selectedMenuStyle : menuStyle}
        >
          <span onClick={() => handleSectionClick("members")}>
            Organization Members
          </span>
        </Box>
        <Box
          style={selectedSection === "groups" ? selectedMenuStyle : menuStyle}
        >
          <span onClick={() => handleSectionClick("groups")}>Groups</span>
        </Box>
        <Box
          style={selectedSection === "settings" ? selectedMenuStyle : menuStyle}
        >
          <span onClick={() => handleSectionClick("settings")}>Settings</span>
        </Box>
        <Box
          style={
            selectedSection === "subscription" ? selectedMenuStyle : menuStyle
          }
        >
          <span onClick={() => handleSectionClick("subscription")}>
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

      <div style={{ display: "flex", flexDirection: "column" }}>
        {renderContent()}
      </div>

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
    </div>
  );
};

export default Organization;
