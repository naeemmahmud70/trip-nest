"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterByAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentAmenities = searchParams.get("amenities");

  // Parse current selected amenities
  const selectedAmenities = currentAmenities ? currentAmenities.split("|") : [];

  useEffect(() => {
    async function fetchAmenities() {
      const res = await fetch("/api/amenities");
      const data = await res.json();
      if (data?.success) {
        setAmenities(data);
      }
    }

    fetchAmenities();
  }, []);

  const handleAmenityChange = (amenityId) => {
    const params = new URLSearchParams(searchParams.toString());
    let updatedAmenities = [...selectedAmenities];

    if (updatedAmenities.includes(amenityId)) {
      // Remove if already selected
      updatedAmenities = updatedAmenities.filter((id) => id !== amenityId);
    } else {
      // Add if not selected
      updatedAmenities.push(amenityId);
    }

    if (updatedAmenities.length > 0) {
      params.set("amenities", updatedAmenities.join("|"));
    } else {
      params.delete("amenities");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form className="flex flex-col gap-2 mt-2">
        {amenities?.data?.map((item) => (
          <label
            htmlFor={item.id}
            key={item.id}
            className="cursor-pointer flex items-center"
          >
            <input
              type="checkbox"
              name="amenities"
              id={item.id}
              value={item.id}
              checked={selectedAmenities.includes(item.id.toString())}
              onChange={() => handleAmenityChange(item.id.toString())}
              className="mr-2 cursor-pointer"
            />
            {item.name}
          </label>
        ))}
      </form>
    </div>
  );
};

export default FilterByAmenities;
