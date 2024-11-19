
import axios from 'axios';
import { BaseUrl } from 'BaseUrl';

export const fetchBanner = async (headers) => {
  return await axios({
    method: 'get',
    url: `https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/getAllAdvertisementByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10`,
    headers: headers
  });
};

export const addBanner = async (data, headers) => {
  try {
    console.log('Data being sent to API:', data); // Debugging the payload

    const res = await axios({
      method: 'POST',
      url: `https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/createAdvertisement`,
      headers,
      data: data
    });

    console.log('Response from API:', res); // Logging the response for debugging

    // Handle different response codes
    if (res.data.responseCode === 201) {
      alert('Advertisement added successfully');
    } else if (res.data.responseCode === 400) {
      alert(res.data.errorMessage);
    } else {
      alert('Something went wrong');
    }

    return res.data; // Optional if you need to return the response data

  } catch (error) {
    console.error('Error adding banner:', error);
    alert('An error occurred while adding the advertisement.');
  }
};

export const deleteBanner = async (id, headers) => {
  return await axios({
    method: 'delete',
    url: `https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/deleteAdvertisementById/${id}`,
    headers
  })
    .then((res) => {
      if (res.data.responseCode === 200) {
        alert(res.data.message);
      } else if (res.data.responseCode === 400) {
        alert(res.data.errorMessage);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAdvertiseById = async (id, headers) => {
  return await axios({
    method: 'GET',
    url: `https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/getAdvertisementByAdvertisementId/{advertisementId}?advertisementId=${id}`,
    headers: headers
  });
};

export const updatedAdvertise = async (updatedData, headers) => {
  console.log(updatedData);
  return await axios({
    method: 'PUT',
    url: `https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/updateAdvertisement`,
    headers: headers,
    data: updatedData
  })
    .then(function (res) {
      console.log(res);
      if (res.data.responseCode === 201) {
        alert(res.data.message);
      } else if (res.data.responseCode === 400) {
        alert(res.data.errorMessage);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
