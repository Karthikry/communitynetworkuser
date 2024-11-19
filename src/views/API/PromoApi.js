import axios from 'axios';

//todo ==> POST PROMO DATA
export const postPromoData = async (pdata, headers) => {
  try {
    const response = await axios.post(
      'https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/createPromo',
      pdata,
      { headers }
    );
    if (response.data.responseCode === 201) {
      alert('Promo added successfully');
    } else {
      alert(response.data.errorMessage || 'An error occurred');
    }
  } catch (error) {
    alert('Error adding promo: ' + error.message);
    console.error('Error adding promo:', error);
  }
};

//todo ==> GET PROMO DATA
export const fetchPromo = async (headers) => {
  try {
    const response = await axios.get(
      'https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/getAllPromoByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10',
      { headers }
    );
    return response.data; // Extract and return the data from the response
  } catch (error) {
    console.error('Error fetching promo data:', error);
    throw error; // Handle errors appropriately
  }
};

//todo ==> GET DATA BY PROMO ID
export const getPromoById = async (headers, id) => {
  try {
    const response = await axios.get(
      `https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/getPromoByPromoId/{promoId}?promoId=${id}`, // Use the dynamic id
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching promo by ID:', error);
    throw error;
  }
};

// todo ==> UPDATE PROMO
export const updatedPromo = async (updatedData, headers) => {
  try {
    const response = await axios.put(
      `https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/updatePromo`, 
      updatedData, 
      { headers }
    );

    if (response.data.responseCode === 201) {
      alert(response.data.message);
    } else {
      alert(response.data.errorMessage || 'An unexpected error occurred');
    }
  } catch (error) {
    console.error('Error updating promo:', error);
    alert('Error updating promo: ' + error.message);
  }
};

//todo ==> DELETE PROMO DATA
export const deletePromo = async (headers, id) => {
  try {
    const response = await axios.delete(
      `https://executivetracking.cloudjiffy.net/Mahaasabha/promo/v1/deletePromoById/${id}`, // Use the dynamic id
      { headers }
    );
    
    if (response.data.responseCode === 200) {
      alert(response.data.message);
    } else {
      alert(response.data.errorMessage || 'An unexpected error occurred');
    }
  } catch (error) {
    console.error('Error deleting promo:', error);
    alert('Error deleting promo: ' + error.message);
  }
};
