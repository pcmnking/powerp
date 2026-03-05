export default function Page() {
    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#f9f8f6] -z-10" />
                <div className="text-center space-y-8 px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">2026 秋冬系列</p>
                    <h1 className="text-5xl md:text-7xl font-serif tracking-widest uppercase leading-tight">
                        極簡主義 <br /> 的本質
                    </h1>
                    <div className="pt-8">
                        <a href="/products" className="luxury-button">
                            探索系列
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Collection Placeholder */}
            <section className="max-w-7xl mx-auto px-8">
                <div className="flex justify-between items-end mb-16">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-serif tracking-widest uppercase">Featured</h2>
                        <p className="text-xs text-gray-400 uppercase tracking-widest italic">Hand-selected for excellence.</p>
                    </div>
                    <a href="#" className="text-[10px] border-b border-black pb-1 uppercase tracking-widest hover:opacity-50 transition-opacity">View All</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-gray-50 mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300">
                                    Product Image Placeholder
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-500" />
                            </div>
                            <div className="space-y-2 text-center">
                                <h3 className="text-xs uppercase tracking-widest font-medium">Artisan Object 0{i}</h3>
                                <p className="font-serif text-sm italic text-gray-500">Curated Series</p>
                                <p className="text-xs tracking-widest mt-4">$1,250.00</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
