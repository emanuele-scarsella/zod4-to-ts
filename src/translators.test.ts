import { describe, expect, test } from 'vitest';
import { zodToTs } from './main';
import z from 'zod/v4';

const BASE_TYPES = [
    z.string(),
    z.number(),
    z.boolean(),
    z.bigint(),
    z.symbol(),
    z.null(),
    z.undefined(),
    z.void(),
    z.never(),
    z.any(),
    z.unknown(),
    z.int(),
    z.templateLiteral([z.string(), 0, 'literal', null, undefined]),
    z.date(),
    z.file(),
    z.nan()
];

const BASE_VALUES = [
    '',
    0,
    true,
    BigInt(0),
    Symbol(),
    null,
    undefined,
    undefined,
    () => {
        throw new Error('');
    },
    0,
    0,
    0,
    `${'a'}${1}literal${null}`,
    new Date(),
    new File([], ''),
    NaN
];

describe('Translators', () => {
    // string
    test('string', async () => {
        expect(zodToTs(z.string())).matchSnapshot();
    });
    // number
    test('number', async () => {
        expect(zodToTs(z.number())).matchSnapshot();
    });
    // boolean
    test('boolean', async () => {
        expect(zodToTs(z.boolean())).matchSnapshot();
    });
    // bigint
    test('bigint', async () => {
        expect(zodToTs(z.bigint())).matchSnapshot();
    });
    // symbol
    test('symbol', async () => {
        expect(zodToTs(z.symbol())).matchSnapshot();
    });
    // null
    test('null', async () => {
        expect(zodToTs(z.null())).matchSnapshot();
    });
    // undefined
    test('undefined', async () => {
        expect(zodToTs(z.undefined())).matchSnapshot();
    });
    // void
    test('void', async () => {
        expect(zodToTs(z.void())).matchSnapshot();
    });
    // never
    test('never', async () => {
        expect(zodToTs(z.never())).matchSnapshot();
    });
    // any
    test('any', async () => {
        expect(zodToTs(z.any())).matchSnapshot();
    });
    // unknown
    test('unknown', async () => {
        expect(zodToTs(z.unknown())).matchSnapshot();
    });
    // int
    test('int', async () => {
        expect(zodToTs(z.int())).matchSnapshot();
    });
    // template_literal
    test('template_literal', async () => {
        expect(zodToTs(z.templateLiteral([z.string(), z.number(), 'literal', z.null(), z.undefined()]))).matchSnapshot();
    });
    // date
    test('date', async () => {
        expect(zodToTs(z.date())).matchSnapshot();
    });
    // file
    test('file', async () => {
        expect(zodToTs(z.file())).matchSnapshot();
    });
    // nan
    test('nan', async () => {
        expect(zodToTs(z.nan())).matchSnapshot();
    });
    // array
    test('array', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.array(type))).matchSnapshot();
        }
    });
    // nullable
    test('nullable', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(type.nullable())).matchSnapshot();
        }
    });
    // optional
    test('optional', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(type.optional())).matchSnapshot();
        }
    });
    // default
    test('default', async () => {
        for (let i = 0; i < BASE_TYPES.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(zodToTs(BASE_TYPES[i].default(BASE_VALUES[i]))).matchSnapshot();
        }
    });
    // prefault
    test('prefault', async () => {
        for (let i = 0; i < BASE_TYPES.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(zodToTs(BASE_TYPES[i].prefault(BASE_VALUES[i]))).matchSnapshot();
        }
    });
    // catch
    test('catch', async () => {
        for (let i = 0; i < BASE_TYPES.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(zodToTs(BASE_TYPES[i].catch(BASE_VALUES[i]))).matchSnapshot();
        }
    });
    // promise
    test('promise', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.promise(type))).matchSnapshot();
        }
    });
    // readonly
    test('readonly', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.readonly(type))).matchSnapshot();
        }
    });
    // nonoptional
    test('nonoptional', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.nonoptional(type))).matchSnapshot();
        }
    });
    // success
    test('success', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.success(type))).matchSnapshot();
        }
    });
    // lazy
    test('lazy', async () => {
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.lazy(() => type))).matchSnapshot();
        }
    });
    // tuple
    test('tuple', async () => {
        // NOTE:
        // This tests 529 different permutations of base types... it's a bit overkill maybe?
        for (const type of BASE_TYPES) {
            for (const type2 of BASE_TYPES) {
                expect(zodToTs(z.tuple([type, type2], type))).matchSnapshot();
                expect(zodToTs(z.tuple([type2], type))).matchSnapshot();
            }
            expect(zodToTs(z.tuple([type]))).matchSnapshot();
        }
        expect(zodToTs(z.tuple([]))).matchSnapshot();
    });
    // union
    test('union', async () => {
        // NOTE:
        // This tests 273 different permutations of base types... it's a bit overkill maybe?
        for (const type of BASE_TYPES) {
            for (const type2 of BASE_TYPES) {
                expect(zodToTs(z.union([type, type2]))).matchSnapshot();
            }
            expect(zodToTs(z.union([type]))).matchSnapshot();
        }
        expect(zodToTs(z.union([]))).matchSnapshot();
    });
    // enum
    test('enum', async () => {
        expect(zodToTs(z.enum(['a', 'b', 'c']))).matchSnapshot();
        expect(zodToTs(z.enum(['a']))).matchSnapshot();
        expect(zodToTs(z.enum([]))).matchSnapshot();
    });
    // literal
    test('literal', async () => {
        const randomString = Math.random().toString(36).substring(2, 15);
        expect(zodToTs(z.literal(randomString))).toBe(`'${randomString.replace(/'/g, "\\'")}'`);
    });
    // intersection
    test('intersection', async () => {
        // NOTE:
        // This tests 1024 different permutations of base types and objects... it's a bit overkill maybe?
        for (const type of BASE_TYPES) {
            for (const type2 of BASE_TYPES) {
                expect(zodToTs(z.intersection(type, type2))).matchSnapshot();
                expect(zodToTs(z.intersection(z.object({ a: type }), type2))).matchSnapshot();
                expect(zodToTs(z.intersection(type, z.object({ b: type2 })))).matchSnapshot();
                expect(zodToTs(z.intersection(z.object({ a: type }), z.object({ b: type2 })))).matchSnapshot();
            }
        }
    });
    // record
    test('record', async () => {
        // NOTE:
        // This tests 48 different permutations of base types... it's a bit overkill maybe?
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.record(z.string(), type))).matchSnapshot();
            expect(zodToTs(z.record(z.number(), type))).matchSnapshot();
            expect(zodToTs(z.record(z.int(), type))).matchSnapshot();
        }
    });
    // map
    test('map', async () => {
        // NOTE:
        // This tests 48 different permutations of base types... it's a bit overkill maybe?
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.map(z.string(), type))).matchSnapshot();
            expect(zodToTs(z.map(z.number(), type))).matchSnapshot();
            expect(zodToTs(z.map(z.int(), type))).matchSnapshot();
        }
    });
    // set
    test('set', async () => {
        // NOTE:
        // This tests 16 different permutations of base types
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.set(type))).matchSnapshot();
        }
    });
    // transform
    test('transform', async () => {
        expect(() => zodToTs(z.string().transform(() => ''))).toThrow();
    });
    // pipe
    test('pipe', async () => {
        expect(() => zodToTs(z.string().pipe(z.string()))).toThrow();
    });
    // custom
    test('custom', async () => {
        expect(() => zodToTs(z.custom(() => ''))).toThrow();
    });
    // object
    test('object', async () => {
        // NOTE:
        // This tests  different permutations of base types... it's a bit overkill maybe?
        for (const type of BASE_TYPES) {
            expect(zodToTs(z.object({ test1: type }))).matchSnapshot();
            expect(zodToTs(z.object({ test1: type, test2: z.object({ 'test-quoted-key': type }) }).catchall(type))).matchSnapshot();
        }
    });
});
