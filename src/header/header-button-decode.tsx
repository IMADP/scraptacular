import { Button } from '@mantine/core';
import { useContent } from 'content/content-context';
import { useKey } from '../key/key-context';

export const DecodeButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();

  const onClick = () => {
    const bytes = atob(contentContext.content);

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    // create a new Blob object using the ArrayBuffer
    const blob = new Blob([ab], { type: 'application/octet-stream' });

    // create a link and trigger the download
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'scrap';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      disabled={!keyContext.hasKey}
      onClick={onClick}
      variant="default">
      Decode
    </Button>
  );

}