import { ReactNode, useEffect } from "react";
import { CONTRACT_ABI, contractAddress } from "../constants";
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { address } = useAccount();

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/dashboard");
  }, [isAdmin]);

  return children;
};

export default ProtectedRoute;
