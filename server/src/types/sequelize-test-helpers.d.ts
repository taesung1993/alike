declare module "sequelize-test-helpers" {
  import { Model } from "sequelize";

  export type Factory<T extends Model> = {
    create: (attrs?: object, options?: object) => Promise<T>;
    createMany: (num: number, attrs?: object, options?: object) => Promise<T[]>;
    build: (attrs?: object, options?: object) => T;
  };

  export function factory<T extends Model>(
    model: T,
    sequelize: any
  ): Factory<T>;

  export interface AssocFunction {
    (models: { [key: string]: typeof Model }): void;
  }

  export function associate(assocFunction: AssocFunction): void;
}
