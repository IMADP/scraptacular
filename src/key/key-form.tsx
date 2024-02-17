import { Button, Group, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { Key, useKey } from "./key-context";

export const KeyForm = () => {
  const keyContext = useKey();

  const form = useForm<Key>({
    initialValues: {
      name: '',
      password: ''
    },
  });

  const onSubmitHandler = form.onSubmit((key: Key) => {
    keyContext.updateKey(key);
    form.reset();
    modals.closeAll();
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <PasswordInput label="Name" required mt="md" {...form.getInputProps('name')} />
      <PasswordInput label="Password" required mt="md" {...form.getInputProps('password')} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}