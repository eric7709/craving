import { motion } from "framer-motion";
import CustomerCard from "./CustomerCard";
import { useCustomerDataStore } from "../store/useCustomerDataStore";
import FadeInContainer from "@/global/components/FadeInContainer";

export default function CustomerList() {
  const { customers, isLoading } = useCustomerDataStore();

  if (isLoading) return null;

  return (
    <FadeInContainer>
      <div
        className={`gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ${
          customers.length >= 1 ? "grid" : "hidden"
        }`}
      >
        {customers.map((customer) => (
          <CustomerCard customer={customer} key={customer.id} />
        ))}
      </div>

      <div
        className={`${
          customers.length == 0 ? "grid place-content-center" : "hidden"
        } flex-1`}
      >
        <p>No result found - Try adjusting your search</p>
      </div>
    </FadeInContainer>
  );
}
