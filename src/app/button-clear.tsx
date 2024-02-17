import { Button } from '@mantine/core';
import { useKey } from '../key/key-context';

export const ClearButton = () => {
  const keyContext = useKey();

  return (
    <Button disabled={!keyContext.hasKey} variant="default">Clear</Button>
  );

}