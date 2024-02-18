import { Container, Divider, Group } from '@mantine/core';
import { KeyButton } from '../key/key-button';
import { ClearButton } from './clear-button';
import { CopyButton } from './copy-button';
import classes from './header.module.css';
import { LoadButton } from './load-button';
import { SaveButton } from './save-button';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group justify='left' >
          <LoadButton />
          <CopyButton />
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