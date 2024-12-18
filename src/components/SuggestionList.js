'use client';

export default function SuggestionList({
    suggestions,
    activeIndex,
    setActiveIndex,
    handleSuggestionClick,
    suggestionsRef,
  }) {
    return (
      suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className={`top-full mt-0 w-full bg-white border-b border-l border-r border-gray-300 rounded-b-xl shadow-sm max-h-[300px] overflow-auto`}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index+suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-2 ${
                index === activeIndex
                  ? "bg-gray-200 cursor-pointer text-gray-700"
                  : "hover:bg-gray-100 cursor-pointer text-gray-700"
              } ${index === suggestions.length - 1 ? "rounded-b-xl" : ""}`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )
    );
}  