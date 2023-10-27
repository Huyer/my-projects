"use client";
import React from "react";
import { useState } from "react";
import { SearchManufacturer } from "@/components";

type Props = {};

function SearchBar({}: Props) {
  const [manufacturer, setManufacturer] = useState("");
  const handleSearch = () => {};
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer />
      </div>
    </form>
  );
}

export default SearchBar;
