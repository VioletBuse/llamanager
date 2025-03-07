#!/usr/bin/env node
import {Command} from "commander"
import serve_command from "./commands/serve.js"

const program = new Command()

program
    .name('llamanager')
    .description('CLI to run llama llms while preserving resource constraints')
    .version('0.1.0')

program.addCommand(serve_command)

program.parse();