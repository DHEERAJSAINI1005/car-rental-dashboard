import React from 'react';

type Listing = {
  id: number;
  title: string;
  status: string;
  price: number;
  location: string;
};

type Props = {
  listing: Listing;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onEdit: (listing: Listing) => void;
};

const getStatusChip = (status: string) => {
  const baseClass = 'px-3 py-1 rounded-full text-xs font-semibold capitalize';

  switch (status.toLowerCase()) {
    case 'approved':
      return <span className={`${baseClass} bg-green-100 text-green-700`}>Approved</span>;
    case 'rejected':
      return <span className={`${baseClass} bg-red-100 text-red-700`}>Rejected</span>;
    case 'pending':
      return <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>Pending</span>;
    default:
      return <span className={`${baseClass} bg-gray-200 text-gray-800`}>{status}</span>;
  }
};

const ListingRow = React.memo(({ listing, onApprove, onReject, onEdit }: Props) => {
  return (
    <tr>
      <td className="p-2 border">{listing.title}</td>
      <td className="p-2 border">{listing.location}</td>
      <td className="text-center border">${listing.price}</td>
      <td className="text-center border capitalize">{getStatusChip(listing.status)}</td>
      <td className="text-center border space-x-2">
        <button
          className="px-2 py-1 bg-green-500 text-white rounded text-xs"
          onClick={() => onApprove(listing.id)}
        >
          Approve
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
          onClick={() => onReject(listing.id)}
        >
          Reject
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
          onClick={() => onEdit(listing)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
});

export default ListingRow;
