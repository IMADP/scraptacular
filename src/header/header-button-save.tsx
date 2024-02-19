import { ActionIcon } from "@mantine/core";
import { IconBookUpload } from "@tabler/icons-react";
import { useSaveContent } from "api/use-api";
import { useContent } from "content/content-context";
import { useKey } from "key/key-context";

export const SaveButton = () => {
  const keyContext = useKey();
  const contentContext = useContent();
  const { error, isLoading, saveContent } = useSaveContent();

  const onClick = () => {
    saveContent(contentContext.content);
  }

  return (
    <ActionIcon
      aria-label="Push"
      title="Push"
      loading={isLoading}
      disabled={!keyContext.hasKey}
      color={error ? 'red' : ''}
      variant={error ? 'outline' : 'default'}
      onClick={onClick}
    >
      <IconBookUpload style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );

}