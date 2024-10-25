
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className = '', ...props }) => {
  return <div className={`bg-white rounded-lg shadow ${className}`} {...props} />;
};

export const CardHeader: React.FC<CardProps> = ({ className = '', ...props }) => {
  return <div className={`p-6 border-b border-gray-200 ${className}`} {...props} />;
};

export const CardTitle: React.FC<CardProps> = ({ className = '', ...props }) => {
  return <h3 className={`text-xl font-semibold ${className}`} {...props} />;
};

export const CardContent: React.FC<CardProps> = ({ className = '', ...props }) => {
  return <div className={`p-6 ${className}`} {...props} />;
};
