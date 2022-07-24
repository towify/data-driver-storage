# document-generator

```typescript
equalTo(fieldPath: QueryFieldPathType, value: FieldValueType): this;

notEqualTo(fieldPath: QueryFieldPathType, value: FieldValueType): this;

lessThan(fieldPath: QueryFieldPathType, value: number): this;

lessThanOrEqualTo(fieldPath: QueryFieldPathType, value: number): this;

greaterThan(fieldPath: QueryFieldPathType, value: number): this;

greaterThanOrEqualTo(fieldPath: QueryFieldPathType, value: number): this;

/** 可以用 contains 来查找某一属性值包含特定字符串的对象 */
contains(fieldPath: QueryFieldPathType, value: string): this;

/** 可以用 doesNotContain 来查找某一属性值包含特定字符串的对象 */
doesNotContain(fieldPath: QueryFieldPathType, value: string): this;

/** 可以用 containsAll 来查找某一属性值包含特定字符串的对象 */
containsAll(fieldPath: QueryFieldPathType, value: FieldValueType[]): this;

/** 可以用 contains 来查找某一属性值包含特定字符串的对象 */
include(fieldPath: QueryFieldPathType, value: string): this;

/** 可以用 startsWith 来查找某一属性值以特定字符串开头的对象。和 SQL 中的 LIKE
* 一样，你可以利用索引带来的优势 */
  startWith(fieldPath: QueryFieldPathType, value: string): this;

endWith(fieldPath: QueryFieldPathType, value: string): this;

some(fieldPath: QueryFieldPathType, value: string): this;

/**
*  可以通过指定 limit 限制返回结果的数量（默认为 100）
*  由于性能原因，limit 最大只能设为 1000。即使将其设为大于 1000 的数，云端也只会返回 1,000 条结果。
*  */
   limit(count: number): this;

/**
* 可以通过设置 skip 来跳过一定数量的结果
* 把 skip 和 limit 结合起来，就能实现翻页功能
* */
  skip(count: number): this;

/** 如果只需要一条结果，可以直接用 first */
first(): Promise<{
message?: string;
data?: LiveObjectType;
}>;

/** 对于能够排序的属性，可以指定结果的排序规则 */
ascending(fieldHashName: string): this;

descending(fieldHashName: string): this;

exists(fieldPath: QueryFieldPathType): this;

doesNotExist(fieldHashName: QueryFieldPathType): this;

count(): Promise<{ message?: string; count?: number }>;

find(): Promise<{
message?: string;
data?: {
list: LiveObjectType[];
count?: number;
};
}>;

destroy(): Promise<string | undefined>;
`
```
