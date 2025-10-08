"use client";

import { useRouter, useSearchParams } from "next/navigation";

const FilterByPriceRange = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPriceRange = searchParams.get("priceRange");

  // Parse current selected ranges
  const selectedRanges = currentPriceRange ? currentPriceRange.split("|") : [];

  const priceRanges = [
    { id: "13-30", label: "$ 13 - $ 30", min: 13, max: 30 },
    { id: "30-60", label: "$ 30 - $ 60", min: 30, max: 60 },
    { id: "60-97", label: "$ 60 - $ 97", min: 60, max: 97 },
    { id: "97-152", label: "$ 97 - $ 152", min: 97, max: 152 },
    { id: "152-182", label: "$ 152 - $ 182", min: 152, max: 182 },
    { id: "182+", label: "$ 182+", min: 182, max: null },
  ];

  const handlePriceRangeChange = (rangeId) => {
    const params = new URLSearchParams(searchParams.toString());
    let updatedRanges = [...selectedRanges];

    if (updatedRanges.includes(rangeId)) {
      // Remove if already selected
      updatedRanges = updatedRanges.filter((id) => id !== rangeId);
    } else {
      // Add if not selected
      updatedRanges.push(rangeId);
    }

    if (updatedRanges.length > 0) {
      params.set("priceRange", updatedRanges.join("|"));
    } else {
      params.delete("priceRange");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form className="flex flex-col gap-2 mt-2">
        {priceRanges.map((range) => (
          <label
            key={range.id}
            htmlFor={range.id}
            className="cursor-pointer flex items-center"
          >
            <input
              type="checkbox"
              name="priceRange"
              id={range.id}
              value={range.id}
              checked={selectedRanges.includes(range.id)}
              onChange={() => handlePriceRangeChange(range.id)}
              className="mr-2 cursor-pointer"
            />
            {range.label}
          </label>
        ))}
      </form>
    </div>
  );
};

export default FilterByPriceRange;
