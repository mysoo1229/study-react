# #3 FUNCTIONS

* Note taking of Typescript Lectures from nomadcoders.co

## 3.0 Call Signatures

```typescript
const add = (a:number, b:number) => a + b;
```

Above can be also written as Call Signatures
```typescript
type Add = (a:number, b:number) => number;

const add:Add = (a, b) => a + b;
```

## 3.1 Overloading
```typescript
type Add = {
  (a: number, b: number) : number
  (a: number, b: string) : number
}

// b type -> number | string

const add: Add = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
}
```

That's a silly example. Here is a real-life one.
```typescript
//예) 페이지를 이동하고 싶은데요
Router.push("/home"); //홈으로 가거나 (string)
Router.push({
  path: "/home",  //여러 옵션을 보내고 싶습니다 (object)
  state: 1
});

//그럴 땐
type Config = {
  path: string,
  state: object
}

type Push = {
  (path: string): void
  (config: Config): void
}

const push:Push = (config) => {
  if (typeof config === "string") {
    (config)
  } else {
    (config.path, config.state)
  }
}
```

Diff call signatures with diff number of paramters
```typescript
type Add = {
  (a: number, b: number) : number
  (a: number, b: number, c: number) : number
}

// c is optional, so you have to define its type first
const add: Add = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
}

add(1, 2); //얘도 되고
add(1, 2, 3); //얘도 됨
```

## 3.2 Polymorphism
You can't write every single possible types.
```typescript
type SuperPrintNah = {
  (arr: number[]): void
  (arr: boolean[]): void
  (arr: string[]): void //각각 언제 다 해
  (arr: (number | boolean)[]): void //조합 언제 다 하냐고
}
```

Use a placeholder.
```typescript
type SuperPrint = {
  <TypePlaceholder>(arr: TypePlaceholder[]): void
}

const superPrint: SuperPrint = (arr) => {
  arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3, 4]); //const superPrint: <number>(arr: number[]) => void
superPrint([true, false, true]);
superPrint(["a", "b", "c"]);
superPrint([1, "d"]); //<number | string>(arr: (number | string>)[])

```

Use it also for results.
```typescript
type SuperPrint = {
  <T>(arr: T[]): T //이렇게 많이 씀
}

const superPrint: SuperPrint = (arr) => arr[0]; //첫번째만 나올거야

const a = superPrint([1, 2, 3, 4]); //a: number
const b = superPrint([true, false, true]); //b: boolean
const c = superPrint(["a", "b", "c"]); //c: string
```

'any'와 다른 점
```typescript
//위에 이어서
a.toUpperCase(); //를 실행했을때

any: 응 노상관~ 다 돼
generic: ? 숫자라매 string 아님 안돼 돌아가
```

## 3.3 Generics Recap
> 제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.

```typescript
type SuperPrint = <T, M>(a: T[], b: M) => T;

const superPrint: SuperPrint = (a) => a[0];

const one = superPrint([1, 2, 3, 4], "x");
const two = superPrint([true, false, true], 10);
```

Normal function expression
```typescript
function superPrint<T>(a: T[]) {
  return a[0];
}
```

## 3.4 Conclusions
Usage
```typescript
type Player<E> = {
  name: string;
  extraInfo: E;
}

type YakiExtra = { favFood: string }
type YakiPlayer = Player<YakiExtra>

const yaki: YakiPlayer = {
  name: "yaki",
  extraInfo: {
    favFood: "chicken"
  }
}

const tico: Player<null> = {
  name: "tico",
  extraInfo: null
}
```

```typescript
type A = Array<number>;

let a: A = [1, 2, 3, 4];
```

```typescript
function printAllNumbers(arr: number[]) 
=
function printAllNumbers(arr: Array<number>) 
```

```typescript
useState<number>();
```
