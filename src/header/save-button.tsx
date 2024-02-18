import { Button } from "@mantine/core";
import { useSaveContent } from "api/use-api";
import { useKey } from "key/key-context";

export const SaveButton = () => {
  const keyContext = useKey();
  const { error, isLoading, saveContent } = useSaveContent();

  return (
    <Button
      loading={isLoading}
      disabled={!keyContext.hasKey}
      color={error ? 'red' : ''}
      variant={error ? 'outline' : 'default'}
      onClick={() => saveContent()}>
      Save
    </Button>
  );

}