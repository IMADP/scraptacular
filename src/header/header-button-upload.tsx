import { ActionIcon } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useSaveContent } from 'api/use-api';
import { ChangeEvent, useRef } from 'react';
import { useKey } from '../key/key-context';

export const UploadButton = () => {
  const keyContext = useKey();
  const { error, isLoading, saveContent } = useSaveContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const bytes = loadEvent.target?.result as string;
      const base64 = bytes.split(',')[1];
      saveContent(base64);
    };
    reader.readAsDataURL(file);
  };

  const onClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <ActionIcon
        aria-label="Upload"
        title="Upload"
        loading={isLoading}
        disabled={!keyContext.hasKey}
        color={error ? 'red' : ''}
        variant={error ? 'outline' : 'default'}
        onClick={onClick}
      >
        <IconUpload style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );

}