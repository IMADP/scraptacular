import { ActionIcon } from '@mantine/core';
import { IconWashDrycleanOff } from '@tabler/icons-react';
import { useContent } from 'content/content-context';
import { useKey } from '../key/key-context';

export const ClearButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();

  const onClick = () => {
    contentContext.setContent('');
  }

  return (
    <ActionIcon
      aria-label="Clear"
      title="Clear"
      variant="default"
      disabled={!keyContext.hasKey}
      onClick={onClick}
    >
      <IconWashDrycleanOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );

}