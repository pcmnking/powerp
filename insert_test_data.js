const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://beuywofzqydshjornwvf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldXl3b2Z6cXlkc2hqb3Jud3ZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjcwOTQ5MSwiZXhwIjoyMDg4Mjg1NDkxfQ.tSzdMaA1b-p37iu7b8BLWIKJpFrMz_OLatDEnUEFDDA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProfiles() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
        console.error(error);
        return;
    }
    console.log('Profiles:', data);

    if (data.length === 0) {
        console.log('No profiles found. I need a vendor profile to link products to.');
    } else {
        const vendorId = data[0].id;
        console.log('Using vendorId:', vendorId);

        const testProducts = [
            {
                vendor_id: vendorId,
                title: '極簡大理石邊桌',
                slug: 'minimalist-marble-side-table',
                description: '由希臘大理石工匠手工打造，這款邊桌展現了石材最純粹的紋理。',
                price: 18500,
                category: '家具',
                images: ['https://images.unsplash.com/photo-1581428982868-e410dd047a90'],
                is_published: true
            },
            {
                vendor_id: vendorId,
                title: '晨曦之光 落地燈',
                slug: 'morning-oak-floor-lamp',
                description: '採用自然橡木與噴砂磨砂玻璃，柔和的光線如同清晨穿透薄霧的曙光。',
                price: 12600,
                category: '燈飾',
                images: ['https://images.unsplash.com/photo-1507473884658-c7a3dc4f8af7'],
                youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Just a placeholder
                is_published: true
            },
            {
                vendor_id: vendorId,
                title: '靜謐之藍 抽象畫',
                slug: 'serenity-blue-abstract',
                description: '由當代藝術家以深海為靈感創作，層疊的藍色色塊帶領觀者進入冥想的世界。',
                price: 32000,
                category: '藝術',
                images: ['https://images.unsplash.com/photo-1541963463532-d68292c34b19'],
                is_published: true
            }
        ];

        const { data: inserted, error: insertError } = await supabase.from('products').insert(testProducts);
        if (insertError) {
            console.error('Insert error:', insertError);
        } else {
            console.log('Successfully inserted test products!');
        }
    }
}

checkProfiles();
