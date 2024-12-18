'use client';

import { debounceChange } from "@/helpers";
import { useState, useRef, useEffect } from "react";
import SuggestionList from "./SuggestionList";
import ImageUpload from "./ImageUpload";

export default function SearchInput() {
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    if (query.trim()) {
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions);
          setActiveIndex(-1);
        } else {
          console.error("Error fetching suggestions:", response.statusText);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prevIndex) => {
          const newIndex =
            prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1;
          scrollIntoView(newIndex);
          return newIndex;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0) {
          handleSuggestionClick(suggestions[activeIndex]);
        }
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    inputRef.current.value = suggestion;
    setSuggestions([]);
    handleSearch();
  };

  const handleSearch = (e) => {
    if(e) e.preventDefault();
    const query = inputRef?.current?.value.trim();
    console.log(query, 'query')
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  const scrollIntoView = (index) => {
    if (suggestions.length > 0 && suggestionsRef.current) {
      const item = suggestionsRef.current.children[index];
      if (item) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };  

  useEffect(() => {
    if (activeIndex >= 0) {
      scrollIntoView(activeIndex);
    }
  }, [activeIndex]);

  return (
    <form onSubmit={handleSearch} className="w-full">
      <section
        className={`relative w-full flex items-center border-gray-300 ${
          suggestions?.length > 0
            ? "rounded-t-3xl border-t border-l border-r"
            : "rounded-3xl border"
        } shadow-md bg-white px-4 py-[6px]`}
      >
        <span className="text-gray-500 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19a8 8 0 100-16 8 8 0 000 16zm7-4l5 5"
            />
          </svg>
        </span>

        <input
          type="text"
          ref={inputRef}
          onChange={debounceChange(handleInputChange, 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search Google or type a URL"
          className="flex-grow text-gray-700 focus:outline-none"
        />
        <ImageUpload />
      </section>
      <SuggestionList
        suggestions={suggestions}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        handleSuggestionClick={handleSuggestionClick}
        suggestionsRef={suggestionsRef}
      />
    </form>
  );
}