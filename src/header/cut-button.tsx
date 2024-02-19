import { Button } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
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
    <Button
      disabled={!keyContext.hasKey}
      onClick={onClick}
      variant="default">
      Cut
    </Button>
  );

}