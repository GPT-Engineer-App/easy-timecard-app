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
          {record.date} - {Math.floor(record.hours)}時間 {Math.floor((record.hours * 60) % 60)}分 {Math.floor((record.hours * 3600) % 60)}秒
        </Text>
      ))}
    </Box>
  );
};

export default TimeRecords;
