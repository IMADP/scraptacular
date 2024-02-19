import { Button } from '@mantine/core';
import { useContent } from 'content/content-context';
import { useKey } from '../key/key-context';

export const ClearButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();

  const onClick = () => {
    contentContext.setContent('');
  }

  return (
    <Button
      disabled={!keyContext.hasKey}
      onClick={onClick}
      variant="default">
      Clear
    </Button>
  );

}