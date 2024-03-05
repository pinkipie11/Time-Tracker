import React, { useState, useEffect, useRef } from "react";
import style from "./clients.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

const Clients = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [filterText, setFilterText] = useState("");
  const initialRef = useRef();
  const finalRef = useRef();

  const BASE_URL = "https://1permil.com/api";

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedClient(null);
    setNewClient("");
  };

  // 1. GET: fetch all clients
  const fetchClients = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Clients`);
      if (!response.ok) {
        throw Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching clients:", error);
      throw error;
    }
  };

  // initial fetch clients
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // POST: add new client
  const addClient = async () => {
    if (newClient.trim() !== "") {
      try {
        const userId = 2; // Zamijeniti s odgovarajućim ID-em korisnika
        const response = await fetch(`${BASE_URL}/Clients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newClient,
            ApplicationUserId: userId,
          }),
        });

        if (response.ok) {
          const newClientData = await response.json();
          setClients([...clients, newClientData]);
          closeModal();
        } else {
          console.error("Error adding client:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding client:", error);
      }
    }
  };

  // PUT: update client
  const updateClient = async () => {
    if (selectedClient && newClient.trim() !== "") {
      try {
        const response = await fetch(
          `${BASE_URL}/Clients/${selectedClient.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newClient }),
          }
        );

        if (response.ok) {
          const updatedClients = clients.map((client) =>
            client.id === selectedClient.id
              ? { ...client, name: newClient }
              : client
          );
          setClients(updatedClients);
          closeModal();
        } else {
          console.error("Error updating client:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating client:", error);
      }
    }
  };

  // DELETE: delete a client
  const deleteClient = async (clientId) => {
    try {
      const response = await fetch(`${BASE_URL}/Clients/${clientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedClients = clients.filter(
          (client) => client.id !== clientId
        );
        setClients(updatedClients);
      } else {
        console.error("Error deleting client:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const editClient = (client) => {
    setSelectedClient(client);
    setNewClient(client.name);
    setIsOpen(true);
  };

  return (
    <div className={style.container}>
      <Flex
        justify="space-between"
        align="center"
        padding="0 20px"
        bg="white"
        borderBottom="1px solid #e2e8f0"
        height="50px"
      >
        <Text fontSize="20px" fontWeight="bold">
          Clients
        </Text>
        <Button
          className={style.btnAdd}
          onClick={openModal}
          bg="#3182ce"
          size="sm"
          color="white"
          borderRadius="5px"
          fontSize="15px"
          _hover={{ bg: "#1034e8" }}
        >
          + New Client
        </Button>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        padding="0 20px"
        bg="white"
        height="55px"
        borderBottom="1px solid #e2e8f0"
      >
        <Menu>
          <MenuButton
            onClick={() => {
              // Your action here
            }}
            borderColor="gray.500"
            color="#817288"
            border="1px solid gray"
            borderRadius="5px"
            fontSize="16px"
            padding="5px"
            _hover={{ bg: "gray.100" }}
          >
            Show active <ChevronDownIcon ml="1" />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                /* Handle Active action */
              }}
            >
              Active
            </MenuItem>
            <MenuItem
              onClick={() => {
                /* Handle Archived action */
              }}
            >
              Archived
            </MenuItem>
            <MenuItem
              onClick={() => {
                /* Handle Both action */
              }}
            >
              Both
            </MenuItem>
          </MenuList>
        </Menu>

        <FormControl flex="1" mr="3">
          {/* Adjusted marginRight to 5px */}
          <InputGroup borderColor="gray">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" marginLeft="15px" />
            </InputLeftElement>
            <Input
              id="search"
              name="search"
              placeholder="Find client..."
              size="md"
              sx={{
                height: "calc(2.5rem - 4px)", // ili 'calc($md-input-height - 2px)' ako imate tu varijablu definisanu
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
              width="24%"
              marginLeft="10px"
            />
          </InputGroup>
        </FormControl>
      </Flex>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedClient ? "Edit Client" : "New Client"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Client name"
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              width={"100%"}
              onClick={selectedClient ? updateClient : addClient}
            >
              {selectedClient ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div
        className={style.clientList}
        style={{
          maxHeight: "calc(100vh - 150px)",
          overflowY: "auto",
        }}
      >
        {clients.map((client) => (
          <Box
            key={client.id}
            className={style.client}
            boxShadow="0px 0px 0.1em rgba(67, 71, 85, 0.27), 0px 0.25em 1em rgba(90, 125, 188, 0.05)"
            padding="20px"
            bg="white"
            display="flex"
            gap="10px"
          >
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.100" }}
                _expanded={{ bg: "blue.400" }}
                // _focus={{ boxShadow: "outline" }}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Text fontSize="14px" fontWeight="500">
                    {client.name}
                  </Text>
                  <BsThreeDotsVertical />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem color={"blue"} onClick={() => editClient(client)}>
                  Edit
                </MenuItem>
                <MenuItem
                  color={"blue"}
                  onClick={() => deleteClient(client.id)}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Clients;
