const fs = require('fs');
const path = require('path');

function getPlanFilePath() {
  const arg = process.argv.find(a => a.startsWith('--plan=') || a.startsWith('-p='));
  if (arg) {
    return path.resolve(process.cwd(), arg.split('=')[1]);
  }
  if (process.env.PLAN_FILE) {
    return path.resolve(process.cwd(), process.env.PLAN_FILE);
  }
  return path.resolve(process.cwd(), 'aiPlan.json');
}

function toPascalCase(str) {
  const words = str.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/);
  const pascal = words.map(word => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join('');
  if (/^[0-9]/.test(pascal)) {
    return `File${  pascal}`;
  }
  return pascal || 'Component';
}

const planPath = getPlanFilePath();

if (!fs.existsSync(planPath)) {
  console.error(`Plan file not found: ${planPath}`);
  process.exit(1);
}

let plan;
try {
  plan = JSON.parse(fs.readFileSync(planPath, 'utf-8'));
} catch (err) {
  console.error('Error reading plan file:', err.message);
  process.exit(1);
}

if (!Array.isArray(plan.files)) {
  console.error('Invalid plan format: "files" array is required');
  process.exit(1);
}

plan.files.forEach(rel => {
  const target = path.resolve(process.cwd(), rel);
  if (fs.existsSync(target)) {
    console.log(`Exists: ${rel}`);
    return;
  }
  const ext = path.extname(target);
  if (ext !== '.js' && ext !== '.jsx') {
    console.warn(`Skipping unsupported extension "${ext}" for file: ${rel}`);
    return;
  }
  const dir = path.dirname(target);
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory "${dir}": ${err.message}`);
    return;
  }
  const name = path.basename(target, ext);
  const identifier = toPascalCase(name);
  const content = `import React from 'react';

const ${identifier} = () => (
  <div>${identifier} placeholder</div>
);

export default ${identifier};
`;
  try {
    fs.writeFileSync(target, content, 'utf-8');
    console.log(`Created: ${rel}`);
  } catch (err) {
    console.error(`Error writing file "${rel}": ${err.message}`);
  }
});