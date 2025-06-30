

# zod4-to-ts

Convert [Zod v4](https://github.com/colinhacks/zod) schemas into TypeScript type definitions in a **minimalistic** and **easy-to-use** approach.

<div align="center">
  <img src="./images/zod.png" alt="Zod Logo" height="80" />
  <img src="./images/typescript.svg" alt="TypeScript Logo" height="70" style="margin-bottom: 5px;" />
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/zod4-to-ts">
    <img src="https://img.shields.io/npm/v/zod4-to-ts?color=blue" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg" alt="100% test coverage" />
  <img src="https://img.shields.io/badge/types-TypeScript-blue.svg" alt="TypeScript" />
</p>

---

## 🚨 Beta warning

This package is still in **beta**. It is not recommended to use it in production until it reaches a stable version. The API is not yet stable and may change between versions.

## 🔍 Similar works

- [zod-to-typescript](https://github.com/duplojs/zod-to-typescript) **RECOMMENDED**
	- Many **more functionalities**
	- Uses **TypeScript API** inside (more reliable)
	- **100%** test coverage
	- **Actively maintained**
	- Doesn't support **Zod v4** yet, but they're working on it. see [Issue #32](https://github.com/duplojs/zod-to-typescript/issues/32) for more info.
- [zod-to-ts](https://github.com/sachinraja/zod-to-ts)
	- Doesn't seem to be actively maintained
- 

## ✨ Features

- ✅ Supports **Zod v4** syntax
- 🔁 Converts Zod schemas to **valid TypeScript Definition**
- 🚀 **Minimalistic approach**
- 🧪 **100% test coverage**
- 📦 Lightweight & **zero dependencies**

---

## 📦 Installation

```bash
npm install zod4-to-ts
# or
yarn add zod4-to-ts
```

---

## 🔧 Usage

```ts
import { z } from 'zod';
import { zodToTs } from 'zod4-to-ts';

const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	isAdmin: z.boolean().optional(),
});

const tsDefinition = zodToTs(userSchema);

console.log(`type Schema = ${tsDefinition}`);
```

**Output:**

```ts
type Schema = {
	id: number;
	name: string;
	isAdmin?: boolean;
};
```

---

## Conversion Table

| **Zod Type** | **TypeScript Type** |
| --- | --- |
| `z.string()` | `string` |
| `z.number()` | `number` |
| `z.boolean()` | `boolean` |
| `z.bigint()` | `bigint` |
| `z.symbol()` | `symbol` |
| `z.null()` | `null` |
| `z.undefined()` | `undefined` |
| `z.void()` | `void` |
| `z.never()` | `never` |
| `z.any()` | `any` |
| `z.unknown()` | `unknown` |
| `z.int()` | `number` |
| `z.template_literal()` | `string` |
| `z.date()` | `Date` |
| `z.file()` | `File` |
| `z.nan()` | `number` |
| `z.object()` | `{ ... } & { [key: string]: $CATCHALL_TYPE }` |
| `z.array()` | `Array<T>` |
| `z.nullable()` | `$TYPE \| null` |
| `z.optional()` | `$TYPE \| undefined` |
| `z.default()` | `$TYPE \| undefined` |
| `z.prefault()` | `$TYPE \| undefined` |
| `z.catch()` | `$TYPE \| undefined` |
| `z.promise()` | `Promise<$TYPE>` |
| `z.readonly()` | `$TYPE` |
| `z.nonoptional()` | `$TYPE` |
| `z.success()` | `$TYPE` |
| `z.lazy()` | `$TYPE` |
| `z.tuple()` | `[$TYPE[0], $TYPE[1] ... , ...$REST_TYPE[]]` |
| `z.union()` | `$TYPE[0] \| $TYPE[1] ...` |
| `z.enum()` | `"A" \| "B" \| "C" ...` |
| `z.literal()` | `"hello"` or `"A" \| "B" \| "C" ...` |
| `z.intersection()` | `$LEFT_TYPE & $RIGHT_TYPE` |
| `z.record()` | `Record<$KEY_TYPE, $VALUE_TYPE>` |
| `z.map()` | `Map<$KEY_TYPE, $VALUE_TYPE>` |
| `z.set()` | `Set<$VALUE_TYPE>` |
| `z.transform()` | **UNSUPPORTED** |
| `z.pipe()` | **UNSUPPORTED** |
| `z.custom()` | **UNSUPPORTED** |

---

## 🧠 Interface

### `zodToTs(schema: ZodType): string`

Takes a [Zod](https://github.com/colinhacks/zod) schema and returns a string representing the equivalent TypeScript type/interface definition.

---

## 🧪 Tests

This package is fully tested with 100% code coverage. Run tests using:

```bash
npm test
```

---

## 📄 License

MIT © 2025 [Emanuele Scarsella](https://github.com/emanuele-scarsella)

---

Made with ❤️ and [Zod](https://github.com/colinhacks/zod).

---