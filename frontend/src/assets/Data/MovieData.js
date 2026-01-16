const fetchMovieData = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + 'movies/getall');
        if (!response.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return [];
    }
};

export default fetchMovieData;