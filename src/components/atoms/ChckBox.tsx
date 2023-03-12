import React from "react";

interface CheckboxProps {
  isChecked: boolean;
  onChange: (val: boolean) => void;
}

const Chckbx = ({ isChecked, onChange }: CheckboxProps) => {
  return (
    <input
      id="default-checkbox"
      type="checkbox"
      checked={isChecked}
      onChange={() => onChange(!isChecked)}
      className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
    />
  );
};

export default Chckbx;
