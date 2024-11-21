// save-location
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { gpsData } = req.body;
        const timestamp = new Date().toISOString();

        // Simulate image URL and rescue status
        const location = {
            ...gpsData,
            timestamp,
            rescueStatus: 'Pending',
            image: '/images/default-location.jpg', // Replace with an actual image-capture URL
        };

        const filePath = path.join(process.cwd(), 'public', 'locationHistory.json');

        try {
            let locations = [];
            if (fs.existsSync(filePath)) {
                const existingData = fs.readFileSync(filePath, 'utf8');
                locations = JSON.parse(existingData);
            }

            locations.push(location);
            fs.writeFileSync(filePath, JSON.stringify(locations, null, 2));

            res.status(200).json({ message: 'Location saved successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save location.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
