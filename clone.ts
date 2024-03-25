import * as path from "https://deno.land/std@0.220.1/path/mod.ts"
import * as fs from "https://deno.land/std@0.220.1/fs/mod.ts";
const { exists } = fs;
const { join } = path;

const { run } = Deno;

export async function clone(source: string, dest: string) {
  const isCloned = await exists(join(dest, ".git"));

  if (isCloned) {
    console.log(`Repository '${dest}' already exist.`);
    console.log("Aborted.");
    Deno.exit(1);
  }

  console.log(`Clone '${source}' into '${dest}'...`);

  const clone = run({
    cmd: ["git", "clone", source, dest],
  });

  const cloneResult = await clone.status();

  if (!cloneResult.success) {
    throw new Error("Failed to clone.");
  } else {
    console.log("Cloned.");
    openEditor('code', dest)
  }
}

export async function openEditor(editor: string, dest: string) {
  if (!editor) {
    console.log("Environment variable 'EDITOR' is empty.");
    return;
  }

  console.log(`Open '${dest}' in '${editor}'...`);

  const open = run({
    cmd: [editor, dest],
  });
  const openResult = await open.status();

  if (!openResult.success) {
    throw new Error("Failed to open editor.");
  }
}
