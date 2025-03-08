import {z} from "zod"

export const query_schema = z.object({
    model: z.object({
        uri: z.string().describe('A uri either in the form hf:<user>/<model>:<quant> or hf:<user>/<model>/<file-path>#<branch>'),
        system_prompt: z.string().describe('This is text that guides the model on how to behave, and what kinds of responses to generate')
    }),
    chat_history: z.array(z.union([
        z.object({type: z.literal("system_message"), text: z.string()}),
        z.object({type: z.literal("user_message"), text: z.string()}),
        z.object({type: z.literal("model_response"), text: z.string()})
    ])).describe('the history (real or made up) of your chat with the model. Use this to give examples or context to the model'),
    query: z.string()
}).describe('The query object, which describes the model, parameters, and user input')
