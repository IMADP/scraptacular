import { Button } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { useContent } from 'content/content-context';
import { useKey } from '../key/key-context';

export const CopyButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();
  const { copy } = useClipboard();

  const onCopy = () => {
    copy(contentContext.content);
    contentContext.setContent('');
  }

  return (
    <Button disabled={!keyContext.hasKey} onClick={onCopy} variant="default">Copy</Button>
  );

}