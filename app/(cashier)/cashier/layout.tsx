import CashierHeader from "@/modules/Order/components/CashierHeader";

type Props = {
  children: React.ReactNode;
};

const GroupLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col ">
      <CashierHeader />
      {children}
    </div>
  );
};
export default GroupLayout;
