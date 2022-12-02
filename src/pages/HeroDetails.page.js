import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Button,
  CardActionArea,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  useMediaQuery
} from '@mui/material';
import { Assignment, Campaign, Reorder } from '@mui/icons-material';
import axios from 'axios';
import {
  useParams,
  Link
} from 'react-router-dom';
import Layout from '../components/Layout.component';
import { handleImage } from '../utils/sort';
import { getMobileCss } from '../services/hero.services';

export default function HeroDetails() {
  const [heroDetails, setHeroDetails] = useState();
  const [heroDetailImage, setHeroDetailImage] = useState();
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');

  const { id } = useParams();

  useEffect(() => {
    getHeroDetails();
  }, []);

  const getHeroDetails = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_HERO_URL}/${id}?apikey=${process.env.REACT_APP_API_KEY}`;
    const heroListResponse = await axios.get(url);

    if (heroListResponse.data && heroListResponse.data.data) {
      const { results } = heroListResponse.data.data;

      const heroDetailData = results?.[0];

      const imgUrl = handleImage(heroDetailData, 'portrait_uncanny');

      setHeroDetailImage(imgUrl);
      setHeroDetails(heroDetailData);
    }
    setLoading(false);
  }

  //Common function To render stories, events and series
  const renderCharacterDetails = (heroDetails, title, Icon) => {
    return loading ?
      <Skeleton height={300} />
      : <CardActions>
        <Box color="text.secondary" sx={{ width: '100%' }}>
          <Typography sx={{ fontWeight: 800, fontSize: 20 }} gutterBottom variant="subtitle2" component="div">
            {title}
          </Typography>
          {heroDetails && heroDetails[title.toLowerCase()]
            && heroDetails[title.toLowerCase()].items.length > 0 ?
            <List dense={true}>
              {heroDetails[title.toLowerCase()]?.items.map(story =>
                <ListItem key={story.id}>
                  <ListItemIcon>
                    {Icon}
                  </ListItemIcon>
                  <ListItemText
                    key={story.id}
                    primary={story.name}
                  />
                </ListItem>
              )}
            </List>
            : <p>{`No ${title} are available`}</p>
          }
        </Box>
      </CardActions>
  }

  return <Layout>
    <div className="container">
      <div>
        <h1>Hero Details</h1>
        <Link to="/" ><Button>Back to Home</Button></Link>
        <Card sx={{ maxWidth: 750, m: "0 auto" }}>
          {loading ?
            <>
              <Skeleton width="100%" height={550} />
              <Skeleton />
            </> :
            <CardActionArea>
              <CardMedia
                component="img"
                height="750"
                image={heroDetailImage}
                alt={heroDetails?.name}
                sx={{
                  ...getMobileCss(matches)
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {heroDetails?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {heroDetails?.description}
                </Typography>
              </CardContent>
            </CardActionArea>}
          <Divider />
          {renderCharacterDetails(heroDetails, "Stories", <Assignment />)}
          <Divider />
          {renderCharacterDetails(heroDetails, "Events", <Campaign />)}
          <Divider />
          {renderCharacterDetails(heroDetails, "Series", <Reorder />)}
        </Card>
      </div>
    </div>
  </Layout >
}