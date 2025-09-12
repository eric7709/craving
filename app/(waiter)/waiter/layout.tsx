import WaiterHeader from "@/modules/Order/components/WaiterHeader";

type Props = {
  children: React.ReactNode;
};

const GroupLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col ">
      <WaiterHeader />
      {children}
    </div>
  );
};
export default GroupLayout;
