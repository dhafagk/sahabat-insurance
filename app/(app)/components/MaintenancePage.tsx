import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Image
        src="/uc.jpeg"
        alt="Website Under Construction"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
