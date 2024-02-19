import { Button } from '@mantine/core';
import { useGetContent } from 'api/use-api';
import { useKey } from '../key/key-context';

export const LoadButton = () => {
  const keyContext = useKey();
  const { error, isLoading, getContent } = useGetContent();

  return (
    <Button
      loading={isLoading}
      disabled={!keyContext.hasKey}
      color={error ? 'red' : ''}
      variant={error ? 'outline' : 'default'}
      onClick={() => getContent()} >
      Load
    </Button>
  );

}