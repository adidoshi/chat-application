import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";

const UserBadgeItem = ({ handleFunction, user }) => {
  return (
    <>
      <Box
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        backgroundColor="pink"
        cursor="pointer"
        onClick={handleFunction}>
        {user.name}
        <CloseIcon pl={1} />
      </Box>
    </>
  );
};

export default UserBadgeItem;
