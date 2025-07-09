// Temporary in-memory mock DB
let listings = [
  { id: 1, title: 'Toyota', status: 'pending', price: 50, location: 'New York' },
  { id: 2, title: 'Honda Civic', status: 'pending', price: 55, location: 'San Francisco' },
  { id: 3, title: 'Fortuner', status: 'rejected', price: 70, location: 'Chicago' },
  { id: 4, title: 'Hyundai Elantra', status: 'pending', price: 48, location: 'Los Angeles' },
  { id: 5, title: 'Maruti Swift', status: 'pending', price: 40, location: 'Dallas' },
  { id: 6, title: 'BMW X5', status: 'pending', price: 95, location: 'Miami' },
  { id: 7, title: 'Mercedes C-Class', status: 'rejected', price: 100, location: 'Seattle' },
  { id: 8, title: 'Tesla Model 3', status: 'pending', price: 85, location: 'Austin' },
  { id: 9, title: 'Kia Seltos', status: 'pending', price: 50, location: 'Denver' },
  { id: 10, title: 'Skoda Octavia', status: 'pending', price: 52, location: 'Boston' },
  { id: 11, title: 'Jeep Compass', status: 'pending', price: 65, location: 'Phoenix' },
  { id: 12, title: 'Ford Mustang', status: 'rejected', price: 75, location: 'Atlanta' },
  { id: 13, title: 'Nissan Altima', status: 'pending', price: 53, location: 'Detroit' },
  { id: 14, title: 'Chevrolet Spark', status: 'pending', price: 38, location: 'Las Vegas' },
  { id: 15, title: 'MG Hector', status: 'rejected', price: 60, location: 'San Diego' },
  { id: 16, title: 'Volkswagen Polo', status: 'pending', price: 42, location: 'Portland' },
  { id: 17, title: 'Audi A4', status: 'pending', price: 90, location: 'Orlando' },
  { id: 18, title: 'Lexus RX', status: 'approved', price: 98, location: 'Philadelphia' },
  { id: 19, title: 'Renault Duster', status: 'rejected', price: 45, location: 'Cincinnati' },
  { id: 20, title: 'Suzuki Ertiga', status: 'pending', price: 47, location: 'Houston' },
  { id: 21, title: 'Mahindra Thar', status: 'approved', price: 70, location: 'Minneapolis' },
  { id: 22, title: 'Tata Nexon', status: 'approved', price: 60, location: 'Charlotte' },
  { id: 23, title: 'Volvo XC60', status: 'pending', price: 88, location: 'Columbus' },
];

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    return res.status(200).json(listings);
  }

  if (req.method === 'PUT') {
    const { id, updatedData } = req.body;
    listings = listings.map((listing) =>
      listing.id === id ? { ...listing, ...updatedData } : listing
    );
    return res.status(200).json({ success: true });
  }

  if (req.method === 'POST') {
    const { id, action } = req.body;
    listings = listings.map((listing) =>
      listing.id === id
        ? { ...listing, status: action === 'approve' ? 'approved' : 'rejected' }
        : listing
    );
    return res.status(200).json({ success: true });
  }

  return res.status(405).end();
}
