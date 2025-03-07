import { Command } from "commander";

const serve_command = new Command();

serve_command.name('serve').description('Serve a standard http api.')

export default serve_command;
