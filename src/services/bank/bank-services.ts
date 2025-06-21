import axios from 'axios';
import { APP_ENV } from '../../env/config';
import { ICreateBank } from '../../interfaces/Bank/ICreateBank';
import { IEditBank } from '../../interfaces/Bank/IEditBank';
import { IBank } from '../../interfaces/Bank/IBank';


const baseUrl = APP_ENV.BASE_URL;

// Створюємо екземпляр axios
const instance = axios.create({
    baseURL: `${baseUrl}/api/Bank`,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function getBank() {
    try {
        const response = await instance.get<IBank[]>(`GetAllBank`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch store data:', error);
        throw error;
    }
};



export async function getBankByPage(page: number) {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<IBank[]>(`BankByPage/${page}`, {
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

export async function getBankById(id: number) {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<IBank>(`GetBankByID/${id}`, {
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

export async function getBankQuantity() {
    const token = localStorage.getItem('token');
    try {
        const resp = await instance.get<number>(`BankQuantity`, {
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

export async function createBank(model: ICreateBank) {
    const token = localStorage.getItem('token');
    try {
        await instance.post(`CreateBank`, model, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to fetch create store:', error);
        throw error;
    }
}

export async function editBank(model: IEditBank) {
    const token = localStorage.getItem('token');
    try {
        await instance.post(`EditBank`, model, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to fetch edit store:', error);
        throw error;
    }
}

export async function deleteBankByID(id: number) {
    const token = localStorage.getItem('token');
    try {
        await instance.delete(`DeleteBankByID/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Failed to delete store data:', error);
        throw error;
    }
}