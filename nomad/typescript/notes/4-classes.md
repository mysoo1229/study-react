# #4 CLASSES AND INTERFACES

* Note taking of Typescript Lectures from nomadcoders.co

## 4.0 Classes
```typescript
class Player {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}
}

const yaki = new Player("yaki", "kim", "야키");

yaki.firstName; //안됨. private이라서
yaki.nickName; //됨. public이라서
```

> abstract : others can inherit(extend) from it, but you can't create new instance directly.

> private : cannot access through method.

> protected : can access through method.
```typescript
abstract class User {
  constructor(
    protected firstName: string,
    private lastName: string,
    private nickname: string
  ) {}

  abstract getNickName(): void //method call signature

  getFullName() { //얘를 private으로 하면 extend 안됨
    return `${this.firstName} ${this.lastName}`;
    //하지만 private이 아니면 method를 통해서 private도 access됨
    //only when this method is 'public' though
  }
} 

class Player extends User {
  getNickName() {
    console.log(this.nickName); //안됨. private이라서
    console.log(this.firstName); //됨. protected라서
  }
}

const yakiUser = new User("yaki", "kim", "야키"); //안됨. abstract이라서
const yakiPlayer = new Player("yaki", "kim", "야키"); //됨. extend 한거라서

yakiPlayer.getFullName();
```

Let's make a dictionary.
```typescript
type Words = {
  [key: string]: string
}

/* 예를들어 이렇게 쓸 수 있음
let dict: Words = {
  "potato": "food"
}
*/

class Dict {
  private words: Words //create property

  constructor() {
    this.words = {} //initialize manually
  }

  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }

  def(term: string) {
    return this.words[term];
  }
}

class Words {
  constructor(
    public term: string,
    public def: string
  )
}

const kimchi = new Word("kimchi", "한국인의 소울");

const dict = new Dict();

dict.add(kimchi);
dict.def("kimchi");
```
