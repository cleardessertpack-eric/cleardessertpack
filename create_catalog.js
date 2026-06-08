const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();

pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Kunyu Wire Mesh';
pptx.company = 'Kunyu Wire Mesh';
pptx.title = 'Plastic Barrier Fence Catalog';

pptx.defineSlideMaster({
    title: 'KUNYU_MASTER',
    background: { color: 'FFFFFF' },
    objects: [
        { rect: { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: 'ED7D31' } } }, 
        { rect: { x: 0, y: 5.3, w: '100%', h: 0.35, fill: { color: '2D2D2D' } } }, 
        { text: { text: 'Kunyu Wire Mesh | Made-in-China Verified Supplier', options: { x: 0.2, y: 5.35, w: 5, h: 0.2, color: 'FFFFFF', fontSize: 10 } } }
    ]
});

// SLIDE 1: Cover
let slide1 = pptx.addSlide();
slide1.background = { color: '2D2D2D' };
slide1.addImage({ path: 'https://sc01.alicdn.com/kf/S6db10404998f42cfb4927c38b8f17be9Z.jpg', x: 0.5, y: 0.6, w: 2, h: 1.5, sizing: {type: 'contain'} });
slide1.addText('HIGH-VISIBILITY\nPLASTIC BARRIER FENCE', { x: 0.5, y: 2.2, w: 9, h: 1.5, fontSize: 44, color: 'FFFFFF', bold: true });
slide1.addText('Designed for Construction, Events & Farm Security.', { x: 0.5, y: 3.8, w: 9, h: 0.5, fontSize: 20, color: 'ED7D31', bold: true });
slide1.addImage({ path: 'https://sc01.alicdn.com/kf/Sf3006290f59147b09a20aa72e78ea800Y.png', x: 6.5, y: 0, w: 3.5, h: 5.625, sizing: {type: 'cover'} }); // Crop of first page

// SLIDE 2: Core Value
let slide2 = pptx.addSlide({ masterName: 'KUNYU_MASTER' });
slide2.addText('Why Choose Kunyu Plastic Barrier?', { x: 0.5, y: 0.4, w: 8, h: 0.6, fontSize: 28, color: 'ED7D31', bold: true });

slide2.addText([
    { text: '100% Virgin HDPE & UV Stabilized\n', options: { fontSize: 16, bold: true, color: '2D2D2D' } },
    { text: 'Ensures long lifespan even under harsh outdoor sunlight.\n\n', options: { fontSize: 14, color: '666666' } },
    { text: 'Vertical Stretched Tech\n', options: { fontSize: 16, bold: true, color: '2D2D2D' } },
    { text: 'Lighter weight but much higher tensile strength compared to normal types.\n\n', options: { fontSize: 14, color: '666666' } },
    { text: 'Reusable & Recyclable\n', options: { fontSize: 16, bold: true, color: '2D2D2D' } },
    { text: 'Highly cost-effective. Easy to roll up and use again for rental business.\n\n', options: { fontSize: 14, color: '666666' } },
    { text: 'Easy Installation\n', options: { fontSize: 16, bold: true, color: '2D2D2D' } },
    { text: 'Simply unroll and tie to T-posts or wooden poles. No maintenance required.', options: { fontSize: 14, color: '666666' } }
], { x: 0.5, y: 1.2, w: 5.5, h: 3.8 });

slide2.addImage({ path: 'https://sc01.alicdn.com/kf/Sf693adb00ed4429ca2707df15fe018c1R.png', x: 6.2, y: 1.0, w: 3.5, h: 4.0, sizing: {type: 'contain'} });

// SLIDE 3: Products SR
let slide3 = pptx.addSlide({ masterName: 'KUNYU_MASTER' });
slide3.addText('Economic Safety Fence (SR Type)', { x: 0.5, y: 0.3, w: 8, h: 0.6, fontSize: 24, color: 'ED7D31', bold: true });
slide3.addImage({ path: 'https://sc01.alicdn.com/kf/Sb2eb888bbeb74c17978d1ae695a57b0a5.png', x: 0.5, y: 1.0, w: 9, h: 4.2, sizing: {type: 'contain'} });

// SLIDE 4: Products BR
let slide4 = pptx.addSlide({ masterName: 'KUNYU_MASTER' });
slide4.addText('Stronger Warning Barrier (BR Type)', { x: 0.5, y: 0.3, w: 8, h: 0.6, fontSize: 24, color: 'ED7D31', bold: true });
slide4.addImage({ path: 'https://sc01.alicdn.com/kf/S224917a1e85f44b1919b4af6cd631242R.png', x: 0.5, y: 1.0, w: 9, h: 4.2, sizing: {type: 'contain'} });

