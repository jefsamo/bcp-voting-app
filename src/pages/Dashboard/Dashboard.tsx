import { Space, Text } from "@mantine/core";
import StatsGrid from "./StatsGrid";
import classes from "./StatsGrid.module.css";

const Dashboard = () => {
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
