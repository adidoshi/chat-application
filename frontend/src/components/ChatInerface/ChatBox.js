import React from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";
import { Box } from "@chakra-ui/layout";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="primary"
      color="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
