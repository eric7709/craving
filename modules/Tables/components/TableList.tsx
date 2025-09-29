import { useTableDataStore } from "../store/useTableDataStore";
import TableCard from "./TableCard";
import CreateTableCard from "./CreateTableCard";
import FadeInContainer from "@/global/components/FadeInContainer";

export default function TableList() {
  const { tables, searchTerm } = useTableDataStore();

  // Filter tables based on search term (case-insensitive)
  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FadeInContainer>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <CreateTableCard />
        {filteredTables.length > 0 ? (
          filteredTables.map((table) => <TableCard {...table} key={table.id} />)
        ) : searchTerm ? (
          <div className="col-span-full text-center text-sm text-gray-500 mt-4">
            No tables match your search. Try adjusting your search term.
          </div>
        ) : null}
      </div>
    </FadeInContainer>
  );
}
