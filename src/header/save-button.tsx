import { Button } from "@mantine/core";
import { useSaveContent } from "api/use-api";
import { useKey } from "key/key-context";

export const SaveButton = () => {
  const keyContext = useKey();
  const { error, isLoading, saveContent } = useSaveContent();

  return (
    <Button disabled={!keyContext.hasKey} loading={isLoading} onClick={() => saveContent()} variant="default">Save</Button>
  );

}