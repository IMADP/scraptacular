import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useKey } from '../key/key-context';
import { DecodeForm } from './header-button-decode-form';

export interface FileName {
  name: string;
}

export const DecodeButton = () => {
  const keyContext = useKey();

  const openModal = () => {
    modals.open({
      closeOnClickOutside: true,
      withCloseButton: false,
      children: (
        <DecodeForm />
      )
    });
  }

  return (
    <Button
      disabled={!keyContext.hasKey}
      onClick={openModal}
      variant="default">
      Decode
    </Button>
  );

}