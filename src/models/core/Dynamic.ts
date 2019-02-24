import { trigger, on, off } from "../../utils/events";

export type DynamicOrValue<K> = Dynamic<K> | K;

export type DyanmicCalculate<T> = () => T | undefined;

export type DyanmicDepedencies = Array<Dynamic> | Dynamic<Array<Dynamic>>;

export function dynamic<T = any>(value?: T, dependencies?: DyanmicDepedencies, calculate?: DyanmicCalculate<T>): Dynamic<T> {
  return new Dynamic(value, dependencies, calculate);
}

export function derived<T = any>(dependencies: DyanmicDepedencies, calculate?: DyanmicCalculate<T>): Dynamic<T> {
  const initialValue = calculate ? calculate() : undefined;

  return new Dynamic(initialValue, dependencies, calculate);
}

export class Dynamic<T = any> {
  protected value: T;

  protected dependencies: DyanmicDepedencies;
  protected originalDepedencies: Array<Dynamic>;
  protected calculate: DyanmicCalculate<T>;

  needsUpdate: boolean = false;
  
  constructor(value?: T, dependencies?: DyanmicDepedencies, calculate?: DyanmicCalculate<T>) {
    this.value = value;

    this.calculate = calculate;

    if (dependencies) {
      this.dependencies = dependencies;

      if (dependencies instanceof Dynamic) {
        this.originalDepedencies = dependencies.get();
        this.originalDepedencies.forEach((dependency) => on(dependency, 'change', this, () => this.markUpdated()));
        on(dependencies, 'change', this, () => {  
          this.originalDepedencies.forEach((dependency) => off(dependency, 'change', this));
          (this.dependencies as Dynamic<Array<Dynamic>>).get().forEach((dependency) => on(dependency, 'change', this, () => this.markUpdated()));
        });
      } else {
        dependencies.forEach((dependency) => on(dependency, 'change', this, () => this.markUpdated()));
      }
    }
  }

  update() {
    trigger(this, 'change');
  }

  markUpdated() {
    this.needsUpdate = true;
    this.update();
  };

  destroy() {
    if (this.dependencies) {
      if (this.dependencies instanceof Dynamic) {
        off(this.dependencies, 'change', this);
        this.dependencies.get().forEach((dependency) => off(dependency, 'change', this));
      } else {
        this.dependencies.forEach((dependency) => off(dependency, 'change', this));
      }
    }
  }

  set(value: T, force?: boolean) {
    this.needsUpdate = false;
    
    if (this.value === value && !force) {
      return;
    }
    
    this.value = value;
    this.update();
  }

  get(): T {
    if (this.needsUpdate && this.calculate) {
      this.needsUpdate = false;
      this.value = this.calculate();
    }

    return this.value;
  }
}
