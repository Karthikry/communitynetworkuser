// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { CurrencyRupee } from '@mui/icons-material';

// API functions
const fetchSubscriptions = async (memberId) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user?.accessToken || '';

    const response = await fetch(
      `https://executivetracking.cloudjiffy.net/MahaasabhaMember/subscription/v1/getAllSubscriptionsByMember/{memberId}?memberId=${memberId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch subscriptions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
};

const fetchPaymentDetails = async (subscriptionId) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user?.accessToken || '';

    const response = await fetch(
      `https://executivetracking.cloudjiffy.net/MahaasabhaMember/subscription/v1/getAllPaymentsBySubscriptionId/{subscriptionId}?subscriptionId=${subscriptionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch payment details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return [];
  }
};

const Subscription = () => {
  const theme = useTheme();
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showPayments, setShowPayments] = useState(false); // Toggle between subscriptions and payments
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    // Get the memberId dynamically from session storage
    const user = JSON.parse(sessionStorage.getItem('user'));
    const dynamicMemberId = user?.memberId; // Replace with the actual property name from your user object

    if (dynamicMemberId) {
      setMemberId(dynamicMemberId);

      const loadSubscriptions = async () => {
        const data = await fetchSubscriptions(dynamicMemberId);
        setSubscriptions(data);
      };

      loadSubscriptions();
    } else {
      console.error('Member ID is missing');
    }
  }, []);

  const handleShowPayments = async (subscriptionId) => {
    const data = await fetchPaymentDetails(subscriptionId);
    setPayments(data);
    setShowPayments(true); // Switch to showing payments
  };

  const handleBackToSubscriptions = () => {
    setShowPayments(false); // Switch back to subscriptions
    setPayments([]); // Clear payment details
  };

  return (
    // <MainCard title={showPayments ? 'Payment Details' : 'Subscriptions'}>
      <Grid container spacing={gridSpacing}>
        {!showPayments ? (
          subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <Grid item xs={12} sm={6} md={4} key={subscription.id}>
                <Card
                  variant="outlined"
                  style={{
                    height: '100%',
                    padding: '16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Subscription ID: {subscription.id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Start Date:</strong> {subscription.startDate}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '8px' }}>
                      <strong>End Date:</strong> {subscription.endDate}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '8px' }}>
                      <strong>Status:</strong> {subscription.status}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginTop: '16px' }}
                      onClick={() => handleShowPayments(subscription.id)}
                    >
                      Show Payment Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" variant="body2" color="textSecondary">
                No subscriptions available
              </Typography>
            </Grid>
          )
        ) : (
          <>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBackToSubscriptions}
              >
                Back to Subscriptions
              </Button>
            </Grid>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <Grid item xs={12} sm={6} md={4} key={payment.paymentid}>
                  <Card
                  variant="outlined"
                  style={{
                    height: '100%',
                    padding: '16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px'
                  }}
                >
                  <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Payment ID  : {payment.paymentid}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Amount : </strong> {payment.amount}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: '8px' }}>
                        <strong>Date:</strong> {payment.paymentDate}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: '8px' }}>
                        <strong>Method:</strong> {payment.paymentMethod}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: '8px' }}>
                        <strong>Status:</strong> {payment.status}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" variant="body2" color="textSecondary">
                  No payment details available
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    // </MainCard>
  );
};

export default Subscription;
