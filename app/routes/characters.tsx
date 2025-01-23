import { useLoaderData, Link } from "react-router-dom";
import type { Route } from "./+types/characters";
import { useState, Suspense } from "react";

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Star Wars Characters" },
    { name: "description", content: "List of Star Wars characters from SWAPI" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  console.time('Initial SWAPI fetch');
  const response = await fetch('https://swapi.dev/api/people');
  const data = await response.json();
  console.timeEnd('Initial SWAPI fetch');
  return { 
    characters: data.results as Character[],
    next: data.next 
  };
}

function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="border p-4 rounded shadow animate-fadeIn">
      <h2 className="text-xl font-semibold">{character.name}</h2>
      <p>Height: {character.height}cm</p>
      <p>Mass: {character.mass}kg</p>
      <p>Birth Year: {character.birth_year}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="border p-4 rounded shadow animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const [characters, setCharacters] = useState(loaderData.characters);
  const [nextUrl, setNextUrl] = useState(loaderData.next);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const loadMore = async () => {
    if (!nextUrl || loading) return;
    
    const nextPage = pageCount + 1;
    setLoading(true);
    
    // Show skeleton immediately
    setCharacters(prev => [...prev, ...Array(10).fill(null)]);
    
    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      setCharacters(prev => [...prev.filter(Boolean), ...data.results]);
      setNextUrl(data.next);
      setPageCount(nextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Star Wars Characters</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characters.map((character, index) => (
          <div key={character?.name || `skeleton-${index}`}>
            {character ? (
              <CharacterCard character={character} />
            ) : (
              <SkeletonCard />
            )}
          </div>
        ))}
      </div>
      {nextUrl && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
} 