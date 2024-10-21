import React, { ReactNode } from 'react';
import "~/styles/card.css";

interface CardProps {
  title: string;
  content: ReactNode; // ReactNode allows passing JSX elements like links
}

const Card = ({ title, content }: CardProps) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;
