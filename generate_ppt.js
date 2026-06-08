const pptxgen = require('pptxgenjs');
const html2pptx = require('C:/Users/57673/.accio/accounts/7075482670/agents/DID-F456DA-30F456DAU1777418-7013-C1B00D/agent-core/skills/pptx/scripts/html2pptx');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Husband';
    pptx.title = '五一专属宠妻（兼溜娃）企划书';

    console.log("Generating Slide 1...");
    await html2pptx('slide1.html', pptx);
    
    console.log("Generating Slide 2...");
    await html2pptx('slide2.html', pptx);
    
    console.log("Generating Slide 3...");
    await html2pptx('slide3.html', pptx);
    
    console.log("Generating Slide 4...");
    await html2pptx('slide4.html', pptx);
    
    console.log("Generating Slide 5...");
    await html2pptx('slide5.html', pptx);

    await pptx.writeFile({ fileName: '五一专属宠妻企划书.pptx' });
    console.log('Presentation created successfully!');
}

createPresentation().catch(console.error);