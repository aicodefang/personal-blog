---
title: TypeScript 高级类型技巧
excerpt: 掌握 TypeScript 的高级类型系统，编写更类型安全的代码。
date: 2024-01-01
readTime: 10 分钟
category: TypeScript
author: Blog Author
tags: [TypeScript, 类型系统]
---

TypeScript 的类型系统非常强大，掌握高级类型技巧可以让你写出更健壮的代码。

## 条件类型

条件类型允许你根据类型关系选择类型：

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false
```

## 映射类型

映射类型可以基于现有类型创建新类型：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

## 模板字面量类型

模板字面量类型提供了强大的字符串操作能力：

```ts
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'>  // "onClick"
```

## infer 关键字

`infer` 用于在条件类型中推断类型：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function greet() {
  return 'hello'
}

type GreetReturn = ReturnType<typeof greet>  // string
```

## 总结

TypeScript 的类型系统是图灵完备的，善用这些高级类型可以让你的代码更加类型安全。
