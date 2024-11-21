// /api/control.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { direction } = req.body;

        // Simulate sending the control command to the boat
        console.log(`Command sent to boat: ${direction}`);
        res.status(200).json({ message: `Boat moving ${direction}` });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
