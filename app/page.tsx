import GameBoard from '@/components/GameBoard';

 
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
      
        <GameBoard />
      </div>
    </main>
  );
}