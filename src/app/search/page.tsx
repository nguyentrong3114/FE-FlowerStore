"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    return (
        <div className="min-h-screen pt-20 px-6">
            <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm cho: {query}</h1>
            
            {query ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                </div>
            ) : (
                <p className="text-gray-500">Vui lòng nhập từ khóa để tìm kiếm</p>
            )}
        </div>
    );
}