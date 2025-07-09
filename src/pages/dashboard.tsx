import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import ListingRow from './components/ListingRow';
import toast from 'react-hot-toast';

type Listing = {
  id: number;
  title: string;
  status: string;
  price: number;
  location: string;
};

export default function Dashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const router = useRouter();

  const filteredListings = useMemo(() => {
    return filter === 'all'
      ? listings
      : listings.filter((l) => l.status === filter);
  }, [listings, filter]);

  const totalPages = Math.ceil(filteredListings.length / pageSize);

  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredListings.slice(start, start + pageSize);
  }, [filteredListings, currentPage, pageSize]);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/');
    } else {
      fetchListings();
    }
  }, []);

  const fetchListings = async () => {
    const res = await fetch('/api/listings');
    const data = await res.json();
    setListings(data);
  };

  const handleAction = useCallback(async (id: number, action: 'approve' | 'reject') => {
    await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, id }),
    });
    fetchListings();
  }, []);

  const handleEdit = useCallback((listing: Listing) => {
    setSelectedListing(listing);
  }, []);

  const handleSave = async () => {
    if (!selectedListing) return;

    await fetch('/api/listings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedListing.id, updatedData: selectedListing }),
    });

    await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'edit',
        listingId: selectedListing.id,
        performedBy: 'admin@yopmail.com',
      }),
    });

    toast.success('Updated successfully');
    setSelectedListing(null);
    fetchListings();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Car Listings Dashboard</h1>
        <button
          className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            router.push('/');
          }}
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        {['all', 'approved', 'pending', 'rejected'].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${
              filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => {
              setFilter(status as any);
              setCurrentPage(1);
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedListings.map((listing) => (
            <ListingRow
              key={listing.id}
              listing={listing}
              onApprove={(id) => handleAction(id, 'approve')}
              onReject={(id) => handleAction(id, 'reject')}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className="px-4 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Listing</h2>

            <label className="block text-sm">Title</label>
            <input
              type="text"
              value={selectedListing.title}
              onChange={(e) =>
                setSelectedListing({ ...selectedListing, title: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />

            <label className="block text-sm">Location</label>
            <input
              type="text"
              value={selectedListing.location}
              onChange={(e) =>
                setSelectedListing({ ...selectedListing, location: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />

            <label className="block text-sm">Price</label>
            <input
              type="number"
              value={selectedListing.price}
              onChange={(e) =>
                setSelectedListing({ ...selectedListing, price: Number(e.target.value) })
              }
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setSelectedListing(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}