import React from "react";
import { Box, Text } from "@chakra-ui/react";

const TimeRecords = ({ records }) => {
  return (
    <Box mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        タイムカード記録
      </Text>
      {records.map((record, index) => (
        <Text key={index} mb={2}>
          {record.date} - {record.hours.toFixed(2)} 時間
        </Text>
      ))}
    </Box>
  );
};

export default TimeRecords;
