import React from "react";

const LoadingBar = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden rounded">
      <div className="h-full bg-green-500 animate-loading-bar" />
    </div>
  );
};

export default LoadingBar;