import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TextField,
  Box
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect } from 'react';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import { DeleteForever, Edit } from '@mui/icons-material';
import { deletePromo, fetchPromo, getPromoById, postPromoData, updatedPromo } from 'views/API/PromoApi';

const columns = [
  { id: 'promoId', label: 'ID' },
  { id: 'promoName', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'youTube', label: 'Youtube' },
  { id: 'createdBy', label: 'Created By', align: 'right' },
  { id: 'updatedBy', label: 'Updated By', align: 'right' },
  { id: 'insertedDate', label: 'Inserted Date', align: 'right' },
  { id: 'updatedDate', label: 'Updated Date', align: 'right' },
  { id: 'actions', label: 'Actions', align: 'right' }
];

const Promo = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [promo, setPromo] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [promoId, setPromoId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [userdata, setUserData] = useState({
    promoName: '',
    description: '',
    youTube: ''
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const user = JSON.parse(sessionStorage.getItem('user'));
  const headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + user.accessToken
  };

  const changeHandler = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: null
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userdata.promoName || userdata.promoName.trim() === '') {
      newErrors.promoName = 'Enter the Advertisement name';
    }

    if (!userdata.description || userdata.description.trim() === '') {
      newErrors.description = 'Enter the description';
    }

    if (!userdata.youTube || userdata.youTube.trim() === '') {
      newErrors.youTube = 'Enter the YouTube URL';
    }

    return newErrors;
  };

  const fetchData = async () => {
    try {
      const res = await fetchPromo(headers);
      const fetchedData = res.content || [];

      const tableData = fetchedData.map((p) => ({
        promoId: p.promoId,
        promoName: p.promoName,
        description: p.description,
        youTube: p.youTube,
        insertedDate: moment(p.insertedDate).format('L'),
        updatedDate: moment(p.updatedDate).format('L'),
        createdBy: p.createdBy ? p.createdBy.userName || 'No User' : 'No User',
        updatedBy: p.updatedBy ? p.updatedBy.userName || 'No User' : 'No User'
      }));

      setPromo(tableData);
    } catch (error) {
      console.error('Error fetching promo data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    await deletePromo(headers, id);
    fetchData();
  };

  const handleEdit = async (id) => {
    setEditMode(true); // Set editMode to true
    setOpen(true);

    try {
      // Fetch promo details by id
      const det = await getPromoById(headers, id);

      if (det) {
        // Set promoId and userData with fetched data
        setPromoId(det.promoId);
        setUserData({
          promoName: det.promoName,
          description: det.description,
          youTube: det.youTube
        });
      } else {
        console.error('No promo data found for id:', id);
      }
    } catch (error) {
      console.error('Error fetching promo details:', error);
    }
  };

  const handleAddPromo = () => {
    setEditMode(false);
    setUserData({
      promoName: '',
      description: '',
      youTube: ''
    });
    setOpen(true);
  };

  const postData = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        if (editMode) {
          // Prepare data for update
          const updatedData = {
            promoId,
            promoName: userdata.promoName,
            description: userdata.description,
            youTube: userdata.youTube,
            updatedBy: { userId: user.userId } // Assuming your API expects this
          };

          await updatedPromo(updatedData, headers);
        } else {
          // Prepare data for creation
          const newPromoData = {
            promoName: userdata.promoName,
            description: userdata.description,
            youTube: userdata.youTube,
            createdBy: { userId: user.userId } // Assuming your API expects this
          };

          await postPromoData(newPromoData, headers);
        }

        // Reset userdata to clear form fields
        setUserData({ promoName: '', description: '', youTube: '' });

        // Close the dialog
        setOpen(false);

        // Trigger refresh
        setRefreshTrigger((prev) => !prev);
      } catch (error) {
        console.error('Error saving promo:', error);
      }
    }
  };

  return (
    <MainCard
      title={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Promo</span>
          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'flex', alignItems: 'center', fontSize: '15px' }}
            onClick={handleAddPromo}
          >
            Add
            <AddIcon />
          </Button>
        </Box>
      }
    >
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {promo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.promoId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'youTube' ? (
                            <a href={value} target="_blank" rel="noopener noreferrer">
                              {value} {/* Show the URL as the link text */}
                            </a>
                          ) : column.id === 'actions' ? (
                            <>
                              <IconButton color="primary" onClick={() => handleEdit(row.promoId)}>
                                <Edit />
                              </IconButton>
                              <IconButton color="secondary" onClick={() => handleDelete(row.promoId)}>
                                <DeleteForever />
                              </IconButton>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={promo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Dialog for Adding/Editing Promo */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Promo' : 'Add Promo'}</DialogTitle>
        <Box component="form" onSubmit={postData} noValidate sx={{ m: 2 }}>
          <TextField
            required
            name="promoName"
            label="Promo Name"
            value={userdata.promoName}
            onChange={changeHandler}
            error={!!errors.promoName}
            helperText={errors.promoName}
            fullWidth
          />
          <TextField
            required
            name="description"
            label="Description"
            value={userdata.description}
            onChange={changeHandler}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            required
            name="youTube"
            label="YouTube URL"
            value={userdata.youTube}
            onChange={changeHandler}
            error={!!errors.youTube}
            helperText={errors.youTube}
            fullWidth
          />
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </MainCard>
  );
};

export default Promo;
