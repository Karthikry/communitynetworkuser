import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// react-responsive-carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        // Retrieve the user token from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = user?.accessToken || '';

        const response = await axios.get('https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/queryAllAdvertisement', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        console.log(response.data); // Log response to check structure

        // Check if response.data is an array; if not, initialize banners as an empty array
        setBanners(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBanners([]); // Set banners to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <MainCard border={false} content={false}>
      <Box>
        <Grid container direction="column">
          <Grid item xs={12}>
            {loading ? (
              <Box>Loading banners...</Box>
            ) : (
              <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} transitionTime={500}>
                {banners.map((banner, index) => (
                  <div key={index} style={{ height: '100%' }}>
                    <img
                      src={banner.imagePath || banner.imageUrl} // Use imagePath if available, otherwise fallback to imageUrl
                      alt={banner.altText || `Banner ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

Banner.propTypes = {
  isLoading: PropTypes.bool
};

export default Banner;
