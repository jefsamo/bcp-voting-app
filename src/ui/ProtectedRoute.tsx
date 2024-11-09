import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  return children;
};

export default ProtectedRoute;
