import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Stack, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { FaClock, FaRegClock, FaHistory, FaUser } from "react-icons/fa";
import TimeRecords from "../components/TimeRecords";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [timeRecords, setTimeRecords] = useState([]);
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
    const secondsDiff = Math.floor((clockOutTime - clockInTime) / 1000);
    setTotalHours(totalHours + secondsDiff);
    setClockInTime(null);

    const newRecord = {
      date: clockOutTime.toLocaleDateString(),
      hours: secondsDiff / 3600,
    };
    setTimeRecords([...timeRecords, newRecord]);
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
            タイムカードログイン
          </Heading>
          <Stack spacing={4}>
            <Input placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button colorScheme="blue" onClick={handleLogin}>
              ログイン
            </Button>
          </Stack>
        </Box>
      </Flex>
    );
  }

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading>タイムカードダッシュボード</Heading>
        <Button leftIcon={<FaUser />}>Profile</Button>
      </Flex>
      <Box mb={8} p={4} borderWidth={1} borderRadius={8}>
        <Heading as="h2" size="xl" mb={4}>
          {clockedIn ? "出勤中" : "退勤中"}
        </Heading>
        <Text fontSize="3xl" mb={4}>
          合計時間: {Math.floor(totalHours / 3600)}時間 {Math.floor((totalHours % 3600) / 60)}分 {totalHours % 60}秒
        </Text>
        <Button colorScheme="green" size="lg" leftIcon={clockedIn ? <FaRegClock /> : <FaClock />} onClick={clockedIn ? handleClockOut : handleClockIn}>
          {clockedIn ? "退勤" : "出勤"}
        </Button>
      </Box>
      <Flex justifyContent="space-between">
        <Button leftIcon={<FaHistory />} onClick={onOpen}>
          時間調整
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>時間調整</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>日付</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>開始時間</FormLabel>
              <Input type="time" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>終了時間</FormLabel>
              <Input type="time" />
            </FormControl>
            <Button mt={6} colorScheme="blue" onClick={handleManualAdjustment}>
              調整
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <TimeRecords records={timeRecords} />
    </Box>
  );
};

export default Index;
