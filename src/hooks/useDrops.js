import { useState, useCallback } from "react";
import api from "../api/axios";

export function useDrops() {
  const [loading, setLoading] = useState(false);
  const [actionItemId, setActionItemId] = useState(null);
  const [error, setError] = useState(null);

  const fetchDrops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/drops");
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Failed to fetch drops";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reserveDrop = useCallback(async (dropId) => {
    setActionItemId(dropId);
    setError(null);
    try {
      const res = await api.post(`/api/drops/${dropId}/reserve`);
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Reservation failed";
      setError(message);
      throw err;
    } finally {
      setActionItemId(null);
    }
  }, []);

  const purchaseDrop = useCallback(async (reserveId) => {
    setActionItemId(reserveId);
    setError(null);
    try {
      const res = await api.post(`/api/drops/${reserveId}/purchase`);
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Purchase failed";
      setError(message);
      throw err;
    } finally {
      setActionItemId(null);
    }
  }, []);

  return {
    loading,
    error,
    fetchDrops,
    reserveDrop,
    purchaseDrop,
    actionItemId,
  };
}
