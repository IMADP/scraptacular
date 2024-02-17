import { Container, Group } from '@mantine/core';
import { ClearButton } from './button-clear';
import { KeyButton } from './button-key';
import { LoadButton } from './button-load';
import { SaveButton } from './button-save';
import classes from './header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export const Header = () => {

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>

        <Group justify='left' >
          <LoadButton disabled={true} />
          <SaveButton disabled={true} />
          <ClearButton disabled={true} />
        </Group>
        <Group justify='right' >
          <KeyButton />
        </Group>
      </Container>
    </header>
  );
}