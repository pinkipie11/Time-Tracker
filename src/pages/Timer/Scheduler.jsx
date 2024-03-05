import React from "react";
import { Flex, Text, Box, Center } from "@chakra-ui/react";
import { BsFillTagFill, BsCurrencyDollar, BsFolderFill } from "react-icons/bs";
import { AiFillDelete, AiFillPlayCircle } from "react-icons/ai";
import { FaStopCircle } from "react-icons/fa";

const Scheduler = ({ getdata, data }) => {
  return (
    <div style={{ marginLeft: "15%" }}>
      {data.length > 0 &&
        data.map((e) => {
          return (
            <Flex
              key={e.id}
              color="white"
              _hover={{ color: "#7e6e85" }}
              h="60px"
              borderBottom="2px"
              borderColor="blackAlpha.400"
              p="15px 2px 10px 15px"
              justifyContent="space-between"
            >
              <Flex gap="10px">
                <Text color="black">{e.project}</Text>
                <Center className="icon">
                  <BsFolderFill />
                </Center>
              </Flex>

              <Flex gap="15px" mr="70px">
                <Center className="icon">
                  <BsFillTagFill />
                </Center>
                <Center className="icon">
                  <BsCurrencyDollar />
                </Center>

                <Box as="div" w="160px">
                  {/* Timestamp */}
                  <Text color="black">
                    {/* {formatAMPM(new Date())}-{formatAMPM(new Date())} */}
                    {e.startTime} - {e.stopTime}
                  </Text>
                </Box>

                <Text color="black">{e.stopat}</Text>

                <Center>
                  <AiFillPlayCircle />
                  <FaStopCircle />
                </Center>
                <Center>
                  <AiFillDelete
                    onClick={() => {
                      deletedata(e.id); // You need to implement the deletedata function
                      getdata();
                    }}
                  />
                </Center>
              </Flex>
            </Flex>
          );
        })}
    </div>
  );
};

export default Scheduler;
