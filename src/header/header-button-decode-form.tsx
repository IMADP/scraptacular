import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useContent } from 'content/content-context';

export interface FileName {
  name: string;
}

export const DecodeForm = () => {
  const contentContext = useContent();

  const form = useForm<FileName>({
    initialValues: {
      name: ''
    },
  });

  const onSubmitHandler = form.onSubmit((fileName: FileName) => {
    const bytes = atob(contentContext.content);

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    // create a new Blob object using the ArrayBuffer
    const blob = new Blob([ab], { type: 'application/octet-stream' });

    // create a link and trigger the download
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    form.reset();
    modals.closeAll();
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <TextInput label="Name" required mt="md" {...form.getInputProps('name')} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}