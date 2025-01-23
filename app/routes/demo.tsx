import type { Route } from "./+types/demo";
import { Link } from "react-router-dom";

interface DemoData {
  timestamp: string;
  randomNumber: number;
  serverInfo: {
    nodeVersion: string;
    platform: string;
    memory: number;
    timezone: string;
  };
  requestInfo: {
    method: string;
    url: string;
    userAgent: string;
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Server Loader Demo" },
    { name: "description", content: "Demo of server-side loading with detailed system information" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return { 
    timestamp: new Date().toISOString(),
    randomNumber: Math.floor(Math.random() * 100),
    serverInfo: {
      nodeVersion: process.version,
      platform: process.platform,
      memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    requestInfo: {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent') || 'Unknown',
    }
  };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { timestamp, randomNumber, serverInfo, requestInfo } = loaderData;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Server Loader Demo</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
      
      <div className="space-y-4 max-w-lg mx-auto">
        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Basic Server Data:</h2>
          <p>Timestamp: {timestamp}</p>
          <p>Random Number: {randomNumber}</p>
        </div>

        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Server Information:</h2>
          <p>Node Version: {serverInfo.nodeVersion}</p>
          <p>Platform: {serverInfo.platform}</p>
          <p>Heap Memory Usage: {serverInfo.memory}MB</p>
          <p>Timezone: {serverInfo.timezone}</p>
        </div>

        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Request Details:</h2>
          <p>Method: {requestInfo.method}</p>
          <p>URL: {requestInfo.url}</p>
          <p>User Agent: {requestInfo.userAgent}</p>
        </div>
        
        <div className="text-center">
          <Link 
            to="/demo" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Reload Data
          </Link>
        </div>
      </div>
    </div>
  );
} 