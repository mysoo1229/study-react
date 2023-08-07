# #2 OVERVIEW OF TYPESCRIPT

* Note taking of Typescript Lectures from nomadcoders.co

## 2.2 Types of TS part One
#### Single-line Types
```typescript
let a : number = 10;
let b : string[] = ["hi", "bye"];
let c : boolean = true;
```

#### When you are using same types MORE THAN ONCE
```typescript
const playerYaki: {
  name: string,
  age?: number
} = {
  name: "yaki"
}

const playerTico: {
  name: string,
  age?: number
} = {
  name: "tico",
  age: 26
}
```

#### You can define the types first and REUSE
```typescript
type Name = string;
type Age = number;
type Player = {
  name: Name,
  age?: Age
}

const yaki: Player = {
  name: "yaki"
}

const tico: Player = {
  name: "tico",
  age: 26
}
```

#### A Return Function
```typescript
type Name = string;
type Age = number;
type Player = {
  name: Name,
  age?: Age
}

function PlayerMaker(name: string): Player {
  return { name } //name: name 을 줄여서 name으로 쓸 수 있음
}

//arrow function
const PlayerMaker = (name: string): Player => ({name});

const yaki = playerMaker("yaki"); //will return "yaki"
yaki.age = 35; //추가로 넣을 수 있음 왜냐면 Player 타입으로 age도 정의를 해줬기 때문에
```

## 2.3 TYPES of TS part Two
#### Read Only
```typescript
const numbers: readonly number[] = [1, 2, 3];

type Player = {
  readonly name: Name,
  age?: Age
}

//PlayerMaker 어쩌고 함수 생략

numbers.push[4]; //invalid. you can't overwrite
yaki.name = "kim"; //invalid
```

#### Tuples (여러개 types)
```typescript
const player: [string, number, boolean] = ["yaki", 10, true];
```

#### Any
```typescript
const a: any[] = [1, 2, 3];
const b: any = true;

a + b; //Will work just like javascript. But why should you use?
//Don't try to escape from typescript unless you reallyreallyreally need to.
```

## 2.4 TYPES of TS part Three
#### Unknown
```typescript
let a : unknown;

if (typeof a === 'number') {
  let b = a + 1;
}

if (typeof a === 'string') {
  let b = a.toUpperCase();
}

//Use it when you don't know the type (ex. from api)
```

#### Void
```typescript
function hello() {
  console.log('hehe');
}

//Type of this function is 'void'. It doesn't return anything.

const a = hello();
a.toUpperCase() //invalid. 'void' can't be 'string'
```

#### Never
```typescript
function hello() { //Type of this function is 'never'. This will not happen.
  throw new Error('Ooops');
}
```

```typescript
function hello(name: string | number) {
  if (typeof name === "string") {
    name
  } else if (typesof name === "number") {
    name
  } else {
    name //Can NEVER happen.
  }
}
```
