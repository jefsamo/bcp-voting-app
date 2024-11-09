import { Space, Text } from "@mantine/core";
import { useReadContract } from "wagmi";
import StatsGrid from "./StatsGrid";
import classes from "./StatsGrid.module.css";
import { CONTRACT_ABI, contractAddress } from "../../constants";

const Dashboard = () => {
  const { data, isLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "getProposalCount",
  });
  if (isLoading) {
    return <>Loading...</>;
  }

  console.log(data);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <div>
          <Text size="lg" className={classes.title}>
            DASHBOARD
          </Text>
        </div>
      </div>
      <Space h="md" />
      <StatsGrid />
    </>
  );
};

export default Dashboard;
