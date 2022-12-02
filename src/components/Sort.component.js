import React from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ORDER } from '../constants/oder.constant';

const Sort = ({ order, setOrder }) => {
  const handleChange = () => {
    const updatedOrder = order === ORDER.ASC ? ORDER.DESC : ORDER.ASC;
    setOrder(updatedOrder);
  }

  return (
    <>
      Sort by Name:
      {order === ORDER.ASC ?
        <ArrowDownwardIcon onClick={handleChange} />
        : <ArrowUpwardIcon onClick={handleChange} />}
    </>
  );
}

export default Sort;