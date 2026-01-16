const fetchTheaterData = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + 'theaters/getall');
        if (!response.ok) {
            throw new Error('Failed to fetch theater data');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching theater data:', error);
        return [];
    }
}