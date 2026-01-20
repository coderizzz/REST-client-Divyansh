import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";
import HistoryList from "./components/HistoryList";

export default function App() {
  return (
    <div className="min-h-screen flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
       <h1 className="text-4xl font-semibold text-ink tracking-wide">
          Quiet Request
       </h1>
       <p className="text-ash text-sm mt-1">
        a calm place to speak with APIs
       </p>
        <RequestForm />
        <ResponseViewer />
        <HistoryList />
      </div>
    </div>
  );
}
