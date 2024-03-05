import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Checkbox,
  Flex,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaRegClock, FaRegListAlt, FaDollarSign } from "react-icons/fa";
import { TimeIcon } from "@chakra-ui/icons";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

const TimeEntryModal = ({ isOpen, onClose, onAddEntry }) => {
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isBillable, setIsBillable] = useState(false);
  const [duration, setDuration] = useState("0:00:00");

  // Function to calculate duration
  const calculateDuration = (start, end) => {
    if (
      !(start instanceof Date) ||
      isNaN(start.getTime()) ||
      !(end instanceof Date) ||
      isNaN(end.getTime())
    ) {
      return "Neispravan vremenski raspon";
    }

    const diff = end - start;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // UseEffect to update duration when start or end time changes
  useEffect(() => {
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    setDuration(calculateDuration(startTime, endTime));
  }, [startTime, endTime]);

  const handleSubmit = () => {
    // Logic to process and add time entry
    const newEntry = {
      description,
      startTime,
      endTime,
      isBillable,
    };
    onAddEntry(newEntry); // Pass new entry to parent component
    onClose(); // Close modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Add Time Entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              placeholder="What have you done?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Flex align="center" justify="space-between" mt={4}>
            <Flatpickr
              data-enable-time
              value={startTime}
              onChange={([date]) => setStartTime(date)}
              options={{
                dateFormat: "Y-m-d H:i",
                enableTime: true,
                noCalendar: true,
                time_24hr: true,
              }}
            />
            <Flatpickr
              data-enable-time
              value={endTime}
              onChange={([date]) => setEndTime(date)}
              options={{
                dateFormat: "Y-m-d H:i",
                enableTime: true,
                noCalendar: true,
                time_24hr: true,
              }}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TimeEntryModal;
