import { Button } from '@mantine/core';
import { useContent } from 'content/content-context';
import { useKey } from '../key/key-context';

export const ClearButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();

  return (
    <Button disabled={!keyContext.hasKey} onClick={() => contentContext.setContent('')} variant="default">Clear</Button>
  );

}