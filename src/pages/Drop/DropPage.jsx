import { useEffect, useState } from "react";
import api from "../../api/axios";
import DropCard from "./DropCard";

export default function DropsPage() {
  const [drops, setDrops] = useState([]);

  const loadDrops = async () => {
    try {
      const res = await api.get("/drops");
      setDrops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDrops();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🔥 Sneaker Drops</h1>

      {drops.length === 0 ? (
        <p className="text-gray-500">No active drops available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drops.map((drop) => (
            <DropCard key={drop.id} drop={drop} refresh={loadDrops} />
          ))}
        </div>
      )}
    </div>
  );
}
