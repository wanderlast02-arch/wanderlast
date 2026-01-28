const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Use environment variables for security. Set these before running:
//   $env:STORYBLOK_SPACE_ID="<space_id>"
//   $env:STORYBLOK_PERSONAL_ACCESS_TOKEN="<management_token>"
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const TOKEN = process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN;

if (!SPACE_ID || !TOKEN) {
  console.error("Missing STORYBLOK_SPACE_ID or STORYBLOK_PERSONAL_ACCESS_TOKEN env vars.");
  process.exit(1);
}

const api = axios.create({
  baseURL: `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`,
  headers: {
    Authorization: TOKEN,
    "Content-Type": "application/json",
  },
});

// -------------------------------
// 1. Create component group if missing
// -------------------------------

async function ensureGroup(name) {
  try {
    const groups = await api.get(`/component_groups`);

    const exists = groups.data.component_groups.find((g) => g.name === name);
    if (exists) return exists.id;

    console.log(`→ Creating component group: ${name}`);

    const res = await api.post(`/component_groups`, {
      component_group: { name },
    });

    return res.data.component_group.id;
  } catch (err) {
    console.error("Group creation error:", err.response?.data || err.message);
  }
}

// -------------------------------
// 2. Create or update component
// -------------------------------

async function pushComponent(schema, filename) {
  try {
    console.log(`\n🚀 Processing: ${schema.name}`);

    // If group name exists, ensure it exists in space
    let group_id = null;
    if (schema.component_group_name) {
      group_id = await ensureGroup(schema.component_group_name);
    }

    // Attach group_id if available
    const componentPayload = {
      ...schema,
      component_group_uuid: group_id || null,
    };

    // GET existing components
    const existing = await api.get(`/components`);
    const found = existing.data.components.find((c) => c.name === schema.name);

    // UPDATE if exists
    if (found) {
      console.log(`✔ Updating existing component: ${schema.name}`);

      await api.put(`/components/${found.id}`, {
        component: componentPayload,
      });
    } else {
      // CREATE if missing
      console.log(`➕ Creating new component: ${schema.name}`);

      await api.post(`/components`, {
        component: componentPayload,
      });
    }

    console.log(`✅ Done: ${schema.name}`);
  } catch (err) {
    console.error(`❌ Error for component ${schema.name}:`);
    console.error(err.response?.data || err.message);
  }
}

// -------------------------------
// 3. Load all schemas from folder
// -------------------------------

async function run() {
  const dir = path.resolve(__dirname, "..", "storyblok", "schemas");

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  console.log(`📦 Found ${files.length} schema files...`);

  for (const file of files) {
    try {
      const schema = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));

      if (!schema.name) {
        console.error(`⚠ Skipping ${file} (missing "name" property)`);
        continue;
      }

      await pushComponent(schema, file);
    } catch (err) {
      console.error(`❌ Failed to load file ${file}:`, err);
    }
  }

  console.log("\n🎉 All schemas processed.");
}

run();
