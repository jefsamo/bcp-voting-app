import { Table, ScrollArea, Text, Loader } from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import { useReadContract } from "wagmi";
import { CONTRACT_ABI, contractAddress } from "../../constants";
import { formatAddress } from "../../utils/FormatAddress";

const Voters = () => {
  const { data: voters, isLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "getAllVoters",
  });

  const rows = voters?.map((voter) => (
    <Table.Tr key={voter.voterAddress}>
      <Table.Td>{voter.name}</Table.Td>
      <Table.Td>{Number(voter.age)}</Table.Td>
      <Table.Td>{formatAddress(voter.voterAddress)}</Table.Td>
    </Table.Tr>
  ));

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={30} />
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px" }}>
      <Text size="lg" className={classes.title}>
        VOTERS
      </Text>
      <ScrollArea h={300}>
        <Table miw={700}>
          <Table.Thead className={classes.header}>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Age</Table.Th>
              <Table.Th>Address</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows!.length > 0 ? rows : "No voters"}</Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default Voters;
