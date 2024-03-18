import { Repositories } from '../models';
import { baseUrl, endpoint } from './config';

export async function getRepositories(q: string, sort: string, order: string): Promise<Repositories> {
    const queryParams = new URLSearchParams({
        q: q,
        sort: sort,
        order: order
    }).toString();
    const apiUrl = `${baseUrl}/${endpoint}?${queryParams}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: Repositories = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
