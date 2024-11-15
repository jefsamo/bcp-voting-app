import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { CONTRACT_ABI, contractAddress } from "../constants";
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";

const AppLayout = () => {
  const { address } = useAccount();

  const { data: adminAddress } = useReadContract({
    abi: CONTRACT_ABI,
    address: contractAddress,
    functionName: "admin",
  });

  const isAdmin = address === adminAddress;
  console.log(isAdmin);
  console.log(address);
  console.log(isAdmin);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        // gap: "20px",
      }}
    >
      {!isAdmin && <Sidebar />}
      {isAdmin && <SidebarAdmin />}

      {/* {!adminAddress && <Sidebar />}
      {address && adminAddress && isAdmin && <SidebarAdmin />} */}

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
