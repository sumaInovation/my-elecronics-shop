const { createClient } = require('@supabase/supabase-js');
const { faker } = require('@faker-js/faker');

const supabaseUrl = 'https://frqidzdqomybnninqurz.supabase.co';
const supabaseKey = 'sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR';
const supabase = createClient(supabaseUrl, supabaseKey);

const sinhalaComments = [
    "පට්ට භාණ්ඩයක්, ගොඩක් ස්තූතියි!",
    "හොඳ quality එකක් තියෙනවා. Automation වැඩ වලට නියමයි.",
    "Delivery එකත් ඉක්මන්. සතුටුයි වැඩේ ගැන.",
    "මම හොයපු විදියටම තියෙනවා. Highly recommended!",
    "ගාණට වටිනවා. කිසිම අවුලක් නැහැ.",
    "සුපිරි වැඩක් මචං!",
    "PLC එක නියමෙටම වැඩ කරනවා.",
    "Suma Automation එකෙන් ගත්ත හොඳම product එකක්."
];

async function seedMassiveReviews() {
    console.log('🔍 දැනට තියෙන Products හොයනවා...');
    
    // 1. දැනට තියෙන ඔක්කොම Product IDs ගන්නවා
    const { data: products, error: pError } = await supabase.from('products').select('id');
    
    if (pError || !products) {
        console.error('❌ Products හොයාගන්න බැරි වුණා:', pError?.message);
        return;
    }

    console.log(`🚀 Products ${products.length} කට reviews දාන්න පටන් ගත්තා...`);

    let allReviews = [];

    products.forEach(product => {
        // හැම product එකකටම reviews 1ත් 4ත් අතර ගණනක් හදනවා
        const reviewCount = faker.number.int({ min: 1, max: 4 });

        for (let i = 0; i < reviewCount; i++) {
            const isSinhala = faker.datatype.boolean();
            const comment = isSinhala 
                ? faker.helpers.arrayElement(sinhalaComments) 
                : faker.commerce.productAdjective() + " " + faker.commerce.productMaterial() + "! Very " + faker.word.adjective() + ".";

            allReviews.push({
                product_id: product.id,
                user_name: faker.person.fullName(),
                rating: faker.number.int({ min: 4, max: 5 }), // ගොඩක් ඒවා 4-5 ratings වෙන්න දැම්මා
                comment: comment,
                created_at: new Date()
            });
        }
    });

    // 2. එකපාරටම reviews ටික Database එකට දානවා (Batch insert)
    // Supabase එකේ limit එකක් තියෙන්න පුළුවන් නිසා 100 බැගින් split කරලා දානවා
    const chunk = 100;
    for (let i = 0; i < allReviews.length; i += chunk) {
        const batch = allReviews.slice(i, i + chunk);
        const { error } = await supabase.from('Reviews').insert(batch);
        if (error) console.error('❌ Batch Error:', error.message);
    }

    console.log(`✅ සාර්ථකයි! Reviews ${allReviews.length} ක් database එකට එකතු වුණා.`);
}

seedMassiveReviews();