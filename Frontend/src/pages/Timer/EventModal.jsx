import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventModal = ({ isOpen, onClose, event, onSave }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [measuredTime, setMeasuredTime] = useState(event?.measuredTime || "");
  const [project, setProject] = useState(event?.projectName || "");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStart(new Date(event.start));
      setEnd(new Date(event.end));
      setProject(event.projectName || "");
    }
  }, [event]);

  const handleSave = () => {
    onSave({
      ...event,
      title,
      start,
      end,
      measuredTime,
      projectName: project, // Dodajte projekt u podatke događaja
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{event ? "Edit Event" : "Create Event"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="event-title">
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </FormControl>
          <FormControl id="event-start">
            <FormLabel>Start Time</FormLabel>
            <DatePicker
              selected={start}
              onChange={(date) => setStart(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </FormControl>
          <FormControl id="event-end">
            <FormLabel>End Time</FormLabel>
            <DatePicker
              selected={end}
              onChange={(date) => setEnd(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </FormControl>
          <FormControl id="event-measured-time">
            <FormLabel></FormLabel>
            <Input
              value={measuredTime}
              onChange={(e) => setMeasuredTime(e.target.value)}
              placeholder="Unesite izmjereno vrijeme (npr. 1h 30m)"
            />
          </FormControl>
        </ModalBody>
        <FormControl id="event-project">
          <FormLabel>Projekt</FormLabel>
          <Input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Unesite naziv projekta"
          />
        </FormControl>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
