import React, { useState, useRef } from "react";
import { AlertDialog, Button, Center, Text } from "native-base";

interface AlertProps {
  isOpen: boolean;
  title: string;
  text: string;
  onDelete: () => Promise<boolean>;
  onClose: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({
  title,
  text,
  isOpen,
  onDelete,
  onClose,
}) => {
  const cancelRef = useRef(null);

  const handleDelete = async () => {
    await onDelete();
    onClose();
  };

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header bg="gray.700">
            <Text fontFamily="heading" fontSize={14} color="white">
              {title}
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body bg="gray.700">
            <Text fontFamily="heading" fontSize={12} color="white">
              {text}
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer bg="gray.700">
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
                color="white"
              >
                <Text fontFamily="body" fontSize={12} color="white">
                  Cancelar
                </Text>
              </Button>
              <Button colorScheme="danger" onPress={handleDelete}>
                <Text fontFamily="body" fontSize={12} color="white">
                  Remover
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertComponent;
