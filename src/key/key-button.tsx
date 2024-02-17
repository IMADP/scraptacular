import { ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconKey } from '@tabler/icons-react';
import { KeyForm } from './key-form';

export const KeyButton = () => {

  const openModal = () => {
    modals.open({
      closeOnClickOutside: true,
      withCloseButton: false,
      children: (
        <KeyForm />
      )
    });
  }

  return (
    <ActionIcon onClick={openModal} variant="default" aria-label="Key" size="lg">
      <IconKey style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );

}