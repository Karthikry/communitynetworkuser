import axios from 'axios';
import { BaseUrl } from 'BaseUrl';

export const fetchAcademyCategories = async (headers) => {
  return await axios({
    method: 'GET',
    url: `${BaseUrl}/academiccategory/v1/getAllAcademicCategory`,
    headers: headers
  });
};

export const fetchCourseByCategoryId = async (headers, categoryId) => {
  return await axios({
    method: 'GET',
    url: `${BaseUrl}/academiccourse/v1/getAcademicCoursesByCategoryId/{categoryId}?categoryId=${categoryId}`,
    headers: headers
  });
};

export const fetchCourseByCourseId = async (headers, courseId) => {
  return await axios({
    method: 'GET',
    url: `${BaseUrl}/academiccourse/v1/getAcademicCourseByCourseId/{courseId}?courseId=${courseId}`,
    headers: headers
  });
};

export const fetchModulesByCourseId = async (headers, courseId) => {
  return await axios({
    method: 'GET',
    url: `${BaseUrl}/academicmodule/v1/getAcademicModulesByCourseId/{courseId}?courseId=${courseId}`,
    headers: headers
  });
};
export const fetchTopicsBymoduleId = async (headers, moduleId) => {
  return await axios({
    method: 'GET',
    url: `${BaseUrl}/academictopic/v1/getAcademicTopicsByModuleId/{moduleId}?moduleId=${moduleId}`,
    headers: headers
  });
};
