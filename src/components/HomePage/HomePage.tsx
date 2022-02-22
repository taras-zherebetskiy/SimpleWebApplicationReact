import React from 'react';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="HomePage">
      <h1>Information about cinema</h1>
      <img
        className="HomePage__img"
        src="https://d7uqkdchk37sx.cloudfront.net/wp-content/uploads/2018/10/cinema.jpg"
        alt="Cinema"
      />
    </div>
  );
};
