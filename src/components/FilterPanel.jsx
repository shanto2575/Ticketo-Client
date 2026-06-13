"use client";

import { useState } from "react";
import { Card, Input, Button, Label } from "@heroui/react";
import { FaSlidersH, FaHistory } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Music", "Tech", "Sports", "Arts", "Business", "Food", "Other"];
const LOCATIONS = ["New York", "San Francisco", "London", "Dhaka", "Tokyo", "Berlin", "Online"];

export default function FilterPanel() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter()

  // console.log(search,category,location);
  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (search) {
      params.set("search", search);
    }
    if (category) {
      params.set("category", category);
    }
    if (location) {
      params.set("location", location);
    }
    router.push(`/events?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    router.push('/events')

  }

  return (
    <Card className="relative overflow-hidden bg-slate-950/40 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl rounded-3xl" radius="none">

      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

        {/* Search */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Search Title
          </Label>

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keyword..."
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl h-12 text-white text-sm px-3"
          />
        </div>

        {/* Category (native select) */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Category
          </Label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 h-12 text-white text-sm outline-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="text-black">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location (native select) */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Location
          </Label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 h-12 text-white text-sm outline-none"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="text-black">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <Button
            onClick={handleApplyFilters}
            className="flex-grow bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-bold h-12">
            Apply Filters
          </Button>

          <Button
            variant="bordered"
            className="border-white/10 text-white h-12 px-4"
            title="Reset Filters"
            onClick={handleReset}
          >
            <FaHistory size={13} />
          </Button>
        </div>

      </div>
    </Card>
  );
}