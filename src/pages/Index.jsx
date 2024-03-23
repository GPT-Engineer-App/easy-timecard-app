import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Stack, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { FaClock, FaRegClock, FaHistory, FaUser } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleLogin = () => {
    // Perform login validation here
    setIsLoggedIn(true);
  };

  const handleClockIn = () => {
    setClockedIn(true);
    setClockInTime(new Date());
  };

  const handleClockOut = () => {
    setClockedIn(false);
    const clockOutTime = new Date();
    const hoursDiff = (clockOutTime - clockInTime) / 3600000; // Convert ms to hours
    setTotalHours(totalHours + hoursDiff);
    setClockInTime(null);
  };

  const handleManualAdjustment = () => {
    // Perform manual adjustment logic here
    onClose();
    toast({
      title: "Hours adjusted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (!isLoggedIn) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Heading mb={6} textAlign="center">
            Time Card Login
          </Heading>
          <Stack spacing={4}>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </Stack>
        </Box>
      </Flex>
    );
  }

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading>Time Card Dashboard</Heading>
        <Button leftIcon={<FaUser />}>Profile</Button>
      </Flex>
      <Box mb={8} p={4} borderWidth={1} borderRadius={8}>
        <Heading as="h2" size="xl" mb={4}>
          {clockedIn ? "Clocked In" : "Clocked Out"}
        </Heading>
        <Text fontSize="3xl" mb={4}>
          Total Hours: {totalHours.toFixed(2)}
        </Text>
        <Button colorScheme="green" size="lg" leftIcon={clockedIn ? <FaRegClock /> : <FaClock />} onClick={clockedIn ? handleClockOut : handleClockIn}>
          {clockedIn ? "Clock Out" : "Clock In"}
        </Button>
      </Box>
      <Flex justifyContent="space-between">
        <Button leftIcon={<FaHistory />} onClick={onOpen}>
          Adjust Hours
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adjust Hours</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input type="time" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input type="time" />
            </FormControl>
            <Button mt={6} colorScheme="blue" onClick={handleManualAdjustment}>
              Adjust
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
