import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { CONTRACT_ABI, contractAddress } from "../constants";
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";

const AppLayout = () => {
  const { address, isConnected } = useAccount();

  const { data: adminAddress } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "admin",
  });

  let isAdmin;
  if (address) {
    isAdmin = address === adminAddress;
  } else {
    isAdmin = false;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        // gap: "20px",
      }}
    >
      {/* {(!address || !isAdmin) && <Sidebar />} */}
      {(!isConnected || !isAdmin) && <Sidebar />}
      {isAdmin && <SidebarAdmin />}

      <div style={{ padding: "10px 10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          <ConnectButton />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
