import { useState } from "react";

export const useSingleSelection = (resetSameOption = false) => {
  const [selectedOption, setOption] = useState("");

  const setSelectedOption = (option: string) => {
    if (resetSameOption && selectedOption === option) {
      setOption("");
      return;
    }

    setOption(option);
  };

  return {
    selectedOption,
    setSelectedOption,
  };
};
