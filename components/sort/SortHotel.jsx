"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortHotel = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const handleSortClick = (sortValue) => {
    const params = new URLSearchParams(searchParams.toString());

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
            onClick={() => handleSortClick("highToLow")}
            onChange={() => {}}
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
            onClick={() => handleSortClick("lowToHigh")}
            onChange={() => {}}
            className="mr-2 cursor-pointer"
          />
          Price Low to High
        </label>
      </form>
    </div>
  );
};

export default SortHotel;
