import axios from 'axios';

export default axios.create ({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer UXbPRjM8NPc5cR8SF9qjQrtEbDABGBBwEkhLSXPu6-PI8_bxkavhHMwxuhaxtwYrCHDKgtFydzucXkkIhne9MX4U-xpJVjwz2gkBk1mm3NbwnfkGKRlSScVKdn1zXnYx'
    }
});
