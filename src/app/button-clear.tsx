import { Button } from '@mantine/core';

export interface Props {
  disabled: boolean;
}

export const ClearButton = ({ disabled }: Props) => {

  return (
    <Button disabled={disabled} variant="default">Clear</Button>
  );

}