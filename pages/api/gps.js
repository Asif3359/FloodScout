export default function handler(req, res) {
    if (req.method === "GET") {
        const gpsData = {
            lat: 23.8103, // Replace with actual latitude
            lng: 90.4125, // Replace with actual longitude
        };

        res.status(200).json(gpsData);
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
