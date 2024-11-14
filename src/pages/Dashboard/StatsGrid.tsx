import { Group, Loader, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";
import { useReadContract, useReadContracts } from "wagmi";
import { CONTRACT_ABI, contractAddress } from "../../constants";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const StatsGrid = () => {
  const voteContract = {
    address: contractAddress,
    abi: CONTRACT_ABI,
  } as const;

  const { data: multipleData, isLoading } = useReadContracts({
    contracts: [
      {
        ...voteContract,
        functionName: "getProposalCount",
      },
      {
        ...voteContract,
        functionName: "getTotalVoters",
      },
      {
        ...voteContract,
        functionName: "getAllProposals",
      },
    ],
  });

  const { data: proposals } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "getAllProposals",
  });

  const totalVotes = proposals?.reduce((acc, cur) => {
    return acc + Number(cur.voteCount);
  }, 0);

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

  const onGoingProposals = multipleData![2]?.result?.filter((proposal) => {
    return (
      Math.floor(Date.now() / 1000) >= Number(proposal.startTime) &&
      Math.floor(Date.now() / 1000) < Number(proposal.endTime)
    );
  });
  const data = [
    {
      title: "Total Proposals",
      icon: "receipt",
      value: Number(multipleData![0]?.result) || 0,
    },
    { title: "Total Votes", icon: "coin", value: totalVotes || 0, diff: -13 },
    {
      title: "Number of Voters",
      icon: "discount",
      value: Number(multipleData![1]?.result) || 0,
    },
    {
      title: "On going proposals",
      icon: "user",
      value: onGoingProposals?.length || 0,
    },
  ] as const;

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>
      </Paper>
    );
  });

  return (
    <div style={{ padding: "0 20px" }}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
};

export default StatsGrid;
