import { Button } from '@mantine/core';
import { useKey } from '../key/key-context';

export const LoadButton = () => {
  const keyContext = useKey();

  return (
    <Button disabled={!keyContext.hasKey} variant="default">Load</Button>
  );

}