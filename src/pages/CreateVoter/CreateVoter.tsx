import { useEffect, useState } from "react";
import { Button, Group, Space, Text, TextInput } from "@mantine/core";
import classes from "./input.module.css";
// import { useDisclosure } from "@mantine/hooks";
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, contractAddress } from "../../constants";
import toast from "react-hot-toast";

const CreateVoter = () => {
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

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

  // const [loading] = useDisclosure();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Voter created successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.success("There was a problem creating voter");
    }
  }, [isError]);

  const createVoter = () => {
    writeContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: "registerVoter",
      args: [`0x${address.slice(2)}`, name, BigInt(age)],
    });
  };
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
        <Button
          loading={isPending}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            createVoter();
          }}
          disabled={!address || !name || !age}
        >
          Create
        </Button>
      </Group>
    </div>
  );
};

export default CreateVoter;
