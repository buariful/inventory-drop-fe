import { useEffect, useState, useCallback } from "react";
import DropCard from "./DropCard";
import { socket } from "../../api/socket";
import { useDrops } from "../../hooks/useDrops";
import Navbar from "../../components/Navbar";

export default function DropsPage() {
  const [drops, setDrops] = useState([]);
  const { loading, error, fetchDrops } = useDrops();

  const loadDrops = useCallback(async () => {
    try {
      const data = await fetchDrops();
      setDrops(data?.data?.list || []);
    } catch (err) {
      console.error(err);
    }
  }, [fetchDrops]);

  useEffect(() => {
    loadDrops();
  }, [loadDrops]);

  useEffect(() => {
    socket.connect(); // connect socket

    // example: listen for stock updates
    socket.on("stock_update", ({ availableStock, dropId }) => {
      setDrops((prevDrops) =>
        prevDrops.map((drop) =>
          drop.id === dropId ? { ...drop, availableStock } : drop
        )
      );
    });
    return () => {
      socket.disconnect(); // clean up on unmount
    };
  }, [loadDrops]);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {loading && drops.length === 0 && (
          <p className="text-blue-500 mb-4">Loading drops...</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!loading && drops.length === 0 ? (
          <p className="text-gray-500">No active drops available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {drops.map((drop) => (
              <DropCard key={drop.id} drop={drop} refresh={loadDrops} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
