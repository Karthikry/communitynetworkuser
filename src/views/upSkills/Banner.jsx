import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// react-responsive-carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

import banner1 from '../../assets/images/banner/banner1.png';
import { Typography } from '@mui/material';
import Categories from './Categories';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const Banner = () => {
  return (
    <>
      <MainCard border={false} content={false} sx={{ mt: 1 }}>
        <Box>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} transitionTime={500}>
                <div
                  style={{
                    height: '100%'
                  }}
                >
                  <img src={banner1} alt="Banner 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div
                  style={{
                    height: '100%'
                  }}
                >
                  <img src={banner1} alt="Banner 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </Carousel>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <MainCard border={false} content={false} sx={{ mt: 4, width: '100%' }}>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Categories />
        </Box>
      </MainCard>
    </>
  );
};

Banner.propTypes = {
  isLoading: PropTypes.bool
};

export default Banner;
