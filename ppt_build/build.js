const pptxgen = require('pptxgenjs');
const html2pptx = require('C:/Users/57673/.accio/accounts/7075482670/agents/DID-F456DA-30F456DAU1777418-7013-C1B00D/agent-core/skills/pptx/scripts/html2pptx.js');

async function main() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Kunyu Wire Mesh';
  pptx.title = 'Weekly Report';

  const slides = [
    'slides/01_title.html',
    'slides/02_overview.html',
    'slides/03_customers.html',
    'slides/04_automation.html',
    'slides/05_plan.html'
  ];

  const failures = [];
  for (const file of slides) {
    try {
      const { slide, placeholders } = await html2pptx(file, pptx);

      if (file === 'slides/02_overview.html') {
        // MIC chart
        slide.addChart(pptx.charts.BAR, [{
          name: "MIC Traffic",
          labels: ["May 07", "May 08", "May 09", "May 10", "May 11", "May 12", "May 13"],
          values: [395, 232, 316, 270, 264, 313, 264] // Actually this is Ali, let's use Ali for the line chart!
        }], {
          ...placeholders[0],
          barDir: 'col',
          showTitle: true, title: 'Alibaba Exposure Trend',
          showLegend: false,
          showCatAxisTitle: false,
          showValAxisTitle: false,
          valAxisMinVal: 0,
          chartColors: ["F96D00"]
        });

        // Ali table
        const tableRows = [
          [{ text: 'Date', options: { bold: true } }, { text: 'Exposure', options: { bold: true } }, { text: 'Visits', options: { bold: true } }, { text: 'Inquiries', options: { bold: true } }],
          ['May 13', '264', '4', '1'],
          ['May 12', '313', '5', '0'],
          ['May 11', '264', '8', '1'],
          ['May 10', '270', '8', '1']
        ];
        slide.addTable(tableRows, { ...placeholders[1], fontSize: 10, border: { type: 'solid', pt: 0.5 } });
      }

      if (file === 'slides/03_customers.html') {
        const tableRows = [
          [{ text: 'Name', options: { bold: true, color: 'FFFFFF' } }, { text: 'Country', options: { bold: true, color: 'FFFFFF' } }, { text: 'Inquiries', options: { bold: true, color: 'FFFFFF' } }, { text: 'Date', options: { bold: true, color: 'FFFFFF' } }, { text: 'Search Terms', options: { bold: true, color: 'FFFFFF' } }],
          ['Michael S.', 'USA', '9', '04-23', 'farm fence wire, fence'],
          ['Donald T.', 'USA', '5', '05-11', '2x4 hinge joint fence'],
          ['Juan C.', 'Colombia', '5', '04-26', ''],
          ['Maria E.', 'Venezuela', '6', '05-04', ''],
          ['Chris H.', 'USA', '1', '04-26', 't post 6']
        ];
        slide.addTable(tableRows, { 
          ...placeholders[0], 
          fontSize: 11, 
          border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
          fill: { color: 'F4F6F6' },
          colW: [1.2, 1.2, 0.8, 0.8, 3.0],
          rowH: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
        });
        
        // We can color the header row properly
        tableRows[0].forEach(cell => cell.options.fill = { color: '2D2D2D' });
      }
    } catch (err) {
      failures.push(`[${file}] ${err.message}`);
    }
  }

  if (failures.length) {
    throw new Error(`BUILD FAILED:\n${failures.join('\n')}`);
  }

  await pptx.writeFile({ fileName: 'Kunyu_Weekly_Report.pptx' });
  console.log('Built PPTX successfully.');
}

main()
  .catch(err => { console.error(err); process.exitCode = 1; })
  .finally(() => html2pptx.close());