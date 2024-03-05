// FirstNavbar.jsx
import React from "react";
import { Box, Button, Spacer } from "@chakra-ui/react";
import style from "./billablerates.module.css";

const BillableRates = ({ onOpenModal }) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          borderBottom: "1px solid #E2E8F0",
          // Add shadow to bottom border:
          boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
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
            General
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
            Alerts
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
            Reminders
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
            Billable rates
          </span>
        </Box>
        <Spacer />
      </Box>
    </>
  );
};

export default BillableRates;
