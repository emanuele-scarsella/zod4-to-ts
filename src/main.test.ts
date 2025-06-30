import { describe, expect, test } from 'vitest';
import { zodToTs } from './main';
import z from 'zod/v4';

const FULL_OBJECT = z.object({
    string: z.string(),
    number: z.number(),
    boolean: z.boolean(),
    bigint: z.bigint(),
    symbol: z.symbol(),
    null: z.null(),
    undefined: z.undefined(),
    void: z.void(),
    never: z.never(),
    any: z.any(),
    unknown: z.unknown(),
    int: z.int(),
    templateLiteral: z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()]),
    date: z.date(),
    file: z.file(),
    nan: z.nan(),
    object: z.object({
        string: z.string(),
        number: z.number(),
        boolean: z.boolean(),
        bigint: z.bigint(),
        symbol: z.symbol(),
        null: z.null(),
        undefined: z.undefined(),
        void: z.void(),
        never: z.never(),
        any: z.any(),
        unknown: z.unknown(),
        int: z.int(),
        templateLiteral: z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()]),
        date: z.date(),
        file: z.file(),
        nan: z.nan(),
        object: z.object({
            object: z.object({
                object: z.object({
                    object: z.object({}),
                    notEmpty: z.object({
                        string: z.string()
                    })
                })
            })
        })
    }),
    array: z.object({
        string: z.array(z.string()),
        number: z.array(z.number()),
        boolean: z.array(z.boolean()),
        bigint: z.array(z.bigint()),
        symbol: z.array(z.symbol()),
        null: z.array(z.null()),
        undefined: z.array(z.undefined()),
        void: z.array(z.void()),
        never: z.array(z.never()),
        any: z.array(z.any()),
        unknown: z.array(z.unknown()),
        int: z.array(z.int()),
        templateLiteral: z.array(z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()])),
        date: z.array(z.date()),
        file: z.array(z.file()),
        nan: z.array(z.nan())
    }),
    nullable: z.object({
        string: z.nullable(z.string()),
        number: z.nullable(z.number()),
        boolean: z.nullable(z.boolean()),
        bigint: z.nullable(z.bigint()),
        symbol: z.nullable(z.symbol()),
        null: z.nullable(z.null()),
        undefined: z.nullable(z.undefined()),
        void: z.nullable(z.void()),
        never: z.nullable(z.never()),
        any: z.nullable(z.any()),
        unknown: z.nullable(z.unknown()),
        int: z.nullable(z.int()),
        templateLiteral: z.nullable(z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()])),
        date: z.nullable(z.date()),
        file: z.nullable(z.file()),
        nan: z.nullable(z.nan())
    }),
    optional: z.object({
        string: z.optional(z.string()),
        number: z.optional(z.number()),
        boolean: z.optional(z.boolean()),
        bigint: z.optional(z.bigint()),
        symbol: z.optional(z.symbol()),
        null: z.optional(z.null()),
        undefined: z.optional(z.undefined()),
        void: z.optional(z.void()),
        never: z.optional(z.never()),
        any: z.optional(z.any()),
        unknown: z.optional(z.unknown()),
        int: z.optional(z.int()),
        templateLiteral: z.optional(z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()])),
        date: z.optional(z.date()),
        file: z.optional(z.file()),
        nan: z.optional(z.nan())
    }),
    catch: z.object({
        string: z.string().catch(''),
        number: z.number().catch(0),
        boolean: z.boolean().catch(true),
        bigint: z.bigint().catch(BigInt(0)),
        symbol: z.symbol().catch(Symbol()),
        null: z.null().catch(null),
        undefined: z.undefined().catch(undefined),
        void: z.void().catch(undefined),
        never: z.never().catch(() => {
            throw new Error('never');
        }),
        any: z.any().catch(0),
        unknown: z.unknown().catch(0),
        int: z.int().catch(0),
        templateLiteral: z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()]).catch(`${'a'}${1}literal${null}`),
        date: z.date().catch(new Date()),
        file: z.file().catch(new File([], '')),
        nan: z.nan().catch(NaN)
    }),
    prefault: z.object({
        string: z.string().prefault(''),
        number: z.number().prefault(0),
        boolean: z.boolean().prefault(true),
        bigint: z.bigint().prefault(BigInt(0)),
        symbol: z.symbol().prefault(Symbol()),
        null: z.null().prefault(null),
        undefined: z.undefined().prefault(undefined),
        void: z.void().prefault(undefined),
        never: z.never().prefault(() => {
            throw new Error('never');
        }),
        any: z.any().prefault(0),
        unknown: z.unknown().prefault(0),
        int: z.int().prefault(0),
        templateLiteral: z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()]).prefault(`${'a'}${1}literal${null}`),
        date: z.date().prefault(new Date()),
        file: z.file().prefault(new File([], '')),
        nan: z.nan().prefault(NaN)
    }),
    readonly: z.object({
        string: z.readonly(z.string()),
        number: z.readonly(z.number()),
        boolean: z.readonly(z.boolean()),
        bigint: z.readonly(z.bigint()),
        symbol: z.readonly(z.symbol()),
        null: z.readonly(z.null()),
        undefined: z.readonly(z.undefined()),
        void: z.readonly(z.void()),
        never: z.readonly(z.never()),
        any: z.readonly(z.any()),
        unknown: z.readonly(z.unknown()),
        int: z.readonly(z.int()),
        templateLiteral: z.readonly(z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()])),
        date: z.readonly(z.date()),
        file: z.readonly(z.file()),
        nan: z.readonly(z.nan())
    }),
    nonoptional: z.object({
        string: z.nonoptional(z.string()),
        number: z.nonoptional(z.number()),
        boolean: z.nonoptional(z.boolean()),
        bigint: z.nonoptional(z.bigint()),
        symbol: z.nonoptional(z.symbol()),
        null: z.nonoptional(z.null()),
        undefined: z.nonoptional(z.undefined()),
        void: z.nonoptional(z.void()),
        never: z.nonoptional(z.never()),
        any: z.nonoptional(z.any()),
        unknown: z.nonoptional(z.unknown()),
        int: z.nonoptional(z.int()),
        templateLiteral: z.nonoptional(z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()])),
        date: z.nonoptional(z.date()),
        file: z.nonoptional(z.file()),
        nan: z.nonoptional(z.nan())
    }),
    success: z.object({
        string: z.success(z.string()),
        number: z.success(z.number()),
        boolean: z.success(z.boolean()),
        bigint: z.success(z.bigint()),
        symbol: z.success(z.symbol()),
        null: z.success(z.null()),
        undefined: z.success(z.undefined()),
        void: z.success(z.void()),
        never: z.success(z.never()),
        any: z.success(z.any()),
        unknown: z.success(z.unknown()),
        int: z.success(z.int()),
        templateLiteral: z.success(z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()])),
        date: z.success(z.date()),
        file: z.success(z.file()),
        nan: z.success(z.nan())
    }),
    lazy: z.object({
        string: z.lazy(() => z.string()),
        number: z.lazy(() => z.number()),
        boolean: z.lazy(() => z.boolean()),
        bigint: z.lazy(() => z.bigint()),
        symbol: z.lazy(() => z.symbol()),
        null: z.lazy(() => z.null()),
        undefined: z.lazy(() => z.undefined()),
        void: z.lazy(() => z.void()),
        never: z.lazy(() => z.never()),
        any: z.lazy(() => z.any()),
        unknown: z.lazy(() => z.unknown()),
        int: z.lazy(() => z.int()),
        templateLiteral: z.lazy(() => z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()])),
        date: z.lazy(() => z.date()),
        file: z.lazy(() => z.file()),
        nan: z.lazy(() => z.nan())
    }),
    tuple: z.tuple([z.string(), z.number()], z.any()),
    union: z.union([z.string(), z.number()]),
    enum: z.enum(['a', 'b', 'c']),
    literal: z.literal('hello world!'),
    intersection: z.intersection(z.string(), z.number()),
    discriminatedUnion: z.discriminatedUnion('type', [
        z.object({
            type: z.literal('A'),
            a: z.string()
        }),
        z.object({
            type: z.literal('B'),
            b: z.number()
        })
    ]),
    record: z.record(z.string(), z.number()),
    map: z.map(z.string(), z.number()),
    set: z.set(z.number())
    // transform
    // pipe
    // custom
});

describe('Main test', () => {
    test('Full scale test', async () => {
        expect(zodToTs(FULL_OBJECT)).matchSnapshot();
    });
});
