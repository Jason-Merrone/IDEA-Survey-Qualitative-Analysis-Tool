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
      <div className='contentCard'>{content}</div>
    </div>
  );
};

export default Card;
