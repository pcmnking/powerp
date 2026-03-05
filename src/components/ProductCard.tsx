import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-50 mb-6 overflow-hidden relative">
                {product.images?.[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300">
                        暫無圖片
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-500" />
            </div>
            <div className="space-y-2 text-center">
                <h3 className="text-xs uppercase tracking-widest font-medium">{product.title}</h3>
                <p className="font-serif text-sm italic text-gray-500">{product.category || '精品系列'}</p>
                <p className="text-xs tracking-widest mt-4">NT$ {product.price?.toLocaleString()}</p>
            </div>
        </div>
    );
}
