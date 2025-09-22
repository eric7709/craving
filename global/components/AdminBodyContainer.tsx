

type Props = {
  children: React.ReactNode;
};

export default function AdminBodyContainer({ children }: Props) {
  return (
    <div className="flex-1 flex flex-col scrollbar-none p-3 overflow-y-auto">
      {children}
    </div>
  );
}
