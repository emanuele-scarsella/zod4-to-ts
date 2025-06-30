import type { ZodObject, ZodType } from 'zod/v4';
import { zodToTs } from './main';
import type { ZodOptimisticType } from './types';
import { isZodType, zodObjectToTs } from './utils';

export const translators = {
    object: (value: ZodOptimisticType) => zodObjectToTs(value as unknown as ZodObject),
    // PRIMITIVES
    string: (_value: ZodOptimisticType) => 'string',
    number: (_value: ZodOptimisticType) => 'number',
    boolean: (_value: ZodOptimisticType) => 'boolean',
    bigint: (_value: ZodOptimisticType) => 'bigint',
    symbol: (_value: ZodOptimisticType) => 'symbol',
    null: (_value: ZodOptimisticType) => 'null',
    undefined: (_value: ZodOptimisticType) => 'undefined',
    void: (_value: ZodOptimisticType) => 'void',
    never: (_value: ZodOptimisticType) => 'never',
    any: (_value: ZodOptimisticType) => 'any',
    unknown: (_value: ZodOptimisticType) => 'unknown',
    // ALIASES
    /* v8 ignore next */ // It is defined as a possible Zod type, but it doesn't seem to be ever used ¯\_(ツ)_/¯
    int: (_value: ZodOptimisticType) => 'number',
    date: (_value: ZodOptimisticType) => 'Date',
    file: (_value: ZodOptimisticType) => 'File',
    nan: (_value: ZodOptimisticType) => 'number', // No pun intended... ¯\_(ツ)_/¯
    // TYPE WRAPPERS
    readonly: (value: ZodOptimisticType) => zodToTs(value.def.innerType),
    nonoptional: (value: ZodOptimisticType) => zodToTs(value.def.innerType),
    success: (value: ZodOptimisticType) => zodToTs(value.def.innerType),
    lazy: (value: ZodOptimisticType) => zodToTs(value.unwrap()),
    // GENERICS
    array: (value: ZodOptimisticType) => `Array<${zodToTs(value.def.element)}>`,
    promise: (value: ZodOptimisticType) => `Promise<${zodToTs(value.def.innerType)}>`,
    record: (value: ZodOptimisticType) => `Record<${zodToTs(value.def.keyType)}, ${zodToTs(value.def.valueType)}>`,
    map: (value: ZodOptimisticType) => `Map<${zodToTs(value.def.keyType)}, ${zodToTs(value.def.valueType)}>`,
    set: (value: ZodOptimisticType) => `Set<${zodToTs(value.def.valueType)}>`,
    // NOT STRICT
    nullable: (value: ZodOptimisticType) => `${zodToTs(value.def.innerType)} | null`,
    optional: (value: ZodOptimisticType) => `${zodToTs(value.def.innerType)} | undefined`,
    default: (value: ZodOptimisticType) => `${zodToTs(value.def.innerType)} | undefined`,
    prefault: (value: ZodOptimisticType) => `${zodToTs(value.def.innerType)} | undefined`,
    catch: (value: ZodOptimisticType) => `${zodToTs(value.def.innerType)} | undefined`,
    // SPECIAL
    template_literal: (value: ZodOptimisticType) => value.def.parts.map(translateTemplatePart).join(''),
    tuple: (value: ZodOptimisticType) => `[${value.def.items.map(zodToTs).join(', ')}${value.def.rest ? `, ...${zodToTs(value.def.rest)}[]` : ''}]`,
    union: (value: ZodOptimisticType) => `${value.def.options.map(zodToTs).join(' | ')}`,
    enum: (value: ZodOptimisticType) => `${Object.values(value.def.entries).map(sanitizeLiteral).join(' | ')}`,
    literal: (value: ZodOptimisticType) => `${value.def.values.map(sanitizeLiteral).join(' | ')}`,
    intersection: (value: ZodOptimisticType) => `${zodToTs(value.def.left)} & ${zodToTs(value.def.right)}`
    /**
     * ⚠ UNSUPPORTED TYPES
     * - 'transform'
     * - 'pipe'
     * - 'custom'
     */
};

function sanitizeLiteral(literal: string) {
    return `'${literal.replace(/`/g, '\\`')}'`;
}

function translateTemplatePart(part: string | number | bigint | boolean | ZodType | null | undefined) {
    if (typeof part === 'string') return part.replace(/`/g, '\\`');
    if (!isZodType(part)) return `${part === undefined ? '' : part}`;
    const definition = zodToTs(part);
    return definition === 'undefined' ? '' : `\${${definition}}`;
}
