import { Button } from '@mantine/core';

export interface Props {
  disabled: boolean;
}

export const SaveButton = ({ disabled }: Props) => {

  return (
    <Button disabled={disabled} variant="default">Save</Button>
  );

}