export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="border rounded-lg shadow-md p-4">{children}</div>;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-2">{children}</div>;
};
