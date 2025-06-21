import axios from 'axios';
import { APP_ENV } from '../../env/config';
import { ICreateRegion } from '../../interfaces/Region/ICreateRegion';
import { IEditRegion } from '../../interfaces/Region/IEditRegion';
import { IRegion } from '../../interfaces/Region/IRegion';



const baseUrl = APP_ENV.BASE_URL;

// Створюємо екземпляр axios
const instance = axios.create({
    baseURL: `${baseUrl}/api/Region`,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function getRegion() {
    try {
        const response = await instance.get<IRegion[]>(`GetAllRegion`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch store data:', error);
        throw error;
    }
};



export async function getRegionByPage(page: number) {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<IRegion[]>(`RegionByPage/${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return resp.data;
    } catch (error) {
        console.error('Failed to fetch store data:', error);
        throw error;
    }
}

export async function getRegionById(id: number) {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<IRegion>(`GetRegionByID/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return resp.data;
    } catch (error) {
        console.error('Failed to fetch main category data:', error);
        throw error;
    }
}

export async function getRegionQuantity() {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<number>(`RegionQuantity`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return resp.data;
    } catch (error) {
        console.error('Failed to fetch quantity store data:', error);
        throw error;
    }
}

export async function createRegion(model: ICreateRegion) {
    const token = localStorage.getItem('token');
    try {
        await instance.post(`CreateRegion`, model, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to fetch create store:', error);
        throw error;
    }
}

export async function editRegion(model: IEditRegion) {
    const token = localStorage.getItem('token');
    try {
        await instance.post(`EditRegion`, model, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to fetch edit store:', error);
        throw error;
    }
}

export async function deleteRegionByID(id: number) {
    const token = localStorage.getItem('token');
    try {
        await instance.delete(`DeleteRegionByID/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to delete store data:', error);
        throw error;
    }
}