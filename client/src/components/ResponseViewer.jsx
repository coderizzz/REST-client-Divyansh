import { useRequestStore } from "../store/requestStore";

export default function ResponseViewer() {
  const { response, error } = useRequestStore();

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!response) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="text-sm text-ash mb-2">
        Status: {response.status} · Time: {response.time}ms
      </div>

      <pre className="text-sm bg-mist p-4 rounded overflow-auto">
        {JSON.stringify(response.body, null, 2)}
      </pre>
    </div>
  );
}
