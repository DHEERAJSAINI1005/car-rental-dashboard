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

const ListingRow = React.memo(({ listing, onApprove, onReject, onEdit }: Props) => {
  return (
    <tr>
      <td className="p-2 border">{listing.title}</td>
      <td className="p-2 border">{listing.location}</td>
      <td className="p-2 border">${listing.price}</td>
      <td className="p-2 border capitalize">{listing.status}</td>
      <td className="p-2 border space-x-2">
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
