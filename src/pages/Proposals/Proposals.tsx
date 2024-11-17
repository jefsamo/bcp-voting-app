import {
  Table,
  Anchor,
  Button,
  Loader,
  Modal,
  Select,
  Space,
  Badge,
} from "@mantine/core";
import { CONTRACT_ABI, contractAddress } from "../../constants";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const convertToReadableDate = (epoch: BigInt): string => {
  const date = new Date(Number(epoch) * 1000);
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};

const Proposals = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState("");
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const { address } = useAccount();
  const [currentProposal, setCurrentProposal] = useState<number>(0);

  const { data: proposals, isLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "getAllProposals",
  });

  const { data: singleProposal, isLoading: singleProposalLoading } =
    useReadContract({
      abi: CONTRACT_ABI,
      address: contractAddress,
      functionName: "viewProposal",
      args: [BigInt(currentProposal!)],
    });

  const { data: voterExist } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "voterExist",
    args: [`0x${address?.slice(2)}`],
  });
  const { data: optionsVotes } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "getOptionVotes",
    args: [BigInt(currentProposal!)],
  });

  const options = optionsVotes && optionsVotes[0];
  const values = optionsVotes && optionsVotes[1];

  const currentTime = Math.floor(Date.now() / 1000);

  const hasProposalEnded =
    singleProposal && currentTime > Number(singleProposal![4]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Voted successfully");
      close();
    }
  }, [isSuccess]);

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

  const vote = () => {
    writeContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: "vote",
      args: [BigInt(currentProposal ?? 0), searchValue],
    });
  };
  let ongoing;
  // Check for proposals existence before attempting to map them
  const rows = proposals?.map((proposal, i) => {
    ongoing =
      currentTime >= Number(proposal?.startTime) &&
      currentTime < Number(proposal?.endTime);

    return (
      <Table.Tr key={i}>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {proposal?.description ?? "--"}
          </Anchor>
        </Table.Td>
        <Table.Td>{Number(proposal?.voteCount) ?? 0}</Table.Td>
        <Table.Td>
          {convertToReadableDate(proposal?.startTime) ?? "--"}
        </Table.Td>
        <Table.Td>{convertToReadableDate(proposal?.endTime) ?? "--"}</Table.Td>
        <Table.Td>
          <Badge
            color={
              currentTime < Number(proposal?.startTime)
                ? "gray"
                : ongoing
                  ? "green"
                  : "red"
            }
          >
            {currentTime < Number(proposal?.startTime)
              ? "Not started"
              : ongoing
                ? "Live"
                : "Ended"}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Button
            onClick={() => {
              open();
              setCurrentProposal(i);
            }}
          >
            View
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
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows?.length ? rows : "No proposals"}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Modal opened={opened} onClose={close} title="Proposal" centered>
        {!singleProposalLoading && !hasProposalEnded && (
          <>
            <Select
              label={singleProposal && singleProposal![0]}
              placeholder="Pick value"
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              data={singleProposal && singleProposal![5]}
              searchable
            />
            <Space h="md" />
            <Button
              loading={isPending}
              disabled={!ongoing || !voterExist}
              onClick={(e) => {
                e.preventDefault();
                vote();
              }}
            >
              Vote
            </Button>
          </>
        )}
        {hasProposalEnded && (
          <>
            {singleProposal && singleProposal[0]}
            {options?.map((option, i) => {
              return (
                <p key={i}>
                  {option} {values![i].toString()}
                </p>
              );
            })}
          </>
        )}

        {singleProposalLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader size={20} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Proposals;
