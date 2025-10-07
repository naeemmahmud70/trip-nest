"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortHotel = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const handleSortChange = (sortValue) => {
    const params = new URLSearchParams(searchParams.toString());

    // If the same value is clicked again, remove it (uncheck)
    if (currentSort === sortValue) {
      params.delete("sort");
    } else {
      params.set("sort", sortValue);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form className="flex flex-col gap-2 mt-2">
        <label htmlFor="highToLow" className="cursor-pointer">
          <input
            type="radio"
            name="sort"
            id="highToLow"
            value="highToLow"
            checked={currentSort === "highToLow"}
            onChange={() => handleSortChange("highToLow")}
            className="mr-2 cursor-pointer"
          />
          Price High to Low
        </label>

        <label htmlFor="lowToHigh" className="cursor-pointer">
          <input
            type="radio"
            name="sort"
            id="lowToHigh"
            value="lowToHigh"
            checked={currentSort === "lowToHigh"}
            onChange={() => handleSortChange("lowToHigh")}
            className="mr-2 cursor-pointer"
          />
          Price Low to High
        </label>
      </form>
    </div>
  );
};

export default SortHotel;
