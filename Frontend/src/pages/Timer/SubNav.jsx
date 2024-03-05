import React, { useEffect, useState } from "react";
import { getTimeEntries } from "./localStorageService"; // Ažurirajte putanju prema potrebi
import {
  Center,
  Flex,
  Box,
  Text,
  Spacer,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { AiFillSetting, AiOutlineDown } from "react-icons/ai"; // Import any icons you are using

const SubNav = () => {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  // const time = "Some value";

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getTimeEntries();
      setEntries(fetchedEntries);
    };

    fetchEntries();
  }, []);

  // Ovdje možete dodati logiku za prikazivanje vremenskih unosa, filtriranje po datumu, itd.
  // Na primjer, prikaz ukupnog vremena za ovaj tjedan:
  const getTotalTimeForWeek = () => {
    // Initialize the total time in milliseconds
    let totalTime = 0;

    // Iterate over each entry
    entries.forEach((entry) => {
      // Convert start and end times to Date objects if they are not already
      const startTime = new Date(entry.startTime);
      const endTime = new Date(entry.endTime);

      // Calculate the duration for each entry
      const duration = endTime - startTime; // This will give duration in milliseconds

      // Add the duration to the total time
      totalTime += duration;
    });
    const totalTimeInHours = Number((totalTime / (1000 * 60 * 60)).toFixed(2));

    return totalTimeInHours;
  };

  return <div></div>;
};

export default SubNav;
