import { Button } from '@mantine/core';
import { useGetContent } from 'api/use-api';
import { useKey } from '../key/key-context';

export const LoadButton = () => {
  const keyContext = useKey();
  const { error, isLoading, getContent } = useGetContent();

  return (
    <Button disabled={!keyContext.hasKey} loading={isLoading} onClick={() => getContent} variant="default">Load</Button>
  );

}