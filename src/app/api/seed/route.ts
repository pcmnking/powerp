import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
    // 獲取 Service Role Key 以進行初始化
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        // 1. 獲取第一個用戶作為供應商
        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .limit(1);

        if (profileError || !profiles || profiles.length === 0) {
            return NextResponse.json({
                error: 'No profile found. Please register an account at /login first.'
            }, { status: 400 });
        }

        const vendorId = profiles[0].id;

        // 2. 測試商品資料
        const testProducts = [
            {
                vendor_id: vendorId,
                title: '極簡大理石邊桌',
                slug: 'minimalist-marble-side-table-' + Math.random().toString(36).substring(2, 7),
                description: '由希臘大理石工匠手工打造，這款邊桌展現了石材最純粹的紋理。',
                price: 18500,
                category: '家具',
                images: ['https://images.unsplash.com/photo-1581428982868-e410dd047a90'],
                is_published: true
            },
            {
                vendor_id: vendorId,
                title: '晨曦之光 落地燈',
                slug: 'morning-oak-floor-lamp-' + Math.random().toString(36).substring(2, 7),
                description: '採用自然橡木與噴砂磨砂玻璃，柔和的光線如同清晨穿透薄霧的曙光。',
                price: 12600,
                category: '燈飾',
                images: ['https://images.unsplash.com/photo-1507473884658-c7a3dc4f8af7'],
                youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                is_published: true
            },
            {
                vendor_id: vendorId,
                title: '靜謐之藍 抽象畫',
                slug: 'serenity-blue-abstract-' + Math.random().toString(36).substring(2, 7),
                description: '由當代藝術家以深海為靈感創作，層疊的藍色色塊帶領觀者進入冥想的世界。',
                price: 32000,
                category: '藝術',
                images: ['https://images.unsplash.com/photo-1541963463532-d68292c34b19'],
                is_published: true
            }
        ];

        const { error: insertError } = await supabase
            .from('products')
            .insert(testProducts);

        if (insertError) throw insertError;

        return NextResponse.json({ message: '測試商品已成功上架！' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
