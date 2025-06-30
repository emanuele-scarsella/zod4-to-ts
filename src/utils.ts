import { ZodType, type ZodObject } from 'zod/v4';
import { zodToTs } from './main';
import type { ObjectDefinition, ZodOptimisticType } from './types';
import { translators } from './translators';

function TsDefinitionToString(definition: ObjectDefinition | string): string {
    if (typeof definition === 'string') return definition;
    const result = Object.entries(definition).map(([key, value]) => TsEntryToString(key, value));
    return `{\n${result.join('\n')}\n}`;
}

function TsEntryToString(key: string, value: ObjectDefinition | string) {
    const parsedKey = parseKey(key);
    const entryType = TsDefinitionToString(value);
    const formattedEntryType = entryType
        .split('\n')
        .map((line, index) => (index === 0 ? line : `    ${line}`))
        .join('\n');
    return `    ${parsedKey}: ${formattedEntryType};`;
}

function parseKey(key: string) {
    const needQuotes = !/^[\p{L}_$][\p{L}\p{N}_$]*$/u.test(key);
    return needQuotes ? `'${key.replace(/'/g, "\\'")}'` : key;
}

export function zodObjectToTs(object: ZodObject) {
    const accumulator: ObjectDefinition = {};
    const { shape, catchall } = object.def;
    Object.entries(shape).map(([key, value]) => (accumulator[key] = zodToTs(value)));
    if (catchall) return `${TsDefinitionToString(accumulator)} & { [key: string]: ${zodToTs(catchall as ZodType)} }`;
    else return TsDefinitionToString(accumulator);
}

export function isSupported(schema: ZodType): schema is ZodOptimisticType {
    return Object.keys(translators).includes(schema.def.type);
}

export function isZodType(value: unknown): value is ZodType {
    return value instanceof ZodType;
}
