"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(e) {
    console.log(e.target.id);
    const params = new URLSearchParams(searchParams);
    params.set("capacity", e.target.id);

    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button id="all" activeFilter={activeFilter} handleFilter={handleFilter}>
        All Cabins
      </Button>
      <Button
        id="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1 &mdash; 3 guests
      </Button>
      <Button
        id="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4 &mdash; 7 guests
      </Button>
      <Button
        id="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8 &mdash; 12 guests
      </Button>
    </div>
  );
}

function Button({ children, id, handleFilter, activeFilter }) {
  const active = id === activeFilter ? "bg-primary-700 text-primary-50" : "";

  return (
    <button
      id={id}
      className={`px-5 py-2 hover:bg-primary-700 ${active}`}
      onClick={handleFilter}
    >
      {children}
    </button>
  );
}
