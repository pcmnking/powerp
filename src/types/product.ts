export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    slug: string;
    category?: string;
    youtube_url?: string;
    is_published?: boolean;
    vendor_id?: string;
    created_at?: string;
}
