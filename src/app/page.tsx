import IdCardCreator from "@/components/IdCardCreator";
import DonationBanner from "@/components/DonationBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <IdCardCreator />
      <DonationBanner />

      <div className="w-full text-center mt-4 mb-2 text-gray-600 text-sm">
        Built by <a
          href="https://twitter.com/Terminus42069"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-600 hover:text-yellow-700 transition-colors"
        >
          @Terminus42069
        </a>
      </div>
    </main>
  );
}
