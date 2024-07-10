import {React, useEffect, useState} from 'react'
//Thuc hien thong ke o day
import { Column, Pie } from '@ant-design/plots';
import { apiGetOrders, apiGetProducts,  apiGetIncomeInDays, apiGetIncomeInMonths } from 'apis';
import { formatMoney } from 'utils/helpers';
const Dashboard = () => {
  const [orders, setOrders] = useState([])
  const [tenBestSellerProducts, setBestSellers] = useState([])
  const [incomes, setIncomes] = useState([])
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const fetchData = async (params) => {
    const response = await apiGetOrders(params)
    if (response.success) {
      setOrders(response.orders)
    }

    
  }
  const fetchProducts = async() => {
    const response = await apiGetProducts({sort: '-sold', limit: 10})
    if (response.success) {
        setBestSellers(response.products)
    }
  }

  const fetchIncomes = async() => {
    const response = await apiGetIncomeInDays({year:2024, month:selectedMonth});
    if (response.success) {
      setIncomes(response.incomes)
    }
    
    
  }

  const handleSelectMonth = () => {
    setSelectedMonth(document.getElementById("month")?.options[document.getElementById("month")?.selectedIndex]?.text)
  }

  useEffect(() => {
    fetchData()
    fetchProducts()
    fetchIncomes()
  }, [selectedMonth])
  console.log(tenBestSellerProducts)
  console.log(incomes)
  let data = []
  incomes.forEach(el => {
    data.push({type: el._id, value:el.totalRevenue})
  });
  
  const columnConfig = {
    data,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ type }) => {
        
        return '#2989FF';
      },
    },
    label: {
      text: (originData) => {
        // const val = parseFloat(originData.value);
        // if (val < 0.05) {
        //   return (val * 100).toFixed(1);
        // }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };

  const pieConfig = {
    data: [
      { type: tenBestSellerProducts[0]?.title, value: tenBestSellerProducts[0]?.sold },
      { type: tenBestSellerProducts[1]?.title, value: tenBestSellerProducts[1]?.sold },
      { type: tenBestSellerProducts[2]?.title, value: tenBestSellerProducts[2]?.sold },
      { type: tenBestSellerProducts[3]?.title, value: tenBestSellerProducts[3]?.sold },
      { type: tenBestSellerProducts[4]?.title, value: tenBestSellerProducts[4]?.sold },
      { type: tenBestSellerProducts[5]?.title, value: tenBestSellerProducts[5]?.sold },
      { type: tenBestSellerProducts[6]?.title, value: tenBestSellerProducts[6]?.sold },
      { type: tenBestSellerProducts[7]?.title, value: tenBestSellerProducts[7]?.sold },
      { type: tenBestSellerProducts[8]?.title, value: tenBestSellerProducts[8]?.sold },
      { type: tenBestSellerProducts[9]?.title, value: tenBestSellerProducts[9]?.sold }
      
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex items-center text-3xl font-bold px-4 '>
        <span>Dashboard</span>
      </h1>
      <div className='flex justify-between items-center gap-3'>
        <div className='flex justify-between items-end bg-background p-3 rounded-3 grow'>
          <div>
            <p>Total Products Sold</p> <span className='font-bold text-[20px]'>{orders.reduce((sum, el) => el.products.length + sum,0)}</span>
          </div>
          <div className='flex flex-col items-end'>
            
            <span className='font-bold'>32%</span>
            <p className='mb-0'>Compared to Last Month</p>
          </div>
        </div>
        <div className='flex justify-between items-end bg-background p-3 rounded-3 grow'>
          <div>
            <p>Total Orders</p> <span className='font-bold text-[20px]'>{orders?.length}</span>
          </div>
          <div className='flex flex-col items-end'>
            
            <span className='font-bold'>32%</span>
            <p className='mb-0'>Compared to Last Month</p>
          </div>
        </div>
        <div className='flex justify-between items-end bg-background p-3 rounded-3 grow'>
          <div>
            <p>Total Income</p> <span className='font-bold text-[20px]'>{formatMoney(orders.reduce((sum, el) =>  +el?.total+ sum, 0))} VND</span>
          </div>
          <div className='flex flex-col items-end'>
            {/* <BsArrowUpRight /> */}
            <span className='font-bold'>32%</span>
            <p className='mb-0'>Compared to Last Month</p>
          </div>
        </div>
        
        

      </div>

      <div >
      
        <h1 className='h-[75px] flex items-center text-3xl font-bold px-4 '>
          <span>Income Statics</span>
        </h1>
        <div className='flex items-center ml-3'>
        <h1>Month:</h1>
      <select value={selectedMonth} onChange={handleSelectMonth} id='month' className='m-5'>
        
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
        </div>
        <Column {...columnConfig} />;
        <div>
          
        </div>
      </div>

      <div >
        <h1 className='h-[75px] flex items-center text-3xl font-bold px-4 '>
          <span>10 Best Seller Products</span>
        </h1>
        <Pie {...pieConfig} />;
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard