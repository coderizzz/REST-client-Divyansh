import { useEffect } from "react";
import { useHistoryStore } from "../store/historyStore";
import { useRequestStore } from "../store/requestStore";

export default function HistoryList() {
  const { items, fetchHistory, offset, total, loading } =
    useHistoryStore();

  const { sendRequest } = useRequestStore();
  const { response } = useRequestStore();

  useEffect(() => {
    fetchHistory(0);
  }, [fetchHistory, response]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-medium mb-4">
        Previous Requests
      </h2>

      {loading && (
        <p className="text-sm text-gray-400">Loading…</p>
      )}

      <div className="space-y-3">
        {items.map((req) => (
          <div
            key={req.id}
            onClick={() =>
              sendRequest({
                method: req.method,
                url: req.url,
                headers: req.headers,
                body: req.body
              })
            }
            className="p-4 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer"
          >
            <div className="text-sm text-gray-600">
              {req.method} · {req.status} · {req.responseTime}ms
            </div>
            <div className="text-xs text-gray-400 truncate">
              {req.url}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        {offset > 0 && (
          <button
            onClick={() => fetchHistory(offset - 4)}
            className="text-sm text-gray-600 hover:underline"
          >
            ← Previous
          </button>
        )}

        {offset + 4 < total && (
          <button
            onClick={() => fetchHistory(offset + 4)}
            className="text-sm text-gray-600 hover:underline"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
