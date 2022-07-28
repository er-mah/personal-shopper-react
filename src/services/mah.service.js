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

export const getVersions = (brandId, year, modelId) => {
    return axios.get(`${process.env.REACT_APP_MAH_URI}/vehicle/versions?brandId=${brandId}&year=${year}&modelId=${modelId}`);
}