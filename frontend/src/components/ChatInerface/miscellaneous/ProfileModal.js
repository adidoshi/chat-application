import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { IconButton } from "@chakra-ui/button";
import { ViewIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          bg="#657786"
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            bg="#15202B"
            color="white"
            fontSize="40px"
            fontFamily="Poppins"
            d="flex"
            justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody
            bg="#15202B"
            color="white"
            d="flex"
            flexDir="column"
            justifyContent="space-between"
            alignItems="center">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text>{user.email}</Text>
          </ModalBody>

          <ModalFooter bg="#15202B" color="white">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
