import { Button, Input, Modal, VStack } from "native-base";
import React, { useCallback, useState } from "react";
import { UserStatus } from "../../types";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: UserStatus | string) => void;
  currentStatus: UserStatus | string;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentStatus,
}) => {
  const [status, setStatus] = useState<string>(
    currentStatus || UserStatus.Available
  );

  const handleSubmit = useCallback(() => {
    onSubmit(status);
    onClose();
  }, [onSubmit, onClose, status]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Update Status</Modal.Header>
        <Modal.Body>
          <VStack space={4} width="100%">
            <Input
              placeholder="Enter status or type a custom one"
              value={status}
              onChangeText={setStatus}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={handleSubmit}>Update</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
