import React from "react";

function PlatformButton(props) {
  return (
    <button
      className={
        props.selectedPlatforms.includes(props.eachPlatform)
          ? "platformBtn btn btn-info"
          : "platformBtn btn btn-secondary"
      }
      onClick={(e) => props.togglePlatform(e, props.eachPlatform, props.platformType)}
    >
      {props.eachPlatform}
    </button>
  );
}

export default PlatformButton;
