const { Client } = require('@notionhq/client');

// Initializing a client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Creating a progress bar block
async function createProgressBarBlock(pageId, totalWords, completedWords) {
  try {
    const progressPercentage = Math.min((completedWords / totalWords) * 100, 100);

    // Define the color of the progress bar based on the percentage completed
    let progressBarColor = 'red';
    if (progressPercentage >= 50) {
      progressBarColor = 'yellow';
    }
    if (progressPercentage >= 75) {
      progressBarColor = 'green';
    }

    const block = {
      progress: {
        value: progressPercentage,
        color: progressBarColor,
      },
    };

    const { id } = await notion.blocks.children.append({
      block_id: pageId,
      children: [block],
    });

    console.log(`Created new progress bar block with id: ${id}`);
  } catch (error) {
    console.error(`Error creating progress bar block: ${error}`);
  }
}

// Usage example
const pageId = 'Experiment-a97ac81782774c1ba6407c0ad680cb0b';
const totalWords = 1000; // User-defined word limit
const completedWords = 500; // User-defined completed words

createProgressBarBlock(pageId, totalWords, completedWords);
