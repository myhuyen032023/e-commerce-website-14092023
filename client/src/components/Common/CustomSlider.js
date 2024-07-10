import React, {memo} from 'react'
import Slider from 'react-slick'
import Product from 'components/Products/Product';
import Blog from 'components/Blogs/Blog';
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const CustomSlider = ({products, activeTab, normal, blogs}) => {
  return (
    <div>
        {
            products && 
            <Slider {...settings}>
            {products.map(el => (
                <Product 
                    id={el._id}
                    productData={el}
                    isNew={activeTab===1 ? false : true }
                    normal={normal}
                />
            ))}
        </Slider>
        }

        {
          blogs && 
          <Slider {...settings}>
          {blogs.map(el => (
              <Blog 
                  id={el._id}
                  blogData={el}
              />
          ))}
      </Slider>
        }
        
    </div>
  )
}

export default memo(CustomSlider)