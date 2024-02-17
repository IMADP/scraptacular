import { Container, Group } from '@mantine/core';
import { KeyButton } from '../key/key-button';
import { ClearButton } from './button-clear';
import { LoadButton } from './button-load';
import { SaveButton } from './button-save';
import classes from './header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group justify='left' >
          <LoadButton />
          <SaveButton />
          <ClearButton />
        </Group>
        <Group justify='right' >
          <KeyButton />
        </Group>
      </Container>
    </header>
  );
}