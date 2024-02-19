import { Container, Divider, Group } from '@mantine/core';
import { KeyButton } from '../key/key-button';
import { ClearButton } from './header-button-clear';
import { CutButton } from './header-button-cut';
import { LoadButton } from './header-button-load';
import { SaveButton } from './header-button-save';
import classes from './header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group justify='left' >
          <LoadButton />
          <CutButton />
          <Divider orientation="vertical" />
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