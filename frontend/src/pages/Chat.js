import { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import ChatBox from "../components/ChatInerface/ChatBox";
import MyChats from "../components/ChatInerface/MyChats";
import SideDrawer from "../components/ChatInerface/SideDrawer";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
