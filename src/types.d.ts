import { translators } from './translators';
import type { ZodType } from 'zod/v4';

export type SupportedTypes = keyof typeof translators;

/**
 * Optimistic type: This type doesn't exist, it never accurse, but it's a combination of all possible zod types
 * and optimistically assumes that you have actually checked the type beforehand.
 */
export type ZodOptimisticType = ZodType & {
    def: {
        type: SupportedTypes;
        innerType: ZodType;
        element: ZodType;
        keyType: ZodType;
        valueType: ZodType;
        items: ZodType[];
        options: ZodType[];
        rest?: ZodType;
        entries: Record<string, string>;
        values: string[];
        left: ZodType;
        right: ZodType;
        parts: (ZodType | string | number | bigint | boolean | null | undefined)[];
    };
    unwrap: () => ZodType;
};

export interface ObjectDefinition {
    [key: string]: string | ObjectDefinition;
}
