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

  public move(element: any, to: string) {
    const index = this.array.findIndex((e) => e == element);
    if (to == ">") {
      const nextElem = this.array[index + 1];
      if (index !== this.array.length - 1) {
        this.array[index + 1] = element;
        this.array[index] = nextElem;
      }
    } else if (to == "<") {
      const nextElem = this.array[index - 1];
      if (index !== 0) {
        this.array[index - 1] = element;
        this.array[index] = nextElem;
      }
    }
  }
}
