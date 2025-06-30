import { ZodType } from 'zod/v4';
import type { ZodOptimisticType } from './types';
import { translators } from './translators';
import { isSupported } from './utils';

export function zodToTs(schema: ZodType): string {
    if (!isSupported(schema)) throw new Error(`Unsupported zod type: ${schema.def.type}`);
    return translators[schema.def.type](schema as ZodOptimisticType);
}
