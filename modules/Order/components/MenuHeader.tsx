import Image from "next/image";

export default function MenuHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="h-[60px] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative">
            <Image
              src="/favicon.svg" 
              alt="Cravings Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-xl font-bold text-blue-800">Cravings</p>
        </div>
        <span className="block text-sm font-medium text-gray-600">
          Order & Enjoy 🍽️
        </span>
      </div>
    </header>
  );
}
