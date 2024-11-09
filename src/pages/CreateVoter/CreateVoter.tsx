import { useState } from "react";
import { Button, Group, Space, Text, TextInput } from "@mantine/core";
import classes from "./input.module.css";
import { useDisclosure } from "@mantine/hooks";

const CreateVoter = () => {
  const [focusedAddress, setFocusedAddress] = useState(false);
  const [focusedAge, setFocusedAge] = useState(false);
  const [focusedName, setFocusedName] = useState(false);
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  const floatingAddress =
    address.trim().length !== 0 || focusedAddress || undefined;

  const floatingAge = age.trim().length !== 0 || focusedAge || undefined;

  const floatingName = name.trim().length !== 0 || focusedName || undefined;

  const [loading] = useDisclosure();

  return (
    <div>
      <Text size="lg" className={classes.title}>
        CREATE VOTER
      </Text>
      <TextInput
        label="Name"
        required
        classNames={classes}
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        onFocus={() => setFocusedName(true)}
        onBlur={() => setFocusedName(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floatingName}
        labelProps={{ "data-floating": floatingName }}
        w="40%"
      />
      <Space h="sm" />
      <TextInput
        label="Address"
        required
        classNames={classes}
        value={address}
        onChange={(event) => setAddress(event.currentTarget.value)}
        onFocus={() => setFocusedAddress(true)}
        onBlur={() => setFocusedAddress(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floatingAddress}
        labelProps={{ "data-floating": floatingAddress }}
        w="40%"
      />
      <Space h="sm" />
      <TextInput
        label="Age"
        required
        classNames={classes}
        value={age}
        onChange={(event) => setAge(event.currentTarget.value)}
        onFocus={() => setFocusedAge(true)}
        onBlur={() => setFocusedAge(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floatingAge}
        labelProps={{ "data-floating": floatingAge }}
        w="40%"
      />
      <Space h="sm" />
      <Group>
        <Button loading={loading}>Create</Button>
      </Group>
    </div>
  );
};

export default CreateVoter;
