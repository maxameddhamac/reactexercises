import { useState } from "react";

// ToggleButton Component
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return <button onClick={handleToggle}>{isOn ? "ON" : "OFF"}</button>;
}

export default ToggleButton;
