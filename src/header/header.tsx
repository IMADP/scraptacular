import { Container, Divider, Group } from '@mantine/core';
import { KeyButton } from '../key/key-button';
import { ClearButton } from './header-button-clear';
import { CutButton } from './header-button-cut';
import { DownloadButton } from './header-button-download';
import { LoadButton } from './header-button-load';
import { SaveButton } from './header-button-save';
import { UploadButton } from './header-button-upload';
import classes from './header.module.css';

export const Header = () => {

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group justify='left' >
          <LoadButton />
          <SaveButton />
          <CutButton />
          <ClearButton />
          <Divider orientation="vertical" />
          <UploadButton />
          <DownloadButton />
        </Group>
        <Group justify='right' >
          <KeyButton />
        </Group>
      </Container>
    </header>
  );
}