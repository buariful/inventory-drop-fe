// import { useState, useEffect, useCallback } from "react";
// import toast from "react-hot-toast";
// import { useDrops } from "../../hooks/useDrops";

// export default function DropCard({ drop, refresh }) {
//   const { purchaseDrop, reserveDrop, actionItemId } = useDrops();
//   const [timeLeft, setTimeLeft] = useState(0);

//   const refreshDrops = useCallback(() => {
//     if (timeLeft === 0) {
//       refresh();
//     }
//   }, [refresh, timeLeft]);

//   useEffect(() => {
//     if (drop.activeReservation) {
//       const calculateTimeLeft = () => {
//         const remaining = Math.max(
//           0,
//           Math.floor(
//             (new Date(drop.activeReservation.expiresAt).getTime() -
//               Date.now()) /
//               1000
//           )
//         );
//         setTimeLeft(remaining);
//         if (remaining === 0) {
//           refreshDrops();
//         }
//       };

//       calculateTimeLeft();
//       const interval = setInterval(calculateTimeLeft, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [drop.activeReservation]);

//   const reserve = async () => {
//     try {
//       await reserveDrop(drop.id);
//       toast.success(`Reserved ${drop.name}!`);
//       refresh();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Reservation failed");
//     }
//   };

//   const purchase = async () => {
//     try {
//       await purchaseDrop(drop.activeReservation.id);
//       toast.success(`Purchased ${drop.name}!`);
//       refresh();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Purchase failed");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between border border-gray-200">
//       <div>
//         <h3 className="text-lg font-bold mb-2">{drop.name}</h3>
//         <p className="text-gray-700 mb-1">Price: ${drop.price}</p>
//         <p className="text-gray-700 mb-3">
//           Stock:{" "}
//           <span className="text-red-500 font-semibold">
//             {drop.availableStock}
//           </span>
//         </p>

//         {drop.activeReservation && (
//           <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mb-3">
//             Reserved! Expires in: {timeLeft}s
//           </div>
//         )}
//       </div>

//       <div className="flex gap-2 mb-3">
//         {drop.activeReservation ? (
//           <button
//             onClick={purchase}
//             disabled={actionItemId === drop.activeReservation.id}
//             className="flex-1 py-2 rounded-lg font-semibold transition bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
//           >
//             {actionItemId === drop.activeReservation.id
//               ? "Purchasing..."
//               : "Purchase Now"}
//           </button>
//         ) : (
//           <button
//             onClick={reserve}
//             disabled={actionItemId === drop.id || drop.availableStock === 0}
//             className={`flex-1 py-2 rounded-lg font-semibold transition ${
//               drop.availableStock === 0
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-yellow-500 hover:bg-yellow-600 text-white"
//             }`}
//           >
//             {actionItemId === drop.id ? "Reserving..." : "Reserve"}
//           </button>
//         )}
//       </div>

//       <div>
//         <h4 className="font-semibold mb-1">Recent Buyers</h4>
//         <ul className="list-disc list-inside text-gray-600 text-sm">
//           {drop.recentPurchasers?.length > 0 ? (
//             drop.recentPurchasers.map((u) => <li key={u.id}>{u.username}</li>)
//           ) : (
//             <li>No buyers yet</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDrops } from "../../hooks/useDrops";

export default function DropCard({ drop, refresh }) {
  const { purchaseDrop, reserveDrop, actionItemId } = useDrops();
  const [timeLeft, setTimeLeft] = useState(0);
  const hasRefreshed = useRef(false);

  // const refreshDrops = ()=>{
  //   const timeout = setTimeout(() => {
  //     refresh();
  //   }, 2000);

  // return () => clearTimeout(timeout);
  // }

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

      if (remaining === 0 && !hasRefreshed.current) {
        hasRefreshed.current = true;
        setTimeout(() => {
          refresh();
        }, 2000);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [drop.activeReservation, refresh]);

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
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between border border-gray-200">
      <div>
        <h3 className="text-lg font-bold mb-2">{drop.name}</h3>
        <p className="text-gray-700 mb-1">Price: ${drop.price}</p>
        <p className="text-gray-700 mb-3">
          Stock:{" "}
          <span className="text-red-500 font-semibold">
            {drop.availableStock}
          </span>
        </p>

        {drop.activeReservation?.id && (
          <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mb-3">
            Reserved! Expires in: {timeLeft}s
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        {drop.activeReservation?.id ? (
          <button
            onClick={purchase}
            disabled={actionItemId === drop.activeReservation.id}
            className="flex-1 py-2 rounded-lg font-semibold transition bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
          >
            {actionItemId === drop.activeReservation.id
              ? "Purchasing..."
              : "Purchase Now"}
          </button>
        ) : (
          <button
            onClick={reserve}
            disabled={actionItemId === drop.id || drop.availableStock === 0}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
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
