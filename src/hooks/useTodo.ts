interface IUseTodo {
  array: Array<any>;
}

export default class UseTodo implements IUseTodo {
  public array: any[];

  constructor(array: any[] = []) {
    this.array = array;
  }

  public delete(id: number | string, value: number | string) {
    return this.array.filter((elem) => elem[id] !== value);
  }

  public update(key: string, id: string | number, value: any) {
    const index: number = this.array.findIndex((elem) => elem[key] === id);
    this.array[index] = value;
    return this.array;
  }
}