// SLIDE 5: Packaging (The Killer Page)
let slide5 = pptx.addSlide({ masterName: 'KUNYU_MASTER' });
slide5.addText('Optimized Container Loading Solutions', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 24, color: 'ED7D31', bold: true });
slide5.addText('We provide dual packaging options to maximize space and lower your sea freight costs.', { x: 0.5, y: 0.8, w: 9, h: 0.3, fontSize: 14, color: '666666' });

// Bulk loading image
slide5.addImage({ path: 'https://sc01.alicdn.com/kf/S1e05b31821364698b94369a625e0e3bbk.jpg', x: 0.5, y: 1.3, w: 2.8, h: 2.5, sizing: {type: 'contain'} });
slide5.addText('Bulk Loading', { x: 0.5, y: 3.9, w: 2.8, h: 0.3, fontSize: 14, bold: true, align: 'center', color: '2D2D2D' });
slide5.addText('Maximize container space\nLowest unit freight cost', { x: 0.5, y: 4.2, w: 2.8, h: 0.4, fontSize: 12, align: 'center', color: '666666' });

// Pallet packing image
slide5.addImage({ path: 'https://sc01.alicdn.com/kf/S8ed058aa2e7c46e591cf7847eede66bf5.jpg', x: 3.6, y: 1.3, w: 2.8, h: 2.5, sizing: {type: 'contain'} });
slide5.addText('Pallet Packing', { x: 3.6, y: 3.9, w: 2.8, h: 0.3, fontSize: 14, bold: true, align: 'center', color: '2D2D2D' });
slide5.addText('Fast loading & unloading\nIdeal for warehouse distribution', { x: 3.6, y: 4.2, w: 2.8, h: 0.4, fontSize: 12, align: 'center', color: '666666' });

// Loaded truck image
slide5.addImage({ path: 'https://sc01.alicdn.com/kf/Sa4f66f36a7384fb1bc119755a6f0bc458.jpg', x: 6.7, y: 1.3, w: 2.8, h: 2.5, sizing: {type: 'contain'} });
slide5.addText('Ready to Ship', { x: 6.7, y: 3.9, w: 2.8, h: 0.3, fontSize: 14, bold: true, align: 'center', color: '2D2D2D' });
slide5.addText('High production capacity\nFast lead times', { x: 6.7, y: 4.2, w: 2.8, h: 0.4, fontSize: 12, align: 'center', color: '666666' });

// SLIDE 6: Call to Action
let slide6 = pptx.addSlide();
slide6.background = { color: '2D2D2D' };

slide6.addText('READY TO GET A QUICK QUOTE?', { x: 1, y: 0.8, w: 8, h: 1, fontSize: 32, color: 'FFFFFF', bold: true, align: 'center' });
slide6.addText('Let\'s Talk Business!', { x: 1, y: 1.6, w: 8, h: 0.5, fontSize: 24, color: 'ED7D31', bold: true, align: 'center' });

slide6.addText('Sales Representative: Peter', { x: 1.5, y: 2.5, w: 4, h: 0.4, fontSize: 18, color: 'FFFFFF', bold: true });
slide6.addText('WhatsApp: +86 183 5667 5376', { x: 1.5, y: 3.0, w: 4, h: 0.4, fontSize: 18, color: 'FFFFFF', bold: true });
slide6.addText('Website: zhejiangkunyu.en.made-in-china.com', { x: 1.5, y: 3.5, w: 6, h: 0.4, fontSize: 18, color: 'FFFFFF' });

slide6.addImage({ path: 'https://sc01.alicdn.com/kf/S5c99f3b43f534181bd77d07765db5b99g.png', x: 6.5, y: 2.2, w: 2, h: 2, sizing: {type: 'contain'} });
slide6.addText('Scan to Chat on WhatsApp', { x: 6.0, y: 4.3, w: 3, h: 0.3, fontSize: 14, color: 'ED7D31', align: 'center', bold: true });

pptx.writeFile({ fileName: 'D:/桌面/ai饲料库/Kunyu_Plastic_Barrier_Fence_Catalog.pptx' }).then(() => {
    console.log('done');
}).catch(err => {
    console.error(err);
});