import axios from 'axios';

export const getBrands = () => {
    return axios.get(`${process.env.REACT_APP_MAH_URI}/vehicle/brands`);
}

export const getYears = (brandId) => {
    return axios.get(`${process.env.REACT_APP_MAH_URI}/vehicle/years?brandId=${brandId}`);
}

export const getModels = (brandId, year) => {
    return axios.get(`${process.env.REACT_APP_MAH_URI}/vehicle/models?brandId=${brandId}&year=${year}`);
}