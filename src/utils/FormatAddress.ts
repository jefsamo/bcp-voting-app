export const formatAddress = (address: string): string => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};
