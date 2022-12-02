import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Skeleton } from '@mui/material';
import { Grid } from '@mui/material';
import Search from '../components/Search.component';
import { ORDER } from '../constants/oder.constant';
import Sort from '../components/Sort.component';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import {
  useNavigate
} from 'react-router-dom';
import Layout from '../components/Layout.component';
import { handleImage } from '../utils/sort';
import { getQuery } from '../services/hero.services';

const HeroList = () => {
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState(ORDER.ASC);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [heroList, setHeroList] = useState([]);
  
  const totolRecord = useRef(100);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getHeroList = async () => {
    setLoading(true);

    const query = getQuery(searchText, order, rowsPerPage, page);
    const url = `${process.env.REACT_APP_HERO_URL}${query}&apikey=${process.env.REACT_APP_API_KEY}`;
    const heroListResponse = await axios.get(url);

    if (heroListResponse.data && heroListResponse.data.data) {
      const { total, results } = heroListResponse.data.data;

      totolRecord.current = total;
      setHeroList(results);
    }

    setLoading(false);
  }

  const handleShowDetail = (id) => {
    navigate(`/heroDetails/${id}`);
  }

  useEffect(() => {
    getHeroList();
  }, [order, searchText, rowsPerPage, page]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  const renderHeaderPanel = () => {
    return <Grid container spacing={2} sx={{ mb: '1rem' }}>
      <Grid item md={9} sx={{ ml: '1rem' }}>
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Grid>
      <Grid item md={2} sx={{ ml: '1rem', display: 'flex', alignItems: 'center' }}>
        <Sort order={order} setOrder={setOrder} />
      </Grid>
    </Grid>
  }

  const renderHeroList = () => {
    return <Grid container spacing={1}>
  
      {heroList.length > 0 ?
        heroList.map((hero) => (
          <Grid item xs={12} md={4} key={hero.id}>
            <Card>
              <CardActionArea onClick={() => handleShowDetail(hero.id)}>
                {loading ?
                  <Skeleton variant="rectangular" width="100%" height={140} /> :
                  <CardMedia
                    component="img"
                    height="140"
                    image={handleImage(hero, 'portrait_incredible')}
                    alt={hero?.name}
                    sx={{ objectFit: 'contain', mt: '1rem' }}
                  />
                }
                <CardContent sx={{ height: 150 }}>
                  {loading ?
                    <Skeleton width="100%" height={40} /> :
                    <Typography gutterBottom variant="h5" component="div" sx={{ overflow: "ellipsis" }}>
                      {hero.name}
                    </Typography>
                  }

                  {loading ?
                    <Skeleton width="100%" height={70} /> :
                    <Typography variant="body2" color="text.secondary"
                      className="multiline-ellipsis"
                    >
                      {hero.description || "No description available"}
                    </Typography>
                  }
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
        ))
        : <Grid item xs={12} md={4} sx={{m: "0 auto", height: 500}}>
          <p>No Super hero Found With This Name</p>
          </Grid>
      }
    </Grid>
  }

  const renderPagination = () => {
    return <TablePagination
      component="div"
      count={totolRecord.current}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  }

  return <Layout>
    <Box sx={{ bgcolor: theme.palette.primary.dark, height: 'auto', pt: '1rem' }}>
      <h1>Super Heroes</h1>
      {renderHeaderPanel()}
      {renderHeroList()}
      {renderPagination()}
    </Box>
  </Layout>
}

export default HeroList;