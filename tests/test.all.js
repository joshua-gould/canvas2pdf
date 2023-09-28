const puppeteer = require("puppeteer");
const fs = require("fs");
if (fs.existsSync("tests/img")) {
  fs.rmSync("tests/img", { recursive: true, force: true });
}
fs.mkdirSync("tests/img/png", { recursive: true });
fs.mkdirSync("tests/img/pdf", { recursive: true });

async function generateImages(name) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 1000 });
  await page.goto("http://localhost:1234?name=" + name);
  await page.$("#test");
  const canvas = await page.$("#canvas-output");
  await canvas.screenshot({ path: "tests/img/png/" + name + ".png" });
  const pdfText = await page.$("#pdf-text");
  const pdfUrl = await pdfText.evaluate((el) => el.textContent);
  page.downloadFile = async function (url, destinationPath) {
    const binaryString = await page.evaluate(async (url) => {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const blob = await response.blob();
      const result = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsBinaryString(blob);
      });
      return result;
    }, url);
    const fileBlob = Buffer.from(binaryString, "binary");
    await fs.writeFileSync(destinationPath, fileBlob);
  };
  await page.downloadFile(pdfUrl, "tests/img/pdf/" + name + ".pdf");
  await browser.close();
}

it('canvas"', async () => {
  const tests = [
    "arc",
    "emptyArc",
    "fillstyle",
    "globalalpha",
    "gradient",
    "linecap",
    "linewidth",
    "rgb",
    "rgba",
    "saveandrestore",
    "setTransform",
    "text",
  ];
  // const tests = ['linewidth'];
  for (let i = 0; i < tests.length; i++) {
    await generateImages(tests[i]);
  }
}, 10000);
