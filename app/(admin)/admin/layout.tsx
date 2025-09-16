import Sidebar from "@/global/components/Sidebar";
type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  
  return (
    <div className="grid bg-white lg:grid-cols-[auto_1fr]">
      <Sidebar />
      {children}
    </div>
  );
}
