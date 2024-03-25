import { clone } from "./clone.ts";

/**
 * @module create-monodeno creates a monodeno project
 * 
 */
console.log("Creating a monodeno project, Let's go Deno 🦖!");
const name = prompt("project name: ", 'monodeno');
const path = prompt("path", '.');
const shouldProceed = confirm(`${name} will be created in ${path} Do you want to proceed?`);

if (!shouldProceed) {
  console.log("Aborted.");
  Deno.exit(0);
}

clone( 'https://github.com/jurassicjs/denomono.git', `${path}/${name}`);
