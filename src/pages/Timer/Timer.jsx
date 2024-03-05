import React, { useRef, useState, useEffect } from "react";
import SubNav from "./SubNav";
import CalendarView from "./CalendarView";
import { useTimeContext } from "./TimeContext";
import { useProjectContext } from "../Projects/ProjectProvider";
import {
  Select,
  Stack,
  Box,
  Spacer,
  Text,
  List,
  ListItem,
  Flex,
  useToast,
  Tooltip,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  AiFillPlayCircle,
  AiOutlineFolderAdd,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { MdStopCircle } from "react-icons/md";
import { BsFolderFill, BsFillTagFill, BsCurrencyDollar } from "react-icons/bs";
import moment from "moment";

const Timer = () => {
  const [text, setText] = useState("");
  const [projectList, setProjectList] = useState([]);
  const { count, incrementCount } = useTimeContext();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [tariffRate, setTariffRate] = useState(0);
  const [modalSelectedProject, setModalSelectedProject] = useState(null);

  const id = useRef(null);
  const toast = useToast();
  const {
    watch,
    setWatch,
    isRunning,
    setIsRunning,
    formatTime,
    formatHourAndMinute,
  } = useTimeContext();

  const { addCalendarEvent } = useTimeContext();
  const { projects, addProject } = useProjectContext();

  <Select
    placeholder="Select a Project"
    value={selectedProject}
    onChange={(e) => setSelectedProject(e.target.value)}
  >
    {projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ))}
  </Select>;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Update the selected project when "Bind" button is clicked
  const bindProject = () => {
    const project = projects.find((p) => p.id === parseInt(selectedProject));
    setSelectedProjectData(project);
    closeModal();
  };

  // Add useEffect to update the selected project in the modal
  useEffect(() => {
    const foundProject = projects.find(
      (project) => project.id === parseInt(selectedProject)
    );
    setModalSelectedProject(foundProject);
  }, [selectedProject, projects]);

  useEffect(() => {
    if (!isRunning && startTime) {
      const endTime = new Date();
      const timeEntry = {
        id: Date.now(),
        description: text,
        start: startTime,
        end: endTime,
        project: selectedProjectData ? selectedProjectData.name : "No Project",
      };

      if (endTime.getTime() !== startTime.getTime()) {
        addCalendarEvent(timeEntry);
        setProjectList([...projectList, timeEntry]);
        setStartTime(null);
      }
    }
  }, [
    isRunning,
    startTime,
    text,
    selectedProjectData,
    addCalendarEvent,
    projectList,
  ]);

  const start = () => {
    if (!isRunning) {
      setStartTime(new Date());
      id.current = setInterval(() => {
        setWatch((prevWatch) => prevWatch + 1);
      }, 1000);
      setIsRunning(true);

      const selectedProjectData = projects.find(
        (project) => project.id === selectedProject
      );
      if (selectedProjectData) {
        setSelectedProjectData(selectedProjectData);
      }
    }
  };

  const stop = () => {
    if (isRunning) {
      clearInterval(id.current);
      id.current = null;

      // Check if startTime is not null before formatting
      if (startTime) {
        const endTime = new Date();

        const timeEntry = {
          id: Date.now(),
          Description: text,
          StartTime: startTime.toISOString(),
          EndTime: endTime.toISOString(),
          Project: selectedProject,
        };

        console.log(
          `${timeEntry.Description} ${moment(timeEntry.StartTime).format(
            "HH:mm"
          )} - ${moment(timeEntry.EndTime).format("HH:mm")}`
        );

        const newCalendarEvent = {
          id: timeEntry.id,
          title: timeEntry.Description,
          start: startTime,
          end: endTime,
        };

        addCalendarEvent(newCalendarEvent);

        const entries = JSON.parse(localStorage.getItem("timeEntries") || "[]");
        entries.push(timeEntry);
        localStorage.setItem("timeEntries", JSON.stringify(entries));
        setProjectList([...projectList, timeEntry]);

        setIsRunning(false);
        setWatch(0);
        setText("");
        setSelectedProject("");
      } else {
        // Handle the case where startTime is null
        console.error("Error: startTime is null");
        // Optionally, you can show a toast or other feedback to the user
        // indicating that there was an issue stopping the timer.
      }
    }
  };

  const handleAddProject = () => {
    if (newProjectName && tariffRate >= 0) {
      addProject({
        name: newProjectName,
        tariffRate: tariffRate,
      });

      setNewProjectName("");
      setTariffRate(0);
      closeModal();
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid project name and tariff rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSelectProject = (e) => {
    const selectedId = e.target.value;
    setSelectedProject(selectedId);
    const project = projects.find((p) => p.id === parseInt(selectedId));
    setSelectedProjectData(project);
  };

  const bindProjectToEvent = () => {
    // Pretpostavimo da imate funkciju koja dodaje novi događaj
    addEvent({
      title: text,
      start: startTime,
      end: new Date(), // Ili neko drugo završno vrijeme
      projectName: selectedProjectData ? selectedProjectData.name : null,
    });

    console.log("Odabrani projekt:", selectedProjectData);
    // Zatvorite modal, očistite stanje itd.
    closeModal();
    // Ostale akcije za resetiranje stanja
  };

  return (
    <div>
      <Stack direction="row" gap="20px">
        <Box w="100%">
          <Box
            px="2%"
            w="100%"
            h="80px"
            gap="2%"
            display="flex"
            alignItems="center"
            boxShadow="md"
            style={{
              borderBottom: "1px solid #E2E8F0",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <input
              style={{
                border: "none",
                backgroundColor: "transparent",
                resize: "none",
                outline: "none",
                fontSize: "18px",
                fontWeight: "500",
                fontColor: "#7e6e85",
              }}
              aria-label="Description"
              placeholder="What are you working on?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Spacer />
            <Box
              display="flex"
              alignItems="center"
              gap="15px"
              style={{ marginLeft: "auto" }}
            >
              <Tooltip
                label="Add a project, task, or client"
                placement="bottom"
                bg="white"
                color="gray.800"
                fontSize="md"
                px="3"
                py="1"
                borderRadius="md"
                boxShadow="md"
              >
                <span>
                  <BsFolderFill
                    color="#7e6e85"
                    size="18px"
                    onClick={openModal}
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </Tooltip>
              <Tooltip
                label="Set billable rate"
                placement="bottom"
                bg="white"
                color="gray.800"
                fontSize="md"
                px="3"
                py="1"
                borderRadius="md"
                boxShadow="md"
              >
                <span>
                  <BsFillTagFill color="#7e6e85" size="18px" />
                </span>
              </Tooltip>
              <Tooltip
                label="Set billable rate"
                placement="bottom"
                bg="white"
                color="gray.800"
                fontSize="md"
                px="3"
                py="1"
                borderRadius="md"
                boxShadow="md"
              >
                <span>
                  <BsCurrencyDollar color="#7e6e85" size="18px" />
                </span>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" gap="20px">
              <Tooltip
                label="Elapsed Time"
                placement="bottom"
                bg="white"
                color="gray.800"
                fontSize="md"
                px="3"
                py="1"
                borderRadius="md"
                boxShadow="md"
              >
                <Box>
                  <Text fontSize="24px" fontWeight="bold" color="#333">
                    {formatTime(watch)}
                  </Text>
                </Box>
              </Tooltip>
              <Box display="flex" alignItems="center" gap="20px">
                {isRunning ? (
                  <MdStopCircle
                    role="img"
                    aria-label="Stop Timer"
                    size="60px"
                    color="#EF4444"
                    cursor="pointer"
                    onClick={stop}
                  />
                ) : (
                  <Tooltip
                    label="Start Timer"
                    placement="bottom"
                    bg="white"
                    color="gray.800"
                    fontSize="md"
                    px="3"
                    py="1"
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <span>
                      <AiFillPlayCircle
                        role="img"
                        aria-label="Start Timer"
                        size="60px"
                        color="#3182CE"
                        cursor="pointer"
                        onClick={start}
                      />
                    </span>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
          <SubNav count={count} data={projectList} />
          <CalendarView selectedProject={selectedProjectData} />
          <List>
            {projectList.map((project) => (
              <ListItem key={project.id}>
                <Flex justify="space-between" align="center">
                  <strong style={{ margin: "0 10px" }}>
                    {project.Description}
                  </strong>
                  <Box style={{ margin: "0 10px" }}>
                    {moment(project.StartTime).format("HH:mm")} -{" "}
                    {moment(project.EndTime).format("HH:mm")}{" "}
                    {formatHourAndMinute(project.elapsedTime)}
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose a Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select a Project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button colorScheme="green" onClick={bindProject}>
              Bind Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Timer;
