import { Button } from '@mantine/core';
import { useKey } from '../key/key-context';

export const SaveButton = () => {
  const keyContext = useKey();

  return (
    <Button disabled={!keyContext.hasKey} variant="default">Save</Button>
  );

}