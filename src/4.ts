class Key {
  private readonly signature: string;
  constructor() {
    this.signature = btoa(String(Math.random()));
  }
  public getSignature(): string {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  public getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];
  constructor(protected key: Key) {}

  public comeIn(person: Person): void {
    if (this.door && !this.tenants.includes(person)) {
      this.tenants.push(person);
    }
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  public openDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
