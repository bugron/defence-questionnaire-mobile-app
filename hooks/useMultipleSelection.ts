import { useState } from "react";

export const useMultipleSelection = () => {
  const [selectedOptions, setOptions] = useState<string[]>([]);

  const setSelectedOptions = (option: string) => {
    if (selectedOptions.includes(option)) {
      setOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setOptions([...selectedOptions, option]);
    }
  };

  return {
    selectedOptions,
    setSelectedOptions,
  };
};
