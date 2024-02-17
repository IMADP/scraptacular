import { Button } from '@mantine/core';

export interface Props {
  disabled: boolean;
}

export const LoadButton = ({ disabled }: Props) => {

  return (
    <Button disabled={disabled} variant="default">Load</Button>
  );

}