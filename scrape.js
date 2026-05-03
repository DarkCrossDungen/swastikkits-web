import fs from 'fs';

async function run() {
  try {
    console.log("Fetching https://www.swastikkits.com/ ...");
    const response = await fetch("https://www.swastikkits.com/");
    const html = await response.text();
    fs.writeFileSync('swastik_home.html', html);
    console.log("Saved HTML to swastik_home.html");
    
    // Look for Next.js data scripts
    const scriptTags = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    if (scriptTags) {
      console.log(`Found ${scriptTags.length} script tags`);
      for (const tag of scriptTags) {
        if (tag.includes('self.__next_f.push')) {
          console.log("Found __next_f push script. Length: " + tag.length);
          fs.appendFileSync('next_data_chunks.txt', tag + "\n\n");
        }
      }
    }
  } catch (err) {
    console.error("Fetch failed", err);
  }
}

run();
