// FirstNavbar.jsx
import React from "react";
import { Box, Button, Spacer } from "@chakra-ui/react";
import style from "./reports.module.css";

const Reports = ({ onOpenModal }) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
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
            Reports
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
            Summary
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
            Detailed
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
            Weekly
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
            Saved
          </span>
        </Box>
        <Spacer />
        <Box>
          <Button
            colorScheme="blue"
            onClick={onOpenModal}
            size="sm"
            fontSize="15px"
          >
            ? ? ? ?
          </Button>
        </Box>
      </Box>
      <Box
        style={{
          borderBottom: "1px solid #E2E8F0",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "15px",
            marginTop: "8px",
            marginBottom: "8px",
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
              Team
            </Button>
            <Button
              size="sm"
              fontSize="15px"
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Client
            </Button>
            <Button
              size="sm"
              fontSize="15px"
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Project
            </Button>
            <Button
              size="sm"
              fontSize="15px"
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Tag
            </Button>
            <Button
              size="sm"
              fontSize="15px"
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Description
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Reports;
