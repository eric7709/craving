import { useTableDataStore } from "../store/useTableDataStore";
import TableCard from "./TableCard";
import CreateTableCard from "./CreateTableCard";
import FadeInContainer from "@/global/components/FadeInContainer";

export default function TableList() {
  const { tables } = useTableDataStore();
  return (
    <FadeInContainer>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <CreateTableCard />
        {tables.map((table) => (
          <TableCard {...table} key={table.id} />
        ))}
      </div>
    </FadeInContainer>
  );
}
