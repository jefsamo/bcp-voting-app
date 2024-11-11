import { useEffect, useState } from "react";
import { Button, Group, Space, Text, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

import classes from "./input.module.css";
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, contractAddress } from "../../constants";
import toast from "react-hot-toast";

const CreateProposal = () => {
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();
  const [focused, setFocused] = useState(false);
  const [focusedDescription, setFocusedDescription] = useState(false);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const floating = value.trim().length !== 0 || focused || undefined;
  const floatingDescription =
    description.trim().length !== 0 || focusedDescription || undefined;

  const startDateEpoch = Math.floor(startDate?.getTime()! / 1000);
  const endDateEpoch = Math.floor(endDate?.getTime()! / 1000);

  const options = value.split(",");

  const createProposal = () => {
    writeContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: "createProposal",
      args: [
        description,
        BigInt(startDateEpoch),
        BigInt(endDateEpoch),
        options,
      ],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Proposal created successfully");
      setDescription("");
      setValue("");
      setStartDate(null);
      setEndDate(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("There was a problem creating proposal");
    }
  }, [isError]);

  return (
    <>
      <Text size="lg" className={classes.title}>
        CREATE PROPOSAL
      </Text>
      <TextInput
        label="Description"
        required
        classNames={classes}
        value={description}
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
      <DateTimePicker
        label="Start date"
        placeholder="Pick date and time"
        w="40%"
        value={startDate}
        onChange={setStartDate}
      />
      <Space h="sm" />
      <DateTimePicker
        label="End date"
        placeholder="Pick date and time"
        w="40%"
        value={endDate}
        onChange={setEndDate}
      />
      <Space h="sm" />
      <Group>
        <Button
          loading={isPending}
          disabled={!value || !description || !startDate || !endDate}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            createProposal();
          }}
        >
          Create
        </Button>
      </Group>
    </>
  );
};

export default CreateProposal;
