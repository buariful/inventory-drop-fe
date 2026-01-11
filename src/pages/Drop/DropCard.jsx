import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDrops } from "../../hooks/useDrops";

export default function DropCard({ drop, refresh }) {
  const { purchaseDrop, reserveDrop, actionItemId } = useDrops();
  const [timeLeft, setTimeLeft] = useState(0);
  const hasRefreshed = useRef(false);

  useEffect(() => {
    if (!drop.activeReservation) return;

    hasRefreshed.current = false;

    const calculateTimeLeft = () => {
      const remaining = Math.max(
        0,
        Math.floor(
          (new Date(drop.activeReservation.expiresAt).getTime() - Date.now()) /
            1000
        )
      );

      setTimeLeft(remaining);

      // if (remaining === 0 && !hasRefreshed.current) {
      //   hasRefreshed.current = true;
      //   setTimeout(() => {
      //     refresh();
      //   }, 2000);
      // }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [drop.activeReservation]);

  const reserve = async () => {
    try {
      await reserveDrop(drop.id);
      toast.success(`Reserved ${drop.name}!`);
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reservation failed");
    }
  };

  const purchase = async () => {
    try {
      await purchaseDrop(drop.activeReservation.id);
      toast.success(`Purchased ${drop.name}!`);
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between border border-gray-200">
      <img
        src={drop?.image}
        alt={drop?.name}
        className="w-full h-40 object-cover"
      />

      <div className="px-4 pb-4 pt-2">
        <h3 className="text-lg font-bold ">{drop.name}</h3>

        <div className="flex items-center justify-between">
          <p className="text-gray-700 mb-1">Price: ${drop.price}</p>

          <p className="text-gray-700 mb-3">
            Stock:{" "}
            {drop.availableStock > 0 ? (
              <span className="text-red-500 font-semibold">
                {drop.availableStock}
              </span>
            ) : (
              <span className="text-gray-500 font-semibold">Out of stock</span>
            )}
          </p>
        </div>

        {drop.activeReservation?.id && timeLeft > 0 && (
          <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mb-3">
            Reserved! Expires in: {timeLeft}s
          </div>
        )}

        <div className="flex gap-2 mb-3">
          {drop.activeReservation?.id && timeLeft > 0 ? (
            <button
              onClick={purchase}
              disabled={
                actionItemId === drop.activeReservation.id || timeLeft === 0
              }
              className="flex-1 py-2 rounded-lg cursor-pointer font-semibold transition bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
            >
              {actionItemId === drop.activeReservation.id
                ? "Purchasing..."
                : "Purchase Now"}
            </button>
          ) : (
            <button
              onClick={reserve}
              disabled={actionItemId === drop.id || drop.availableStock === 0}
              className={`flex-1 py-2 rounded-lg cursor-pointer font-semibold transition ${
                drop.availableStock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
            >
              {actionItemId === drop.id ? "Reserving..." : "Reserve"}
            </button>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-1">Recent Buyers</h4>
          <ul className="list-disc list-inside flex items-center gap-2 text-gray-600 text-xs capitalize">
            {drop.recentPurchasers?.length > 0 ? (
              drop.recentPurchasers.map((u) => <li key={u.id}>{u.username}</li>)
            ) : (
              <li>No buyers yet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
