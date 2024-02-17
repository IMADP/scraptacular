import { ActionIcon } from '@mantine/core';
import { IconKey } from '@tabler/icons-react';

export const KeyButton = () => {

  return (
    <ActionIcon variant="default" aria-label="Settings">
      <IconKey style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );

}