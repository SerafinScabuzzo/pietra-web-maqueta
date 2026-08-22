import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  to: string;
  name: string;
  imageUrl?: string;
}

const CategoryCard = ({ to, name, imageUrl }: CategoryCardProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full group"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-brandGray">
        {imageUrl && !failed ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brandGray">
            <span className="text-brandBlue font-semibold text-center px-2">{name}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-brandBlue transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
