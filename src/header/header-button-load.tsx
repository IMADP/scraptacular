import { ActionIcon } from '@mantine/core';
import { IconBookDownload } from '@tabler/icons-react';
import { useGetContent } from 'api/use-api';
import { useContent } from 'content/content-context';
import { useKey } from '../key/key-context';

export const LoadButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();
  const { error, isLoading, getContent } = useGetContent();

  const onClick = () => {
    getContent((content) => contentContext.setContent(content));
  }

  return (
    <ActionIcon
      aria-label="Pull"
      title="Pull"
      loading={isLoading}
      disabled={!keyContext.hasKey}
      color={error ? 'red' : ''}
      variant={error ? 'outline' : 'default'}
      onClick={onClick}
    >
      <IconBookDownload style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );

}