import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function DropCard({ drop, refresh }) {
  const [loadingReserve, setLoadingReserve] = useState(false);
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const reserve = async () => {
    try {
      setLoadingReserve(true);
      await api.post(`/drops/${drop.id}/reserve`);
      toast.success(`Reserved ${drop.name}!`);
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reservation failed");
    } finally {
      setLoadingReserve(false);
    }
  };

  const purchase = async () => {
    try {
      setLoadingPurchase(true);
      await api.post(`/drops/${drop.id}/purchase`);
      toast.success(`Purchased ${drop.name}!`);
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Purchase failed");
    } finally {
      setLoadingPurchase(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between border border-gray-200">
      <div>
        <h3 className="text-lg font-bold mb-2">{drop.name}</h3>
        <p className="text-gray-700 mb-1">Price: ${drop.price}</p>
        <p className="text-gray-700 mb-3">Stock: {drop.stock}</p>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={reserve}
          disabled={loadingReserve || drop.stock === 0}
          className={`flex-1 py-2 rounded-lg font-semibold transition ${
            drop.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }`}
        >
          {loadingReserve ? "Reserving..." : "Reserve"}
        </button>
        <button
          onClick={purchase}
          disabled={loadingPurchase || drop.stock === 0}
          className={`flex-1 py-2 rounded-lg font-semibold transition ${
            drop.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loadingPurchase ? "Purchasing..." : "Purchase"}
        </button>
      </div>

      <div>
        <h4 className="font-semibold mb-1">Recent Buyers</h4>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          {drop.recentPurchasers?.length > 0 ? (
            drop.recentPurchasers.map((u) => <li key={u.id}>{u.username}</li>)
          ) : (
            <li>No buyers yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}
