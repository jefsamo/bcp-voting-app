import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  //   const currentUser = JSON.parse(localStorage.getItem("user")!);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        // gap: "20px",
      }}
    >
      <Sidebar />

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
