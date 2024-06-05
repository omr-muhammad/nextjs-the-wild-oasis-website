import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

const maxCapacityFilter = {
  small: (cabin) => cabin.maxCapacity <= 3,
  medium: (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7,
  large: (cabin) => cabin.maxCapacity >= 8,
};

export default async function CabinsList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins;
  if (filter === "all") filteredCabins = cabins;
  else filteredCabins = cabins.filter(maxCapacityFilter[filter]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
