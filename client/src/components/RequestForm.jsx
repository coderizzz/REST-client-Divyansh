import { useRequestStore } from "../store/requestStore";

export default function RequestForm() {
  const {
    method,
    url,
    headers,
    body,
    loading,
    setField,
    sendRequest
  } = useRequestStore();

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setField("method", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          value={url}
          onChange={(e) => setField("url", e.target.value)}
          placeholder="https://api.example.com"
          className="flex-1 border rounded px-3 py-2"
        />
      </div>

      <textarea
        value={headers}
        onChange={(e) => setField("headers", e.target.value)}
        placeholder='{"Content-Type": "application/json"} (valid JSON)'
        className="w-full border rounded px-3 py-2 font-mono text-sm"
        rows={3}
      />

      {(method === "POST" || method === "PUT") && (
        <textarea
          value={body}
          onChange={(e) => setField("body", e.target.value)}
          placeholder='{"key": "value"}'
          className="w-full border rounded px-3 py-2 font-mono text-sm"
          rows={4}
        />
      )}

      <button
        onClick={sendRequest}
        disabled={loading}
        className="bg-ink text-white px-6 py-2 rounded hover:opacity-90"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
