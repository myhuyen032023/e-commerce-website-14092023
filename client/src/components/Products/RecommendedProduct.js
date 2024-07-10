import React from 'react';
import { formatMoney } from 'utils/helpers';

const RecommendedProduct = ({ image, name, price, link }) => {
  return (
    <div className='p-4'>
      <h3 className='p-2 text-main font-semibold'>Other Customers Also Viewed</h3>
      <div className="content flex items-center">
        <img src={image} alt="Product" className="w-[250px] h-[170px] mr-4 object-contain" />
        <div className='p-4'>
          <p>
            <a href={link} className="hover:cursor-pointer hover:text-main font-semibold">
              {name}
            </a>
          </p>
          <p className="font-medium text-sm italic">{formatMoney(price)} VND</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;