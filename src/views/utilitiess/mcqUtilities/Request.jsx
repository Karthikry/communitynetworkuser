// // material-ui
// import { useTheme } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
// import Paper from '@mui/material/Paper';
// import { useState, useEffect } from 'react';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';
// import { Card, CardContent, Typography } from '@mui/material';

// // API functions
// const sendRequest = async (requestData) => {
//   try {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     const accessToken = user?.accessToken || '';

//     const response = await fetch('https://executivetracking.cloudjiffy.net/MahaasabhaMember/request/v1/createRequest', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`
//       },
//       body: JSON.stringify(requestData)
//     });

//     if (!response.ok) throw new Error('Request failed');
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const fetchRequests = async (page, rowsPerPage) => {
//   try {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     const accessToken = user?.accessToken || '';

//     const response = await fetch(
//       `https://executivetracking.cloudjiffy.net/Mahaasabha/request/v1/getAllRequestByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`
//         }
//       }
//     );

//     if (!response.ok) throw new Error('Failed to fetch requests');
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return { content: [], totalElements: 0 };
//   }
// };

// const Request = () => {
//   const theme = useTheme();
//   const [formVisible, setFormVisible] = useState(false);
//   const [description, setDescription] = useState('');
//   const [requestName, setRequestName] = useState('');
//   const [requestTypeId, setRequestTypeId] = useState(1);
//   const [memberId, setMemberId] = useState(1);

//   // For pagination
//   const [requests, setRequests] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalRequests, setTotalRequests] = useState(0);

//   useEffect(() => {
//     loadRequests(page, rowsPerPage);
//   }, [page, rowsPerPage]);

//   const handleToggleForm = () => {
//     setFormVisible(!formVisible);
//   };

//   const handleSubmitRequest = async () => {
//     const requestData = {
//       description,
//       requestName,
//       mahaasabhaMemberDto: {
//         memberId
//       },
//       requestTypeDto: {
//         requestTypeId
//       }
//     };

//     const result = await sendRequest(requestData);
//     if (result) {
//       alert('Request raised successfully!');
//       loadRequests(page, rowsPerPage); // Refresh the requests list after a new request is submitted
//     } else {
//       alert('Failed to raise request.');
//     }
//   };

//   const loadRequests = async (page, rowsPerPage) => {
//     const result = await fetchRequests(page, rowsPerPage);
//     if (result && result.content) {
//       setRequests(result.content);
//       setTotalRequests(result.totalElements);
//     } else {
//       setRequests([]);
//       setTotalRequests(0);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   return (
//     <Grid>
//       <MainCard title="Request">
//         <Grid container spacing={gridSpacing}>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" fullWidth onClick={handleToggleForm}>
//               {formVisible ? 'Hide Form' : 'Raise Request'}
//             </Button>
//           </Grid>

//           {formVisible && (
//             <>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Request Title"
//                   variant="outlined"
//                   fullWidth
//                   value={requestName}
//                   onChange={(e) => setRequestName(e.target.value)}
//                   placeholder="Enter request name here"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   variant="outlined"
//                   fullWidth
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Enter description here"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   label="Select Request Type"
//                   variant="outlined"
//                   fullWidth
//                   value={requestTypeId}
//                   onChange={(e) => setRequestTypeId(e.target.value)}
//                 >
//                   <MenuItem value={1}>Info</MenuItem>
//                   <MenuItem value={2}>Other</MenuItem>
//                 </TextField>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary" fullWidth onClick={handleSubmitRequest}>
//                   Submit
//                 </Button>
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </MainCard>{' '}
//       <br />
//       <MainCard title="Details">
//         <Grid container spacing={2}>
//           {requests.length > 0 ? (
//             requests.map((request) => (
//               <Grid item xs={12} sm={6} md={4} key={request.requestId}>
//                 <Card
//                   variant="outlined"
//                   style={{
//                     height: '100%',
//                     padding: '16px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     borderRadius: '8px'
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       {request.requestName}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {request.description}
//                     </Typography>
//                     <Typography variant="body2" style={{ marginTop: '8px' }}>
//                       <strong>Request Type:</strong> {request.requestTypeDto?.requestTypeName || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" style={{ marginTop: '4px' }}>
//                       <strong>Status:</strong> {request.status}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Grid item xs={12}>
//               <Typography align="center" variant="body2" color="textSecondary">
//                 No requests available
//               </Typography>
//             </Grid>
//           )}
//         </Grid>

//         {/* Pagination */}
//         <TablePagination
//           component="div"
//           count={totalRequests}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </MainCard>
//     </Grid>
//   );
// };

// export default Request;


// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// API functions
const sendRequest = async (requestData) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user?.accessToken || '';

    const response = await fetch('https://executivetracking.cloudjiffy.net/MahaasabhaMember/request/v1/createRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchRequests = async (page, rowsPerPage) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user?.accessToken || '';

    const response = await fetch(
      `https://executivetracking.cloudjiffy.net/Mahaasabha/request/v1/getAllRequestByPagination/{pageNumber}/{pageSize}?pageNumber=${page}&pageSize=${rowsPerPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) throw new Error('Failed to fetch requests');
    return await response.json();
  } catch (error) {
    console.error(error);
    return { content: [], totalElements: 0 };
  }
};

const deleteRequest = async (requestId) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user?.accessToken || '';

    const response = await fetch(
      `https://executivetracking.cloudjiffy.net/MahaasabhaMember/request/v1/deleteRequestById/${requestId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) throw new Error('Failed to delete request');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const Request = () => {
  const theme = useTheme();
  const [formVisible, setFormVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [requestName, setRequestName] = useState('');
  const [requestTypeId, setRequestTypeId] = useState(1);
  const [memberId, setMemberId] = useState(1);

  // For pagination
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9); // 9 items per page
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    loadRequests(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleToggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleSubmitRequest = async () => {
    const requestData = {
      description,
      requestName,
      mahaasabhaMemberDto: {
        memberId
      },
      requestTypeDto: {
        requestTypeId
      }
    };

    const result = await sendRequest(requestData);
    if (result) {
      alert('Request raised successfully!');
      loadRequests(page, rowsPerPage); // Refresh the requests list after a new request is submitted
    } else {
      alert('Failed to raise request.');
    }
  };

  const handleDeleteRequest = async (requestId) => {
    const confirmed = window.confirm('Are you sure you want to delete this request?');
    if (confirmed) {
      const result = await deleteRequest(requestId);
      if (result) {
        alert('Request deleted successfully!');
        loadRequests(page, rowsPerPage); // Refresh the requests list after deletion
      } else {
        alert('Failed to delete request.');
      }
    }
  };

  const loadRequests = async (page, rowsPerPage) => {
    const result = await fetchRequests(page, rowsPerPage);
    if (result && result.content) {
      setRequests(result.content);
      setTotalRequests(result.totalElements);
    } else {
      setRequests([]);
      setTotalRequests(0);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <Grid>
      <MainCard title="Request">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleToggleForm}>
              {formVisible ? 'Hide Form' : 'Raise Request'}
            </Button>
          </Grid>

          {formVisible && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Request Title"
                  variant="outlined"
                  fullWidth
                  value={requestName}
                  onChange={(e) => setRequestName(e.target.value)}
                  placeholder="Enter request name here"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description here"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  label="Select Request Type"
                  variant="outlined"
                  fullWidth
                  value={requestTypeId}
                  onChange={(e) => setRequestTypeId(e.target.value)}
                >
                  <MenuItem value={1}>Info</MenuItem>
                  <MenuItem value={2}>Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmitRequest}>
                  Submit
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </MainCard>

      <br />
      

        <Grid container spacing={2}>
          {requests.length > 0 ? (
            requests.map((request) => (
              <Grid item xs={12} sm={6} md={4} key={request.requestId}>
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
                      {request.requestName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {request.description}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '8px' }}>
                      <strong>Request Type:</strong> {request.requestTypeDto?.requestTypeName || 'N/A'}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '4px' }}>
                      <strong>Status:</strong> {request.status}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ marginTop: '12px' }}
                      onClick={() => handleDeleteRequest(request.requestId)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" variant="body2" color="textSecondary">
                No requests available
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalRequests}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Grid>
  );
};

export default Request;
