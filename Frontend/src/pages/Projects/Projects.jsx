import React, { useState, useEffect } from "react";
import style from "./project.module.css";
import {
  Box,
  Stack,
  Spacer,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Checkbox,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
  border,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { IoMdArrowDropdown, IoMdSwitch } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { useDisclosure } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useProjectContext } from "./ProjectProvider";
import ProjectNameModal from "./ProjectNameModal";

const BASE_URL = "https://1permil.com/api";

// Assuming fetchProjects is an asynchronous function that fetches projects from the API
const fetchProjects = async () => {
  try {
    const response = await fetch("your_api_endpoint_here");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // You might want to handle the error in a better way based on your application's requirements
  }
};

const Projects = () => {
  const [data, setData] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [isBillable, setIsBillable] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [isClientModalOpen, setClientModalOpen] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [isProjectNameModalOpen, setProjectNameModalOpen] = useState(false);

  const applicationUserId = 2;

  const { projects, setProjects } = useProjectContext();

  const handleClientModalOpen = () => {
    setClientModalOpen(true);
  };

  const handleProjectNameSubmit = (e) => {
    e.preventDefault();
    // Logika za obradu unosa imena projekta
    setProjectNameModalOpen(false);
  };

  const handleOpenProjectNameModal = () => {
    setProjectNameModalOpen(true);
  };

  useEffect(() => {
    // Dohvaćanje projekata iz API-ja i postavljanje u kontekst
    fetchProjectsFromApi().then((data) => {
      setProjects(data);
    });
  }, []);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchClientsAndProjects();
  }, []);

  const fetchClientsAndProjects = async () => {
    try {
      console.log(`${BASE_URL}/Clients`);
      const clientsResponse = await fetch(`${BASE_URL}/Clients`);
      console.log(clientsResponse.status, clientsResponse.statusText);
      const clientsData = await clientsResponse.json();
      setClients(clientsData);

      console.log(`${BASE_URL}/projects`);
      const projectsResponse = await fetch(`${BASE_URL}/projects`);
      console.log(projectsResponse.status, projectsResponse.statusText);
      const projectsData = await projectsResponse.json();
      setData(projectsData);

      console.log(projectsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error fetching data",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!newProjectName.trim()) {
      setError("Project name is required.");
      return;
    }

    const projectData = {
      name: newProjectName,
      createdDate: new Date(createdDate),
      billable: isBillable,
      applicationUserId: applicationUserId,
    };

    // If a client is selected from dropdown (except "Add New Client")
    if (selectedClientId && selectedClientId !== "new") {
      projectData.clientId = selectedClientId;
      createProject(projectData);
    }
    // If "Add New Client" is selected and the new client's name is provided
    else if (newClientName.trim()) {
      const newClient = {
        name: newClientName,
        applicationUserId: 2, // For now, static user id
      };

      fetch(`${BASE_URL}/Clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      })
        .then((response) => response.json())
        .then((client) => {
          projectData.clientId = client.id;
          createProject(projectData);
        })
        .catch((error) => {
          console.error("Error adding new client:", error);
          setError("Error adding new client. Please try again.");
        });
    } else {
      // Directly create a project if no client is provided
      createProject(projectData);
    }
  }

  const fetchProjectsFromApi = async () => {
    try {
      const response = await fetch("https://1permil.com/api/projects");

      if (!response.ok) {
        console.error(`Error fetching projects: ${response.statusText}`);
        return []; // Return a default value or handle the error appropriately
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON or empty response:", await response.text());
        return []; // Return a default value or handle the error appropriately
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };

  const createProject = (projectData) => {
    fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error posting data: ${text}`);
          });
        }
        return response.json();
      })
      .then((newProject) => {
        setData((prevData) => [...prevData, newProject]);
        setNewProjectName("");
        setSelectedClientId("");
        setNewClientName("");
        setCreatedDate("");
        setIsBillable(false);
        setError("");
        onClose();
        fetchClientsAndProjects(); // Refresh the clients and projects data
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        setError("Error creating project. Please try again.");
      });
  };

  function handleEditClick(item) {
    // For this example, I'll prompt the user to update the project's name.
    // In a real-world scenario, you might want to display a form similar to your "Create Project" modal.
    const newName = prompt("Update the project name:", item.name);
    if (newName && newName !== item.name) {
      const updatedProject = { ...item, name: newName };

      fetch(`${BASE_URL}/projects/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      })
        .then((response) => response.json())
        .then((updatedData) => {
          setData((prevData) =>
            prevData.map((project) =>
              project.id === item.id ? updatedData : project
            )
          );
          toast({
            title: "Project Updated",
            description: "The project has been updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("Error updating project:", error);
          toast({
            title: "Error updating project",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }

  function handleDeleteClick(id) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmation) {
      fetch(`${BASE_URL}/projects/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setData((prevData) =>
              prevData.filter((project) => project.id !== id)
            );
            toast({
              title: "Project Deleted",
              description: "The project has been deleted successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          } else {
            return response.text().then((text) => {
              throw new Error(`Error deleting data: ${text}`);
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
          toast({
            title: "Error deleting project",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }

  return (
    <div
      className={style.container}
      style={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      <div>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
              Projects
            </span>
          </Box>
          <Spacer />
          <Box>
            <Button
              colorScheme="blue"
              onClick={onOpen}
              size="sm"
              fontSize="15px"
            >
              + Create Project
            </Button>
          </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <ModalHeader>Create new project</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel htmlFor="name">Project name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Project name"
                    autoComplete="off"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="clientId">Client (Optional)</FormLabel>
                  <select
                    name="clientId"
                    id="clientId"
                    value={selectedClientId}
                    onChange={(e) => {
                      setSelectedClientId(e.target.value);
                      if (e.target.value) {
                        setNewClientName("");
                      }
                    }}
                    style={{ height: "40px", width: "100%" }}
                    disabled={!!newClientName}
                  >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="newClient">Add New Client</FormLabel>
                  <Input
                    type="text"
                    name="newClient"
                    id="newClient"
                    placeholder="New Client Name"
                    autoComplete="off"
                    value={newClientName}
                    onChange={(e) => {
                      setNewClientName(e.target.value);
                      if (e.target.value) {
                        setSelectedClientId("");
                      }
                    }}
                    disabled={!!selectedClientId}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="createdDate">Created Date</FormLabel>
                  <Input
                    type="date"
                    name="createdDate"
                    id="createdDate"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="billable">Billable</FormLabel>
                  <Checkbox
                    name="billable"
                    id="billable"
                    isChecked={isBillable}
                    onChange={(e) => setIsBillable(e.target.checked)}
                  >
                    Is Billable
                  </Checkbox>
                </FormControl>

                {error && (
                  <Box mt={4} color="red">
                    {error}
                  </Box>
                )}
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" width="100%">
                  Create Project
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </div>

      <div
        className={style.top2}
        style={{
          boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Menu>
          <MenuButton
            as={Button}
            righticon={<ChevronDownIcon />}
            colorScheme="blue"
            size="sm"
            fontSize="15px"
            marginTop="2px"
          >
            Show active
          </MenuButton>
          <MenuList>
            <MenuItem>Active</MenuItem>
            <MenuItem>Archived</MenuItem>
            <MenuItem>Both</MenuItem>
          </MenuList>
        </Menu>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "15px",
          }}
        >
          <Box
            style={{
              marginBottom: "0px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
                // marginLeft: "0px",
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
              _hover={{ bg: "gray.100" }}
              onClick={handleClientModalOpen}
            >
              Client
            </Button>

            <Button
              size="sm"
              fontSize="15px"
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Team
            </Button>
            <Button
              size="sm"
              fontSize="15px"
              onClick={() => setProjectNameModalOpen(true)}
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Project name
            </Button>

            <ProjectNameModal
              isOpen={isProjectNameModalOpen}
              onClose={() => setProjectNameModalOpen(false)}
              onSubmit={handleProjectNameSubmit}
            />
          </Box>
        </Box>
      </div>
      <Box width="100%" height="20px" backgroundColor="#FCF7F5" />
      <Modal
        isOpen={isClientModalOpen}
        onClose={() => setClientModalOpen(false)}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent style={{ width: "80%", maxHeight: "80vh" }}>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Box>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<SearchIcon />}
                    />
                    <Input placeholder="Find client" />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                  <Checkbox>Projects without client</Checkbox>
                </FormControl>
              </Box>
              <Flex justify="space-between" alignItems="center" marginTop="3">
                <Box fontSize="15px">
                  <Text>CLIENT</Text>
                </Box>
                <Spacer />
                <Box>
                  <Button
                    size="sm"
                    fontSize="15px"
                    bg="transparent"
                    style={{ color: "blue" }}
                    _hover={{ bg: "gray.100" }}
                  >
                    ALL
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="sm"
                    fontSize="15px"
                    bg="transparent"
                    style={{ color: "blue" }}
                    _hover={{ bg: "gray.100" }}
                  >
                    NONE
                  </Button>
                </Box>
              </Flex>
              {/* Checkbox for each client */}
              <Menu>
                <MenuButton
                  as={Button}
                  righticon={<ChevronDownIcon />}
                  colorScheme="blue"
                  size="sm"
                  fontSize="15px"
                  marginTop="2px"
                >
                  Select Clients
                </MenuButton>
                <MenuList>
                  {clients.map((client) => (
                    <MenuItem key={client.id}>
                      <Checkbox
                        onChange={(e) => {
                          const clientId = client.id;
                          if (e.target.checked) {
                            setSelectedClients((prevSelected) => [
                              ...prevSelected,
                              clientId,
                            ]);
                          } else {
                            setSelectedClients((prevSelected) =>
                              prevSelected.filter((id) => id !== clientId)
                            );
                          }
                        }}
                      >
                        {client.name}
                      </Checkbox>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              {/* Prikaz označenih klijenata */}
              <Box mt={3}>
                {selectedClients.length > 0 && (
                  <Text fontWeight="600">Selected Clients:</Text>
                )}
                {selectedClients.map((clientId) => (
                  <Box key={clientId}>
                    {clients.find((c) => c.id === clientId)?.name}
                  </Box>
                ))}
              </Box>
            </ModalBody>
          </form>
          <ModalFooter>
            {/* Dodajte gumbe ili akcije prema potrebi */}
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setClientModalOpen(false)}
            >
              Close
            </Button>
            <Button colorScheme="green">Apply Filters</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div
        className={style.top3}
        style={
          {
            // border: "1px solid blue",
          }
        }
      >
        <div>
          <Button className={style.bulkBtn} size="sm">
            <IoMdSwitch style={{ marginTop: "4px" }} />
            Bulk edit
          </Button>
        </div>
      </div>

      <Box
        className={style.container}
        style={{ width: "100%", flex: 1, overflowY: "auto" }}
      >
        {/* Column Titles */}
        <div
          className={style.columnTitles}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr) auto",
            paddingLeft: "31px",
            // paddingRight: "38px",
            marginBottom: "0px",
            paddingBottom: "10px",
            borderBottom: "1px solid #E2E8F0",
            position: "sticky", // Make the position sticky
            top: 0, // Set the top position to align with the top of the scrollable container
            background: "white", // Set a background color to avoid seeing text from scrolling content below
            zIndex: 1, // Ensure that the sticky header is above other elements - r'n'r
          }}
        >
          <div
            className={style.dataRows}
            style={{
              // border: "1px solid orange",
              padding: "5px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "13px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            PROJECT
            <IoMdArrowDropdown style={{ marginLeft: "5px" }} />
          </div>
          <div
            className={style.dataRows}
            style={{
              // border: "1px solid orange",
              padding: "5px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "13px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            CLIENT
            <IoMdArrowDropdown style={{ marginLeft: "5px" }} />
          </div>
          <div
            className={style.dataRows}
            style={{
              // border: "1px solid orange",
              padding: "5px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "13px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            TIME STATUS
            <IoMdArrowDropdown style={{ marginLeft: "5px" }} />
          </div>
          <div
            className={style.dataRows}
            style={{
              // border: "1px solid orange",
              padding: "5px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "13px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            BILLABLE STATUS
            <IoMdArrowDropdown style={{ marginLeft: "5px" }} />
          </div>
          <div
            className={style.dataRows}
            style={{
              // border: "1px solid orange",
              padding: "5px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontSize: "13px",
              fontWeight: "600",
              color: "gray",
            }}
          >
            TEAM
            <IoMdArrowDropdown style={{ marginLeft: "5px" }} />
          </div>
          <div
            className={style.dataRows}
            style={{
              // border: "1px solid orange",
              padding: "5px 18px",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "start",
              // fontSize: "13px",
              // fontWeight: "600",
              // color: "gray",
            }}
          ></div>
        </div>

        {/* Data Rows */}
        <div
          style={{
            // border: "1px solid green",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr) auto",
            paddingLeft: "30px",
          }}
        >
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <div
                style={{
                  marginTop: "5px",
                  // border: "1px solid orange",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "5px",
                  justifyContent: "start",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                <RxDotFilled
                  style={{
                    marginRight: "5px",
                    marginLeft: "-5px",
                    color: "orange",
                  }}
                />
                {item.name}
              </div>
              <div
                style={{
                  marginTop: "5px",
                  // border: "1px solid orange",
                  paddingLeft: "20px",
                  display: "flex",
                  justifyContent: "start",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                {clients.find((client) => client.id === item.clientId)?.name ||
                  "Unknown"}
              </div>
              <div
                style={{
                  marginTop: "5px",
                  // border: "1px solid orange",
                  paddingLeft: "20px",
                  display: "flex",
                  justifyContent: "start",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                0
              </div>
              <div
                style={{
                  marginTop: "5px",
                  // border: "1px solid orange",
                  paddingLeft: "20px",
                  display: "flex",
                  justifyContent: "start",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                {item.billable ? "Yes" : "No"}
              </div>
              <div
                style={{
                  marginTop: "5px",
                  // border: "1px solid orange",
                  paddingLeft: "20px",
                  display: "flex",
                  justifyContent: "start",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                Team: {item.team}
              </div>
              <Center
                style={
                  {
                    // border: "1px solid orange",
                  }
                }
              >
                <Menu>
                  <MenuButton
                    as={Box}
                    _hover={{
                      cursor: "pointer",
                      borderRadius: "5px",
                      paddingRight: "20px",
                    }}
                    style={{
                      paddingRight: "20px",
                    }}
                  >
                    <BsThreeDotsVertical />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleEditClick(item)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteClick(item)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Center>
            </React.Fragment>
          ))}
        </div>
      </Box>
    </div>
  );
};

/* <style jsx>{`
  .columnTitles,
  .dataRows {
    display: grid;
    grid-template-columns: repeat(5, 1fr) auto;
  }

  .dataRows > div {
    display: flex;
    align-items: center;
  }

  /* Media Query za male ekrane */
//   @media (max-width: 600px) {
//     .columnTitles,
//     .dataRows {
//       grid-template-columns: 1fr; // Sve kolone idu jedna ispod druge na malim ekranima
//     }
//   }
// `}</style>; */}

export default Projects;
