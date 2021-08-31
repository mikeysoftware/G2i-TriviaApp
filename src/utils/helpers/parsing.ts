import { decode } from 'html-entities';

// Decode HTMl entitiy codes to symbols
function decodeEntity(content: string): string {
    return decode(content, { level: "all", scope: "body" });
}

export {
    decodeEntity
}