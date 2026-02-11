'use client';

import { useState } from 'react';

export default function TestMigrationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runMigration = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/classes/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Migration failed');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Class Migration Test</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <button
            onClick={runMigration}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Running Migration...' : 'Run Migration'}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-900/50 border border-green-500 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Migration Result</h2>
            <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Click the "Run Migration" button to migrate all class data to MongoDB</li>
            <li>The migration will skip classes that already exist in the database</li>
            <li>Check the result to see which classes were created or skipped</li>
            <li>You can also test the endpoint directly: <code className="bg-gray-700 px-2 py-1 rounded">POST /api/classes/migrate</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

