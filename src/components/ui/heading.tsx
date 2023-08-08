import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-start w-full justify-start">
      <h1 className="head-text">{title}</h1>
      <p className="text-light-1">{subtitle}</p>
    </div>
  );
};

export default Heading;
