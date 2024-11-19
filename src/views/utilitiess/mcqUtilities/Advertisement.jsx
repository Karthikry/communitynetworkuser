import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Container, Button, CardMedia, Grid, Pagination } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useSpring, animated } from 'react-spring';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Advertisement = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [eventItems, setEventItems] = useState([]);
  const [promoItems, setPromoItems] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);

  const BASE_IMAGE_URL = 'https://executivetracking.cloudjiffy.net/Mahaasabha/file/downloadFile/?filePath=';

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user?.accessToken || '';

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const fetchData = async (url, setData) => {
      try {
        const response = await axios.get(url, { headers });
        setData(response.data.content || []);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData('https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/getAllAdvertisementByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10', setBannerImages);
    fetchData('https://executivetracking.cloudjiffy.net/Mahaasabha/success/v1/getAllSuccessStoryByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10', setSuccessStories);
    fetchData('https://executivetracking.cloudjiffy.net/Mahaasabha/news/v1/getAllNewsByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10', setNewsItems);
    fetchData('https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/getAllEventByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10', setEventItems);
    
    const fetchPromoItems = async () => {
      try {
        const response = await axios.get('https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/getAllPromoByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10', { headers });
        setPromoItems(response.data.content || []);
      } catch (error) {
        console.error("Error fetching promo data:", error);
      }
    };
    fetchPromoItems();
  }, []);

  return (
    <Container maxWidth="lg">
      {!expandedSection && (
        <Card sx={{ marginBottom: 4, p: 2 }}>
          <Carousel interval={3000} animation="slide" indicators={true} navButtonsAlwaysVisible>
            {bannerImages.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={`${BASE_IMAGE_URL}${image.filePath}`}
                alt={image.advertisementName}
                sx={{
                  width: '100%',
                  height: { xs: 200, sm: 300, md: 400 },
                  objectFit: 'fill',
                  borderRadius: 4,
                }}
              />
            ))}
          </Carousel>
        </Card>
      )}

      {(expandedSection === null || expandedSection === "Success Stories") && (
        <Card sx={{ marginBottom: 4 }}>
          <Section 
            title="Success Stories" 
            items={successStories} 
            baseImageUrl={BASE_IMAGE_URL} 
            expandedSection={expandedSection}
            setExpandedSection={setExpandedSection} 
          />
        </Card>
      )}
      
      {(expandedSection === null || expandedSection === "Promo") && (
        <Card sx={{ marginBottom: 4 }}>
          <Section 
            title="Promo" 
            items={promoItems} 
            expandedSection={expandedSection} 
            setExpandedSection={setExpandedSection} 
          />
        </Card>
      )}

      {(expandedSection === null || expandedSection === "News") && (
        <Card sx={{ marginBottom: 4 }}>
          <Section 
            title="News" 
            items={newsItems} 
            baseImageUrl={BASE_IMAGE_URL} 
            expandedSection={expandedSection} 
            setExpandedSection={setExpandedSection} 
          />
        </Card>
      )}

      {(expandedSection === null || expandedSection === "Events") && (
        <Card sx={{ marginBottom: 4 }}>
          <Section 
            title="Events" 
            items={eventItems} 
            baseImageUrl={BASE_IMAGE_URL} 
            expandedSection={expandedSection} 
            setExpandedSection={setExpandedSection} 
          />
        </Card>
      )}
    </Container>
  );
};

const Section = ({ title, items, baseImageUrl, expandedSection, setExpandedSection }) => {
  const isExpanded = expandedSection === title;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleViewToggle = () => {
    setExpandedSection(isExpanded ? null : title);
    setCurrentPage(1);
  };

  // Carousel responsive settings
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Box m={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{title}</Typography>
        <Button variant="contained" color="primary" onClick={handleViewToggle}>
          {isExpanded ? 'View Less' : 'View All'}
        </Button>
      </Box>

      {isExpanded ? (
        <Grid container spacing={2} mt={2}>
          {items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {title === "Promo" ? (
                <PromoCard item={item} />
              ) : (
                <DefaultCard item={item} baseImageUrl={baseImageUrl} />
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <MultiCarousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={2000} arrows={true}>
          {items.slice(0, 10).map((item, index) => (
            <Box key={index} sx={{ padding: '0 10px' }}>
              {title === "Promo" ? (
                <PromoCard item={item} />
              ) : (
                <DefaultCard item={item} baseImageUrl={baseImageUrl} />
              )}
            </Box>
          ))}
        </MultiCarousel>
      )}

      {isExpanded && items.length > itemsPerPage && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(items.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

// Define PromoCard and DefaultCard components as in your previous code...

const PromoCard = ({ item }) => {
  const animationProps = useSpring({
    from: { transform: 'scale(0.9)' },
    to: { transform: 'scale(1)' },
    config: { duration: 500 },
  });

  return (
    <animated.div style={animationProps}>
      <Card sx={{ width: '100%', boxShadow: 3, m:1 }}>
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${item.youTube}`}
            title={item.promoName}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" component="div">
            {item.promoName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.description}
          </Typography>
        </CardContent>
      </Card>
    </animated.div>
  );
};

const DefaultCard = ({ item, baseImageUrl }) => {
  return (
    <Card sx={{ width: '100%', boxShadow: 3,m:1}}>
      <CardMedia
        component="img"
        height="200"
        image={`${baseImageUrl}${item.filePath || item.photoPath}`}
        alt={item.advertisementName || item.successstoryName || item.newsName || item.eventName}
        sx={{
          objectFit: 'fill',
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {item.advertisementName || item.successstoryName || item.newsName || item.eventName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Advertisement;
