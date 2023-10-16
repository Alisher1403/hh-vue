interface IUseTodo {
  array: Array<any>;
}

export default class UseTodo implements IUseTodo {
  public array: any[];

  constructor(array: any[] = []) {
    this.array = array;
  }

  public delete(data: any, val: any) {
    if (val) {
      this.array = this.array.filter((elem) => elem[data] !== val);
    } else {
      this.array = this.array.filter((elem) => elem !== data);
    }
  }

  public update(key: string, id: string | number, value: any) {
    const index: number = this.array.findIndex((elem) => elem[key] === id);
    this.array[index] = value;
    return this.array;
  }
}
