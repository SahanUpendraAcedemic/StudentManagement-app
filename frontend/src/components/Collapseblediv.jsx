import React, { useState } from "react";

function CollapsibleDiv({ content }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-full px-5">
      <button
        onClick={toggleCollapse}
        className="bg-primary rounded-xl text-white"
        type="button"
      >
        {isOpen ? "^" : "V"}
      </button>
      {isOpen && content}
    </div>
  );
}

export default CollapsibleDiv;
