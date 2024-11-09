import { useState } from "react";
import { Button, Group, Space, Text, TextInput } from "@mantine/core";
import classes from "./input.module.css";
import { useDisclosure } from "@mantine/hooks";

const CreateProposal = () => {
  const [focused, setFocused] = useState(false);
  const [focusedDescription, setFocusedDescription] = useState(false);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const floating = value.trim().length !== 0 || focused || undefined;
  const floatingDescription =
    description.trim().length !== 0 || focusedDescription || undefined;

  const [loading] = useDisclosure();

  return (
    <>
      <Text size="lg" className={classes.title}>
        CREATE PROPOSAL
      </Text>
      <TextInput
        label="Description"
        required
        classNames={classes}
        value={value}
        onChange={(event) => setDescription(event.currentTarget.value)}
        onFocus={() => setFocusedDescription(true)}
        onBlur={() => setFocusedDescription(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floatingDescription}
        labelProps={{ "data-floating": floatingDescription }}
        w="40%"
      />
      <Space h="sm" />
      <TextInput
        label="Options"
        required
        classNames={classes}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floating}
        labelProps={{ "data-floating": floating }}
        w="40%"
      />
      <Space h="sm" />
      <Group>
        <Button loading={loading}>Create</Button>
      </Group>
    </>
  );
};

export default CreateProposal;
