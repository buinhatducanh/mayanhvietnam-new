export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-zinc-200 border-t-[#ff6b00] rounded-full animate-spin" />
        <p className="text-sm text-zinc-500">Đang tải…</p>
      </div>
    </div>
  );
}