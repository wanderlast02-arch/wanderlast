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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestWithRetry(config, retries = 4) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await api.request(config);
    } catch (err) {
      const status = err.response?.status;
      const isRateLimit = status === 429 || `${err.response?.data?.error || ""}`.toLowerCase().includes("rate limit");

      if (!isRateLimit || attempt === retries) {
        throw err;
      }

      const retryAfterHeader = Number(err.response?.headers?.["retry-after"]);
      const waitMs = Number.isFinite(retryAfterHeader) && retryAfterHeader > 0
        ? retryAfterHeader * 1000
        : 1200 * (attempt + 1);

      console.warn(`Rate limit hit. Retrying in ${waitMs}ms...`);
      await sleep(waitMs);
    }
  }
}

let groupCache = null;
let componentCache = null;

async function loadGroups() {
  if (groupCache) {
    return groupCache;
  }

  const groups = await requestWithRetry({ method: "get", url: "/component_groups" });
  groupCache = groups.data.component_groups || [];
  return groupCache;
}

async function loadComponents() {
  if (componentCache) {
    return componentCache;
  }

  const components = await requestWithRetry({ method: "get", url: "/components" });
  componentCache = components.data.components || [];
  return componentCache;
}

// -------------------------------
// 1. Create component group if missing
// -------------------------------

async function ensureGroup(name) {
  try {
    const groups = await loadGroups();

    const exists = groups.find((g) => g.name === name);
    if (exists) return exists.id;

    console.log(`→ Creating component group: ${name}`);

    const res = await requestWithRetry({
      method: "post",
      url: "/component_groups",
      data: {
      component_group: { name },
      },
    });

    groupCache = [...groups, res.data.component_group];

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
    const existing = await loadComponents();
    const found = existing.find((c) => c.name === schema.name);

    // UPDATE if exists
    if (found) {
      console.log(`✔ Updating existing component: ${schema.name}`);

      await requestWithRetry({
        method: "put",
        url: `/components/${found.id}`,
        data: {
          component: componentPayload,
        },
      });
    } else {
      // CREATE if missing
      console.log(`➕ Creating new component: ${schema.name}`);

      const response = await requestWithRetry({
        method: "post",
        url: "/components",
        data: {
          component: componentPayload,
        },
      });

      componentCache = [...existing, response.data.component];
    }

    console.log(`✅ Done: ${schema.name}`);
    await sleep(250);
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
