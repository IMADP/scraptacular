import { ActionIcon } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCut } from '@tabler/icons-react';
import { useContent } from 'content/content-context';
import { useKey } from '../key/key-context';

export const CutButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();
  const { copy } = useClipboard();

  const onClick = () => {
    copy(contentContext.content);
    contentContext.setContent('');
  }

  return (
    <ActionIcon
      aria-label="Cut"
      title="Cut"
      variant="default"
      disabled={!keyContext.hasKey}
      onClick={onClick}
    >
      <IconCut style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );

}