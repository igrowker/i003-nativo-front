import React from "react";
import "../MainCard.css";

interface MainCardProps {
  title: string;
  imageSrc: string;
}

const MainCard: React.FC<MainCardProps> = ({ title, imageSrc }) => {
  return (
    <div className="main-card">
      <img src={imageSrc} alt={title} className="card-image" />
      <p>{title}</p>
    </div>
  );
};

export default MainCard;
