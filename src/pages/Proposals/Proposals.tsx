import { Table, Anchor, Button, Loader } from "@mantine/core";
import { CONTRACT_ABI, contractAddress } from "../../constants";
import { useReadContract } from "wagmi";

const convertToReadableDate = (epoch: any) => {
  const date = new Date(Number(epoch) * 1000);

  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};

const Proposal = () => {
  const { data: proposals, isLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "getAllProposals",
  });

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

  const rows = proposals?.map((proposal, i) => {
    return (
      <Table.Tr key={i}>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {proposal.description}
          </Anchor>
        </Table.Td>
        <Table.Td>{Number(proposal.voteCount)}</Table.Td>
        <Table.Td>{convertToReadableDate(proposal.startTime)}</Table.Td>
        <Table.Td> {convertToReadableDate(proposal.endTime)}</Table.Td>
        <Table.Td>
          <Button
            disabled={
              !(
                Math.floor(Date.now() / 1000) >= Number(proposal.startTime) &&
                Math.floor(Date.now() / 1000) < Number(proposal.endTime)
              )
            }
          >
            Vote
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div style={{ padding: "10px 10px" }}>
      <h3>Proposals</h3>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Total Votes</Table.Th>
              <Table.Th>Start Date</Table.Th>
              <Table.Th>End Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default Proposal;
