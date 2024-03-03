import React from "react";
import { Alert } from "flowbite-react";

export function Component() {
  const handleClick = () => {};

  return (
    <Alert color="info" onClick={handleClick}>
      <span className="font-medium">Info alert!</span> Change a few things up
      and try submitting again.
    </Alert>
  );
}
