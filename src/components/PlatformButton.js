import React from "react";

function PlatformButton(props) {
  return (
    <button
      className={
        props.selectedPlatforms.includes(props.eachPlatform)
          ? "platformBtn btn btn-info"
          : "platformBtn btn btn-secondary"
      }
      onClick={props.togglePlatform}
      name={props.eachPlatform}
    >
      {props.eachPlatform}
    </button>
  );
}

export default PlatformButton;
