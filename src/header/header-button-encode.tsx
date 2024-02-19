import { Button } from '@mantine/core';
import { useContent } from 'content/content-context';
import { ChangeEvent, useRef } from 'react';
import { useKey } from '../key/key-context';

export const EncodeButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();
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
      contentContext.setContent(base64);
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
      <Button
        disabled={!keyContext.hasKey}
        onClick={onClick}
        variant="default">
        Encode
      </Button>
    </>
  );

}