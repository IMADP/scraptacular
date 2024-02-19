import { ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconDownload } from '@tabler/icons-react';
import { useGetContent } from 'api/use-api';
import { useKey } from '../key/key-context';
import { DownloadForm } from './header-button-download-form';

export interface FileName {
  name: string;
}

export const DownloadButton = () => {
  const keyContext = useKey();
  const { error, isLoading, getContent } = useGetContent();

  const onClick = () => {
    getContent((content) => {
      modals.open({
        closeOnClickOutside: true,
        withCloseButton: false,
        children: (
          <DownloadForm content={content} />
        )
      });
    });
  }

  return (
    <ActionIcon
      aria-label="Download"
      title="Download"
      loading={isLoading}
      disabled={!keyContext.hasKey}
      color={error ? 'red' : ''}
      variant={error ? 'outline' : 'default'}
      onClick={onClick}
    >
      <IconDownload style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );

}