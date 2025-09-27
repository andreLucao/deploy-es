
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model EmissionProduct
 * 
 */
export type EmissionProduct = $Result.DefaultSelection<Prisma.$EmissionProductPayload>
/**
 * Model EmissionFactor
 * 
 */
export type EmissionFactor = $Result.DefaultSelection<Prisma.$EmissionFactorPayload>
/**
 * Model Emission
 * 
 */
export type Emission = $Result.DefaultSelection<Prisma.$EmissionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emissionProduct`: Exposes CRUD operations for the **EmissionProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmissionProducts
    * const emissionProducts = await prisma.emissionProduct.findMany()
    * ```
    */
  get emissionProduct(): Prisma.EmissionProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emissionFactor`: Exposes CRUD operations for the **EmissionFactor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmissionFactors
    * const emissionFactors = await prisma.emissionFactor.findMany()
    * ```
    */
  get emissionFactor(): Prisma.EmissionFactorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emission`: Exposes CRUD operations for the **Emission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emissions
    * const emissions = await prisma.emission.findMany()
    * ```
    */
  get emission(): Prisma.EmissionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    EmissionProduct: 'EmissionProduct',
    EmissionFactor: 'EmissionFactor',
    Emission: 'Emission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "emissionProduct" | "emissionFactor" | "emission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      EmissionProduct: {
        payload: Prisma.$EmissionProductPayload<ExtArgs>
        fields: Prisma.EmissionProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmissionProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmissionProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>
          }
          findFirst: {
            args: Prisma.EmissionProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmissionProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>
          }
          findMany: {
            args: Prisma.EmissionProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>[]
          }
          create: {
            args: Prisma.EmissionProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>
          }
          createMany: {
            args: Prisma.EmissionProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmissionProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>[]
          }
          delete: {
            args: Prisma.EmissionProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>
          }
          update: {
            args: Prisma.EmissionProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>
          }
          deleteMany: {
            args: Prisma.EmissionProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmissionProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmissionProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>[]
          }
          upsert: {
            args: Prisma.EmissionProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionProductPayload>
          }
          aggregate: {
            args: Prisma.EmissionProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmissionProduct>
          }
          groupBy: {
            args: Prisma.EmissionProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmissionProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmissionProductCountArgs<ExtArgs>
            result: $Utils.Optional<EmissionProductCountAggregateOutputType> | number
          }
        }
      }
      EmissionFactor: {
        payload: Prisma.$EmissionFactorPayload<ExtArgs>
        fields: Prisma.EmissionFactorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmissionFactorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmissionFactorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>
          }
          findFirst: {
            args: Prisma.EmissionFactorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmissionFactorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>
          }
          findMany: {
            args: Prisma.EmissionFactorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>[]
          }
          create: {
            args: Prisma.EmissionFactorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>
          }
          createMany: {
            args: Prisma.EmissionFactorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmissionFactorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>[]
          }
          delete: {
            args: Prisma.EmissionFactorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>
          }
          update: {
            args: Prisma.EmissionFactorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>
          }
          deleteMany: {
            args: Prisma.EmissionFactorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmissionFactorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmissionFactorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>[]
          }
          upsert: {
            args: Prisma.EmissionFactorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionFactorPayload>
          }
          aggregate: {
            args: Prisma.EmissionFactorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmissionFactor>
          }
          groupBy: {
            args: Prisma.EmissionFactorGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmissionFactorGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmissionFactorCountArgs<ExtArgs>
            result: $Utils.Optional<EmissionFactorCountAggregateOutputType> | number
          }
        }
      }
      Emission: {
        payload: Prisma.$EmissionPayload<ExtArgs>
        fields: Prisma.EmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>
          }
          findFirst: {
            args: Prisma.EmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>
          }
          findMany: {
            args: Prisma.EmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>[]
          }
          create: {
            args: Prisma.EmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>
          }
          createMany: {
            args: Prisma.EmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>[]
          }
          delete: {
            args: Prisma.EmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>
          }
          update: {
            args: Prisma.EmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>
          }
          deleteMany: {
            args: Prisma.EmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>[]
          }
          upsert: {
            args: Prisma.EmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmissionPayload>
          }
          aggregate: {
            args: Prisma.EmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmission>
          }
          groupBy: {
            args: Prisma.EmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmissionCountArgs<ExtArgs>
            result: $Utils.Optional<EmissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    emissionProduct?: EmissionProductOmit
    emissionFactor?: EmissionFactorOmit
    emission?: EmissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    emissions: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emissions?: boolean | CompanyCountOutputTypeCountEmissionsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountEmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmissionWhereInput
  }


  /**
   * Count Type EmissionProductCountOutputType
   */

  export type EmissionProductCountOutputType = {
    emissionFactors: number
    emissions: number
  }

  export type EmissionProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emissionFactors?: boolean | EmissionProductCountOutputTypeCountEmissionFactorsArgs
    emissions?: boolean | EmissionProductCountOutputTypeCountEmissionsArgs
  }

  // Custom InputTypes
  /**
   * EmissionProductCountOutputType without action
   */
  export type EmissionProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProductCountOutputType
     */
    select?: EmissionProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmissionProductCountOutputType without action
   */
  export type EmissionProductCountOutputTypeCountEmissionFactorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmissionFactorWhereInput
  }

  /**
   * EmissionProductCountOutputType without action
   */
  export type EmissionProductCountOutputTypeCountEmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    email: string | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    email: string | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    email: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    email?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    email?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    email?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    email: string
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emissions?: boolean | Company$emissionsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    email?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emissions?: boolean | Company$emissionsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      emissions: Prisma.$EmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emissions<T extends Company$emissionsArgs<ExtArgs> = {}>(args?: Subset<T, Company$emissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly email: FieldRef<"Company", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.emissions
   */
  export type Company$emissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    where?: EmissionWhereInput
    orderBy?: EmissionOrderByWithRelationInput | EmissionOrderByWithRelationInput[]
    cursor?: EmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmissionScalarFieldEnum | EmissionScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model EmissionProduct
   */

  export type AggregateEmissionProduct = {
    _count: EmissionProductCountAggregateOutputType | null
    _min: EmissionProductMinAggregateOutputType | null
    _max: EmissionProductMaxAggregateOutputType | null
  }

  export type EmissionProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    unit: string | null
    scope: string | null
    createdAt: Date | null
  }

  export type EmissionProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    unit: string | null
    scope: string | null
    createdAt: Date | null
  }

  export type EmissionProductCountAggregateOutputType = {
    id: number
    name: number
    unit: number
    scope: number
    createdAt: number
    _all: number
  }


  export type EmissionProductMinAggregateInputType = {
    id?: true
    name?: true
    unit?: true
    scope?: true
    createdAt?: true
  }

  export type EmissionProductMaxAggregateInputType = {
    id?: true
    name?: true
    unit?: true
    scope?: true
    createdAt?: true
  }

  export type EmissionProductCountAggregateInputType = {
    id?: true
    name?: true
    unit?: true
    scope?: true
    createdAt?: true
    _all?: true
  }

  export type EmissionProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmissionProduct to aggregate.
     */
    where?: EmissionProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionProducts to fetch.
     */
    orderBy?: EmissionProductOrderByWithRelationInput | EmissionProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmissionProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmissionProducts
    **/
    _count?: true | EmissionProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmissionProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmissionProductMaxAggregateInputType
  }

  export type GetEmissionProductAggregateType<T extends EmissionProductAggregateArgs> = {
        [P in keyof T & keyof AggregateEmissionProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmissionProduct[P]>
      : GetScalarType<T[P], AggregateEmissionProduct[P]>
  }




  export type EmissionProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmissionProductWhereInput
    orderBy?: EmissionProductOrderByWithAggregationInput | EmissionProductOrderByWithAggregationInput[]
    by: EmissionProductScalarFieldEnum[] | EmissionProductScalarFieldEnum
    having?: EmissionProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmissionProductCountAggregateInputType | true
    _min?: EmissionProductMinAggregateInputType
    _max?: EmissionProductMaxAggregateInputType
  }

  export type EmissionProductGroupByOutputType = {
    id: string
    name: string
    unit: string
    scope: string | null
    createdAt: Date
    _count: EmissionProductCountAggregateOutputType | null
    _min: EmissionProductMinAggregateOutputType | null
    _max: EmissionProductMaxAggregateOutputType | null
  }

  type GetEmissionProductGroupByPayload<T extends EmissionProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmissionProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmissionProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmissionProductGroupByOutputType[P]>
            : GetScalarType<T[P], EmissionProductGroupByOutputType[P]>
        }
      >
    >


  export type EmissionProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    unit?: boolean
    scope?: boolean
    createdAt?: boolean
    emissionFactors?: boolean | EmissionProduct$emissionFactorsArgs<ExtArgs>
    emissions?: boolean | EmissionProduct$emissionsArgs<ExtArgs>
    _count?: boolean | EmissionProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emissionProduct"]>

  export type EmissionProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    unit?: boolean
    scope?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emissionProduct"]>

  export type EmissionProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    unit?: boolean
    scope?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emissionProduct"]>

  export type EmissionProductSelectScalar = {
    id?: boolean
    name?: boolean
    unit?: boolean
    scope?: boolean
    createdAt?: boolean
  }

  export type EmissionProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "unit" | "scope" | "createdAt", ExtArgs["result"]["emissionProduct"]>
  export type EmissionProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emissionFactors?: boolean | EmissionProduct$emissionFactorsArgs<ExtArgs>
    emissions?: boolean | EmissionProduct$emissionsArgs<ExtArgs>
    _count?: boolean | EmissionProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmissionProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EmissionProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EmissionProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmissionProduct"
    objects: {
      emissionFactors: Prisma.$EmissionFactorPayload<ExtArgs>[]
      emissions: Prisma.$EmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      unit: string
      scope: string | null
      createdAt: Date
    }, ExtArgs["result"]["emissionProduct"]>
    composites: {}
  }

  type EmissionProductGetPayload<S extends boolean | null | undefined | EmissionProductDefaultArgs> = $Result.GetResult<Prisma.$EmissionProductPayload, S>

  type EmissionProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmissionProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmissionProductCountAggregateInputType | true
    }

  export interface EmissionProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmissionProduct'], meta: { name: 'EmissionProduct' } }
    /**
     * Find zero or one EmissionProduct that matches the filter.
     * @param {EmissionProductFindUniqueArgs} args - Arguments to find a EmissionProduct
     * @example
     * // Get one EmissionProduct
     * const emissionProduct = await prisma.emissionProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmissionProductFindUniqueArgs>(args: SelectSubset<T, EmissionProductFindUniqueArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmissionProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmissionProductFindUniqueOrThrowArgs} args - Arguments to find a EmissionProduct
     * @example
     * // Get one EmissionProduct
     * const emissionProduct = await prisma.emissionProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmissionProductFindUniqueOrThrowArgs>(args: SelectSubset<T, EmissionProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmissionProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionProductFindFirstArgs} args - Arguments to find a EmissionProduct
     * @example
     * // Get one EmissionProduct
     * const emissionProduct = await prisma.emissionProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmissionProductFindFirstArgs>(args?: SelectSubset<T, EmissionProductFindFirstArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmissionProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionProductFindFirstOrThrowArgs} args - Arguments to find a EmissionProduct
     * @example
     * // Get one EmissionProduct
     * const emissionProduct = await prisma.emissionProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmissionProductFindFirstOrThrowArgs>(args?: SelectSubset<T, EmissionProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmissionProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmissionProducts
     * const emissionProducts = await prisma.emissionProduct.findMany()
     * 
     * // Get first 10 EmissionProducts
     * const emissionProducts = await prisma.emissionProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emissionProductWithIdOnly = await prisma.emissionProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmissionProductFindManyArgs>(args?: SelectSubset<T, EmissionProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmissionProduct.
     * @param {EmissionProductCreateArgs} args - Arguments to create a EmissionProduct.
     * @example
     * // Create one EmissionProduct
     * const EmissionProduct = await prisma.emissionProduct.create({
     *   data: {
     *     // ... data to create a EmissionProduct
     *   }
     * })
     * 
     */
    create<T extends EmissionProductCreateArgs>(args: SelectSubset<T, EmissionProductCreateArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmissionProducts.
     * @param {EmissionProductCreateManyArgs} args - Arguments to create many EmissionProducts.
     * @example
     * // Create many EmissionProducts
     * const emissionProduct = await prisma.emissionProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmissionProductCreateManyArgs>(args?: SelectSubset<T, EmissionProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmissionProducts and returns the data saved in the database.
     * @param {EmissionProductCreateManyAndReturnArgs} args - Arguments to create many EmissionProducts.
     * @example
     * // Create many EmissionProducts
     * const emissionProduct = await prisma.emissionProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmissionProducts and only return the `id`
     * const emissionProductWithIdOnly = await prisma.emissionProduct.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmissionProductCreateManyAndReturnArgs>(args?: SelectSubset<T, EmissionProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmissionProduct.
     * @param {EmissionProductDeleteArgs} args - Arguments to delete one EmissionProduct.
     * @example
     * // Delete one EmissionProduct
     * const EmissionProduct = await prisma.emissionProduct.delete({
     *   where: {
     *     // ... filter to delete one EmissionProduct
     *   }
     * })
     * 
     */
    delete<T extends EmissionProductDeleteArgs>(args: SelectSubset<T, EmissionProductDeleteArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmissionProduct.
     * @param {EmissionProductUpdateArgs} args - Arguments to update one EmissionProduct.
     * @example
     * // Update one EmissionProduct
     * const emissionProduct = await prisma.emissionProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmissionProductUpdateArgs>(args: SelectSubset<T, EmissionProductUpdateArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmissionProducts.
     * @param {EmissionProductDeleteManyArgs} args - Arguments to filter EmissionProducts to delete.
     * @example
     * // Delete a few EmissionProducts
     * const { count } = await prisma.emissionProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmissionProductDeleteManyArgs>(args?: SelectSubset<T, EmissionProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmissionProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmissionProducts
     * const emissionProduct = await prisma.emissionProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmissionProductUpdateManyArgs>(args: SelectSubset<T, EmissionProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmissionProducts and returns the data updated in the database.
     * @param {EmissionProductUpdateManyAndReturnArgs} args - Arguments to update many EmissionProducts.
     * @example
     * // Update many EmissionProducts
     * const emissionProduct = await prisma.emissionProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmissionProducts and only return the `id`
     * const emissionProductWithIdOnly = await prisma.emissionProduct.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmissionProductUpdateManyAndReturnArgs>(args: SelectSubset<T, EmissionProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmissionProduct.
     * @param {EmissionProductUpsertArgs} args - Arguments to update or create a EmissionProduct.
     * @example
     * // Update or create a EmissionProduct
     * const emissionProduct = await prisma.emissionProduct.upsert({
     *   create: {
     *     // ... data to create a EmissionProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmissionProduct we want to update
     *   }
     * })
     */
    upsert<T extends EmissionProductUpsertArgs>(args: SelectSubset<T, EmissionProductUpsertArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmissionProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionProductCountArgs} args - Arguments to filter EmissionProducts to count.
     * @example
     * // Count the number of EmissionProducts
     * const count = await prisma.emissionProduct.count({
     *   where: {
     *     // ... the filter for the EmissionProducts we want to count
     *   }
     * })
    **/
    count<T extends EmissionProductCountArgs>(
      args?: Subset<T, EmissionProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmissionProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmissionProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmissionProductAggregateArgs>(args: Subset<T, EmissionProductAggregateArgs>): Prisma.PrismaPromise<GetEmissionProductAggregateType<T>>

    /**
     * Group by EmissionProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmissionProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmissionProductGroupByArgs['orderBy'] }
        : { orderBy?: EmissionProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmissionProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmissionProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmissionProduct model
   */
  readonly fields: EmissionProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmissionProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmissionProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emissionFactors<T extends EmissionProduct$emissionFactorsArgs<ExtArgs> = {}>(args?: Subset<T, EmissionProduct$emissionFactorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emissions<T extends EmissionProduct$emissionsArgs<ExtArgs> = {}>(args?: Subset<T, EmissionProduct$emissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmissionProduct model
   */
  interface EmissionProductFieldRefs {
    readonly id: FieldRef<"EmissionProduct", 'String'>
    readonly name: FieldRef<"EmissionProduct", 'String'>
    readonly unit: FieldRef<"EmissionProduct", 'String'>
    readonly scope: FieldRef<"EmissionProduct", 'String'>
    readonly createdAt: FieldRef<"EmissionProduct", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmissionProduct findUnique
   */
  export type EmissionProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * Filter, which EmissionProduct to fetch.
     */
    where: EmissionProductWhereUniqueInput
  }

  /**
   * EmissionProduct findUniqueOrThrow
   */
  export type EmissionProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * Filter, which EmissionProduct to fetch.
     */
    where: EmissionProductWhereUniqueInput
  }

  /**
   * EmissionProduct findFirst
   */
  export type EmissionProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * Filter, which EmissionProduct to fetch.
     */
    where?: EmissionProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionProducts to fetch.
     */
    orderBy?: EmissionProductOrderByWithRelationInput | EmissionProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmissionProducts.
     */
    cursor?: EmissionProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmissionProducts.
     */
    distinct?: EmissionProductScalarFieldEnum | EmissionProductScalarFieldEnum[]
  }

  /**
   * EmissionProduct findFirstOrThrow
   */
  export type EmissionProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * Filter, which EmissionProduct to fetch.
     */
    where?: EmissionProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionProducts to fetch.
     */
    orderBy?: EmissionProductOrderByWithRelationInput | EmissionProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmissionProducts.
     */
    cursor?: EmissionProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmissionProducts.
     */
    distinct?: EmissionProductScalarFieldEnum | EmissionProductScalarFieldEnum[]
  }

  /**
   * EmissionProduct findMany
   */
  export type EmissionProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * Filter, which EmissionProducts to fetch.
     */
    where?: EmissionProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionProducts to fetch.
     */
    orderBy?: EmissionProductOrderByWithRelationInput | EmissionProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmissionProducts.
     */
    cursor?: EmissionProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionProducts.
     */
    skip?: number
    distinct?: EmissionProductScalarFieldEnum | EmissionProductScalarFieldEnum[]
  }

  /**
   * EmissionProduct create
   */
  export type EmissionProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * The data needed to create a EmissionProduct.
     */
    data: XOR<EmissionProductCreateInput, EmissionProductUncheckedCreateInput>
  }

  /**
   * EmissionProduct createMany
   */
  export type EmissionProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmissionProducts.
     */
    data: EmissionProductCreateManyInput | EmissionProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmissionProduct createManyAndReturn
   */
  export type EmissionProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * The data used to create many EmissionProducts.
     */
    data: EmissionProductCreateManyInput | EmissionProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmissionProduct update
   */
  export type EmissionProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * The data needed to update a EmissionProduct.
     */
    data: XOR<EmissionProductUpdateInput, EmissionProductUncheckedUpdateInput>
    /**
     * Choose, which EmissionProduct to update.
     */
    where: EmissionProductWhereUniqueInput
  }

  /**
   * EmissionProduct updateMany
   */
  export type EmissionProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmissionProducts.
     */
    data: XOR<EmissionProductUpdateManyMutationInput, EmissionProductUncheckedUpdateManyInput>
    /**
     * Filter which EmissionProducts to update
     */
    where?: EmissionProductWhereInput
    /**
     * Limit how many EmissionProducts to update.
     */
    limit?: number
  }

  /**
   * EmissionProduct updateManyAndReturn
   */
  export type EmissionProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * The data used to update EmissionProducts.
     */
    data: XOR<EmissionProductUpdateManyMutationInput, EmissionProductUncheckedUpdateManyInput>
    /**
     * Filter which EmissionProducts to update
     */
    where?: EmissionProductWhereInput
    /**
     * Limit how many EmissionProducts to update.
     */
    limit?: number
  }

  /**
   * EmissionProduct upsert
   */
  export type EmissionProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * The filter to search for the EmissionProduct to update in case it exists.
     */
    where: EmissionProductWhereUniqueInput
    /**
     * In case the EmissionProduct found by the `where` argument doesn't exist, create a new EmissionProduct with this data.
     */
    create: XOR<EmissionProductCreateInput, EmissionProductUncheckedCreateInput>
    /**
     * In case the EmissionProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmissionProductUpdateInput, EmissionProductUncheckedUpdateInput>
  }

  /**
   * EmissionProduct delete
   */
  export type EmissionProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
    /**
     * Filter which EmissionProduct to delete.
     */
    where: EmissionProductWhereUniqueInput
  }

  /**
   * EmissionProduct deleteMany
   */
  export type EmissionProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmissionProducts to delete
     */
    where?: EmissionProductWhereInput
    /**
     * Limit how many EmissionProducts to delete.
     */
    limit?: number
  }

  /**
   * EmissionProduct.emissionFactors
   */
  export type EmissionProduct$emissionFactorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    where?: EmissionFactorWhereInput
    orderBy?: EmissionFactorOrderByWithRelationInput | EmissionFactorOrderByWithRelationInput[]
    cursor?: EmissionFactorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmissionFactorScalarFieldEnum | EmissionFactorScalarFieldEnum[]
  }

  /**
   * EmissionProduct.emissions
   */
  export type EmissionProduct$emissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    where?: EmissionWhereInput
    orderBy?: EmissionOrderByWithRelationInput | EmissionOrderByWithRelationInput[]
    cursor?: EmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmissionScalarFieldEnum | EmissionScalarFieldEnum[]
  }

  /**
   * EmissionProduct without action
   */
  export type EmissionProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionProduct
     */
    select?: EmissionProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionProduct
     */
    omit?: EmissionProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionProductInclude<ExtArgs> | null
  }


  /**
   * Model EmissionFactor
   */

  export type AggregateEmissionFactor = {
    _count: EmissionFactorCountAggregateOutputType | null
    _avg: EmissionFactorAvgAggregateOutputType | null
    _sum: EmissionFactorSumAggregateOutputType | null
    _min: EmissionFactorMinAggregateOutputType | null
    _max: EmissionFactorMaxAggregateOutputType | null
  }

  export type EmissionFactorAvgAggregateOutputType = {
    year: number | null
    factorValue: number | null
  }

  export type EmissionFactorSumAggregateOutputType = {
    year: number | null
    factorValue: number | null
  }

  export type EmissionFactorMinAggregateOutputType = {
    id: string | null
    emissionProductId: string | null
    region: string | null
    year: number | null
    factorValue: number | null
    createdAt: Date | null
  }

  export type EmissionFactorMaxAggregateOutputType = {
    id: string | null
    emissionProductId: string | null
    region: string | null
    year: number | null
    factorValue: number | null
    createdAt: Date | null
  }

  export type EmissionFactorCountAggregateOutputType = {
    id: number
    emissionProductId: number
    region: number
    year: number
    factorValue: number
    createdAt: number
    _all: number
  }


  export type EmissionFactorAvgAggregateInputType = {
    year?: true
    factorValue?: true
  }

  export type EmissionFactorSumAggregateInputType = {
    year?: true
    factorValue?: true
  }

  export type EmissionFactorMinAggregateInputType = {
    id?: true
    emissionProductId?: true
    region?: true
    year?: true
    factorValue?: true
    createdAt?: true
  }

  export type EmissionFactorMaxAggregateInputType = {
    id?: true
    emissionProductId?: true
    region?: true
    year?: true
    factorValue?: true
    createdAt?: true
  }

  export type EmissionFactorCountAggregateInputType = {
    id?: true
    emissionProductId?: true
    region?: true
    year?: true
    factorValue?: true
    createdAt?: true
    _all?: true
  }

  export type EmissionFactorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmissionFactor to aggregate.
     */
    where?: EmissionFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionFactors to fetch.
     */
    orderBy?: EmissionFactorOrderByWithRelationInput | EmissionFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmissionFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmissionFactors
    **/
    _count?: true | EmissionFactorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmissionFactorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmissionFactorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmissionFactorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmissionFactorMaxAggregateInputType
  }

  export type GetEmissionFactorAggregateType<T extends EmissionFactorAggregateArgs> = {
        [P in keyof T & keyof AggregateEmissionFactor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmissionFactor[P]>
      : GetScalarType<T[P], AggregateEmissionFactor[P]>
  }




  export type EmissionFactorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmissionFactorWhereInput
    orderBy?: EmissionFactorOrderByWithAggregationInput | EmissionFactorOrderByWithAggregationInput[]
    by: EmissionFactorScalarFieldEnum[] | EmissionFactorScalarFieldEnum
    having?: EmissionFactorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmissionFactorCountAggregateInputType | true
    _avg?: EmissionFactorAvgAggregateInputType
    _sum?: EmissionFactorSumAggregateInputType
    _min?: EmissionFactorMinAggregateInputType
    _max?: EmissionFactorMaxAggregateInputType
  }

  export type EmissionFactorGroupByOutputType = {
    id: string
    emissionProductId: string
    region: string | null
    year: number | null
    factorValue: number
    createdAt: Date
    _count: EmissionFactorCountAggregateOutputType | null
    _avg: EmissionFactorAvgAggregateOutputType | null
    _sum: EmissionFactorSumAggregateOutputType | null
    _min: EmissionFactorMinAggregateOutputType | null
    _max: EmissionFactorMaxAggregateOutputType | null
  }

  type GetEmissionFactorGroupByPayload<T extends EmissionFactorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmissionFactorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmissionFactorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmissionFactorGroupByOutputType[P]>
            : GetScalarType<T[P], EmissionFactorGroupByOutputType[P]>
        }
      >
    >


  export type EmissionFactorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emissionProductId?: boolean
    region?: boolean
    year?: boolean
    factorValue?: boolean
    createdAt?: boolean
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emissionFactor"]>

  export type EmissionFactorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emissionProductId?: boolean
    region?: boolean
    year?: boolean
    factorValue?: boolean
    createdAt?: boolean
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emissionFactor"]>

  export type EmissionFactorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emissionProductId?: boolean
    region?: boolean
    year?: boolean
    factorValue?: boolean
    createdAt?: boolean
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emissionFactor"]>

  export type EmissionFactorSelectScalar = {
    id?: boolean
    emissionProductId?: boolean
    region?: boolean
    year?: boolean
    factorValue?: boolean
    createdAt?: boolean
  }

  export type EmissionFactorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "emissionProductId" | "region" | "year" | "factorValue" | "createdAt", ExtArgs["result"]["emissionFactor"]>
  export type EmissionFactorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }
  export type EmissionFactorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }
  export type EmissionFactorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }

  export type $EmissionFactorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmissionFactor"
    objects: {
      emissionProduct: Prisma.$EmissionProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      emissionProductId: string
      region: string | null
      year: number | null
      factorValue: number
      createdAt: Date
    }, ExtArgs["result"]["emissionFactor"]>
    composites: {}
  }

  type EmissionFactorGetPayload<S extends boolean | null | undefined | EmissionFactorDefaultArgs> = $Result.GetResult<Prisma.$EmissionFactorPayload, S>

  type EmissionFactorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmissionFactorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmissionFactorCountAggregateInputType | true
    }

  export interface EmissionFactorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmissionFactor'], meta: { name: 'EmissionFactor' } }
    /**
     * Find zero or one EmissionFactor that matches the filter.
     * @param {EmissionFactorFindUniqueArgs} args - Arguments to find a EmissionFactor
     * @example
     * // Get one EmissionFactor
     * const emissionFactor = await prisma.emissionFactor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmissionFactorFindUniqueArgs>(args: SelectSubset<T, EmissionFactorFindUniqueArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmissionFactor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmissionFactorFindUniqueOrThrowArgs} args - Arguments to find a EmissionFactor
     * @example
     * // Get one EmissionFactor
     * const emissionFactor = await prisma.emissionFactor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmissionFactorFindUniqueOrThrowArgs>(args: SelectSubset<T, EmissionFactorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmissionFactor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFactorFindFirstArgs} args - Arguments to find a EmissionFactor
     * @example
     * // Get one EmissionFactor
     * const emissionFactor = await prisma.emissionFactor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmissionFactorFindFirstArgs>(args?: SelectSubset<T, EmissionFactorFindFirstArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmissionFactor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFactorFindFirstOrThrowArgs} args - Arguments to find a EmissionFactor
     * @example
     * // Get one EmissionFactor
     * const emissionFactor = await prisma.emissionFactor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmissionFactorFindFirstOrThrowArgs>(args?: SelectSubset<T, EmissionFactorFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmissionFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFactorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmissionFactors
     * const emissionFactors = await prisma.emissionFactor.findMany()
     * 
     * // Get first 10 EmissionFactors
     * const emissionFactors = await prisma.emissionFactor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emissionFactorWithIdOnly = await prisma.emissionFactor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmissionFactorFindManyArgs>(args?: SelectSubset<T, EmissionFactorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmissionFactor.
     * @param {EmissionFactorCreateArgs} args - Arguments to create a EmissionFactor.
     * @example
     * // Create one EmissionFactor
     * const EmissionFactor = await prisma.emissionFactor.create({
     *   data: {
     *     // ... data to create a EmissionFactor
     *   }
     * })
     * 
     */
    create<T extends EmissionFactorCreateArgs>(args: SelectSubset<T, EmissionFactorCreateArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmissionFactors.
     * @param {EmissionFactorCreateManyArgs} args - Arguments to create many EmissionFactors.
     * @example
     * // Create many EmissionFactors
     * const emissionFactor = await prisma.emissionFactor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmissionFactorCreateManyArgs>(args?: SelectSubset<T, EmissionFactorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmissionFactors and returns the data saved in the database.
     * @param {EmissionFactorCreateManyAndReturnArgs} args - Arguments to create many EmissionFactors.
     * @example
     * // Create many EmissionFactors
     * const emissionFactor = await prisma.emissionFactor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmissionFactors and only return the `id`
     * const emissionFactorWithIdOnly = await prisma.emissionFactor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmissionFactorCreateManyAndReturnArgs>(args?: SelectSubset<T, EmissionFactorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmissionFactor.
     * @param {EmissionFactorDeleteArgs} args - Arguments to delete one EmissionFactor.
     * @example
     * // Delete one EmissionFactor
     * const EmissionFactor = await prisma.emissionFactor.delete({
     *   where: {
     *     // ... filter to delete one EmissionFactor
     *   }
     * })
     * 
     */
    delete<T extends EmissionFactorDeleteArgs>(args: SelectSubset<T, EmissionFactorDeleteArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmissionFactor.
     * @param {EmissionFactorUpdateArgs} args - Arguments to update one EmissionFactor.
     * @example
     * // Update one EmissionFactor
     * const emissionFactor = await prisma.emissionFactor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmissionFactorUpdateArgs>(args: SelectSubset<T, EmissionFactorUpdateArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmissionFactors.
     * @param {EmissionFactorDeleteManyArgs} args - Arguments to filter EmissionFactors to delete.
     * @example
     * // Delete a few EmissionFactors
     * const { count } = await prisma.emissionFactor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmissionFactorDeleteManyArgs>(args?: SelectSubset<T, EmissionFactorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmissionFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFactorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmissionFactors
     * const emissionFactor = await prisma.emissionFactor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmissionFactorUpdateManyArgs>(args: SelectSubset<T, EmissionFactorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmissionFactors and returns the data updated in the database.
     * @param {EmissionFactorUpdateManyAndReturnArgs} args - Arguments to update many EmissionFactors.
     * @example
     * // Update many EmissionFactors
     * const emissionFactor = await prisma.emissionFactor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmissionFactors and only return the `id`
     * const emissionFactorWithIdOnly = await prisma.emissionFactor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmissionFactorUpdateManyAndReturnArgs>(args: SelectSubset<T, EmissionFactorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmissionFactor.
     * @param {EmissionFactorUpsertArgs} args - Arguments to update or create a EmissionFactor.
     * @example
     * // Update or create a EmissionFactor
     * const emissionFactor = await prisma.emissionFactor.upsert({
     *   create: {
     *     // ... data to create a EmissionFactor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmissionFactor we want to update
     *   }
     * })
     */
    upsert<T extends EmissionFactorUpsertArgs>(args: SelectSubset<T, EmissionFactorUpsertArgs<ExtArgs>>): Prisma__EmissionFactorClient<$Result.GetResult<Prisma.$EmissionFactorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmissionFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFactorCountArgs} args - Arguments to filter EmissionFactors to count.
     * @example
     * // Count the number of EmissionFactors
     * const count = await prisma.emissionFactor.count({
     *   where: {
     *     // ... the filter for the EmissionFactors we want to count
     *   }
     * })
    **/
    count<T extends EmissionFactorCountArgs>(
      args?: Subset<T, EmissionFactorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmissionFactorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmissionFactor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFactorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmissionFactorAggregateArgs>(args: Subset<T, EmissionFactorAggregateArgs>): Prisma.PrismaPromise<GetEmissionFactorAggregateType<T>>

    /**
     * Group by EmissionFactor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFactorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmissionFactorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmissionFactorGroupByArgs['orderBy'] }
        : { orderBy?: EmissionFactorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmissionFactorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmissionFactorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmissionFactor model
   */
  readonly fields: EmissionFactorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmissionFactor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmissionFactorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emissionProduct<T extends EmissionProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmissionProductDefaultArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmissionFactor model
   */
  interface EmissionFactorFieldRefs {
    readonly id: FieldRef<"EmissionFactor", 'String'>
    readonly emissionProductId: FieldRef<"EmissionFactor", 'String'>
    readonly region: FieldRef<"EmissionFactor", 'String'>
    readonly year: FieldRef<"EmissionFactor", 'Int'>
    readonly factorValue: FieldRef<"EmissionFactor", 'Float'>
    readonly createdAt: FieldRef<"EmissionFactor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmissionFactor findUnique
   */
  export type EmissionFactorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * Filter, which EmissionFactor to fetch.
     */
    where: EmissionFactorWhereUniqueInput
  }

  /**
   * EmissionFactor findUniqueOrThrow
   */
  export type EmissionFactorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * Filter, which EmissionFactor to fetch.
     */
    where: EmissionFactorWhereUniqueInput
  }

  /**
   * EmissionFactor findFirst
   */
  export type EmissionFactorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * Filter, which EmissionFactor to fetch.
     */
    where?: EmissionFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionFactors to fetch.
     */
    orderBy?: EmissionFactorOrderByWithRelationInput | EmissionFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmissionFactors.
     */
    cursor?: EmissionFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmissionFactors.
     */
    distinct?: EmissionFactorScalarFieldEnum | EmissionFactorScalarFieldEnum[]
  }

  /**
   * EmissionFactor findFirstOrThrow
   */
  export type EmissionFactorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * Filter, which EmissionFactor to fetch.
     */
    where?: EmissionFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionFactors to fetch.
     */
    orderBy?: EmissionFactorOrderByWithRelationInput | EmissionFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmissionFactors.
     */
    cursor?: EmissionFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmissionFactors.
     */
    distinct?: EmissionFactorScalarFieldEnum | EmissionFactorScalarFieldEnum[]
  }

  /**
   * EmissionFactor findMany
   */
  export type EmissionFactorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * Filter, which EmissionFactors to fetch.
     */
    where?: EmissionFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmissionFactors to fetch.
     */
    orderBy?: EmissionFactorOrderByWithRelationInput | EmissionFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmissionFactors.
     */
    cursor?: EmissionFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmissionFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmissionFactors.
     */
    skip?: number
    distinct?: EmissionFactorScalarFieldEnum | EmissionFactorScalarFieldEnum[]
  }

  /**
   * EmissionFactor create
   */
  export type EmissionFactorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * The data needed to create a EmissionFactor.
     */
    data: XOR<EmissionFactorCreateInput, EmissionFactorUncheckedCreateInput>
  }

  /**
   * EmissionFactor createMany
   */
  export type EmissionFactorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmissionFactors.
     */
    data: EmissionFactorCreateManyInput | EmissionFactorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmissionFactor createManyAndReturn
   */
  export type EmissionFactorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * The data used to create many EmissionFactors.
     */
    data: EmissionFactorCreateManyInput | EmissionFactorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmissionFactor update
   */
  export type EmissionFactorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * The data needed to update a EmissionFactor.
     */
    data: XOR<EmissionFactorUpdateInput, EmissionFactorUncheckedUpdateInput>
    /**
     * Choose, which EmissionFactor to update.
     */
    where: EmissionFactorWhereUniqueInput
  }

  /**
   * EmissionFactor updateMany
   */
  export type EmissionFactorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmissionFactors.
     */
    data: XOR<EmissionFactorUpdateManyMutationInput, EmissionFactorUncheckedUpdateManyInput>
    /**
     * Filter which EmissionFactors to update
     */
    where?: EmissionFactorWhereInput
    /**
     * Limit how many EmissionFactors to update.
     */
    limit?: number
  }

  /**
   * EmissionFactor updateManyAndReturn
   */
  export type EmissionFactorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * The data used to update EmissionFactors.
     */
    data: XOR<EmissionFactorUpdateManyMutationInput, EmissionFactorUncheckedUpdateManyInput>
    /**
     * Filter which EmissionFactors to update
     */
    where?: EmissionFactorWhereInput
    /**
     * Limit how many EmissionFactors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmissionFactor upsert
   */
  export type EmissionFactorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * The filter to search for the EmissionFactor to update in case it exists.
     */
    where: EmissionFactorWhereUniqueInput
    /**
     * In case the EmissionFactor found by the `where` argument doesn't exist, create a new EmissionFactor with this data.
     */
    create: XOR<EmissionFactorCreateInput, EmissionFactorUncheckedCreateInput>
    /**
     * In case the EmissionFactor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmissionFactorUpdateInput, EmissionFactorUncheckedUpdateInput>
  }

  /**
   * EmissionFactor delete
   */
  export type EmissionFactorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
    /**
     * Filter which EmissionFactor to delete.
     */
    where: EmissionFactorWhereUniqueInput
  }

  /**
   * EmissionFactor deleteMany
   */
  export type EmissionFactorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmissionFactors to delete
     */
    where?: EmissionFactorWhereInput
    /**
     * Limit how many EmissionFactors to delete.
     */
    limit?: number
  }

  /**
   * EmissionFactor without action
   */
  export type EmissionFactorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmissionFactor
     */
    select?: EmissionFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmissionFactor
     */
    omit?: EmissionFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionFactorInclude<ExtArgs> | null
  }


  /**
   * Model Emission
   */

  export type AggregateEmission = {
    _count: EmissionCountAggregateOutputType | null
    _avg: EmissionAvgAggregateOutputType | null
    _sum: EmissionSumAggregateOutputType | null
    _min: EmissionMinAggregateOutputType | null
    _max: EmissionMaxAggregateOutputType | null
  }

  export type EmissionAvgAggregateOutputType = {
    year: number | null
    quantity: number | null
    calculatedCo2e: number | null
  }

  export type EmissionSumAggregateOutputType = {
    year: number | null
    quantity: number | null
    calculatedCo2e: number | null
  }

  export type EmissionMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    emissionProductId: string | null
    year: number | null
    quantity: number | null
    calculatedCo2e: number | null
    registeredAt: Date | null
    createdAt: Date | null
    description: string | null
  }

  export type EmissionMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    emissionProductId: string | null
    year: number | null
    quantity: number | null
    calculatedCo2e: number | null
    registeredAt: Date | null
    createdAt: Date | null
    description: string | null
  }

  export type EmissionCountAggregateOutputType = {
    id: number
    companyId: number
    emissionProductId: number
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt: number
    createdAt: number
    description: number
    _all: number
  }


  export type EmissionAvgAggregateInputType = {
    year?: true
    quantity?: true
    calculatedCo2e?: true
  }

  export type EmissionSumAggregateInputType = {
    year?: true
    quantity?: true
    calculatedCo2e?: true
  }

  export type EmissionMinAggregateInputType = {
    id?: true
    companyId?: true
    emissionProductId?: true
    year?: true
    quantity?: true
    calculatedCo2e?: true
    registeredAt?: true
    createdAt?: true
    description?: true
  }

  export type EmissionMaxAggregateInputType = {
    id?: true
    companyId?: true
    emissionProductId?: true
    year?: true
    quantity?: true
    calculatedCo2e?: true
    registeredAt?: true
    createdAt?: true
    description?: true
  }

  export type EmissionCountAggregateInputType = {
    id?: true
    companyId?: true
    emissionProductId?: true
    year?: true
    quantity?: true
    calculatedCo2e?: true
    registeredAt?: true
    createdAt?: true
    description?: true
    _all?: true
  }

  export type EmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emission to aggregate.
     */
    where?: EmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emissions to fetch.
     */
    orderBy?: EmissionOrderByWithRelationInput | EmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emissions
    **/
    _count?: true | EmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmissionMaxAggregateInputType
  }

  export type GetEmissionAggregateType<T extends EmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateEmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmission[P]>
      : GetScalarType<T[P], AggregateEmission[P]>
  }




  export type EmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmissionWhereInput
    orderBy?: EmissionOrderByWithAggregationInput | EmissionOrderByWithAggregationInput[]
    by: EmissionScalarFieldEnum[] | EmissionScalarFieldEnum
    having?: EmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmissionCountAggregateInputType | true
    _avg?: EmissionAvgAggregateInputType
    _sum?: EmissionSumAggregateInputType
    _min?: EmissionMinAggregateInputType
    _max?: EmissionMaxAggregateInputType
  }

  export type EmissionGroupByOutputType = {
    id: string
    companyId: string
    emissionProductId: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt: Date | null
    createdAt: Date
    description: string | null
    _count: EmissionCountAggregateOutputType | null
    _avg: EmissionAvgAggregateOutputType | null
    _sum: EmissionSumAggregateOutputType | null
    _min: EmissionMinAggregateOutputType | null
    _max: EmissionMaxAggregateOutputType | null
  }

  type GetEmissionGroupByPayload<T extends EmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmissionGroupByOutputType[P]>
            : GetScalarType<T[P], EmissionGroupByOutputType[P]>
        }
      >
    >


  export type EmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    emissionProductId?: boolean
    year?: boolean
    quantity?: boolean
    calculatedCo2e?: boolean
    registeredAt?: boolean
    createdAt?: boolean
    description?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emission"]>

  export type EmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    emissionProductId?: boolean
    year?: boolean
    quantity?: boolean
    calculatedCo2e?: boolean
    registeredAt?: boolean
    createdAt?: boolean
    description?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emission"]>

  export type EmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    emissionProductId?: boolean
    year?: boolean
    quantity?: boolean
    calculatedCo2e?: boolean
    registeredAt?: boolean
    createdAt?: boolean
    description?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emission"]>

  export type EmissionSelectScalar = {
    id?: boolean
    companyId?: boolean
    emissionProductId?: boolean
    year?: boolean
    quantity?: boolean
    calculatedCo2e?: boolean
    registeredAt?: boolean
    createdAt?: boolean
    description?: boolean
  }

  export type EmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "emissionProductId" | "year" | "quantity" | "calculatedCo2e" | "registeredAt" | "createdAt" | "description", ExtArgs["result"]["emission"]>
  export type EmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }
  export type EmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }
  export type EmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    emissionProduct?: boolean | EmissionProductDefaultArgs<ExtArgs>
  }

  export type $EmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Emission"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      emissionProduct: Prisma.$EmissionProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      emissionProductId: string
      year: number
      quantity: number
      calculatedCo2e: number
      registeredAt: Date | null
      createdAt: Date
      description: string | null
    }, ExtArgs["result"]["emission"]>
    composites: {}
  }

  type EmissionGetPayload<S extends boolean | null | undefined | EmissionDefaultArgs> = $Result.GetResult<Prisma.$EmissionPayload, S>

  type EmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmissionCountAggregateInputType | true
    }

  export interface EmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Emission'], meta: { name: 'Emission' } }
    /**
     * Find zero or one Emission that matches the filter.
     * @param {EmissionFindUniqueArgs} args - Arguments to find a Emission
     * @example
     * // Get one Emission
     * const emission = await prisma.emission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmissionFindUniqueArgs>(args: SelectSubset<T, EmissionFindUniqueArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Emission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmissionFindUniqueOrThrowArgs} args - Arguments to find a Emission
     * @example
     * // Get one Emission
     * const emission = await prisma.emission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, EmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Emission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFindFirstArgs} args - Arguments to find a Emission
     * @example
     * // Get one Emission
     * const emission = await prisma.emission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmissionFindFirstArgs>(args?: SelectSubset<T, EmissionFindFirstArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Emission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFindFirstOrThrowArgs} args - Arguments to find a Emission
     * @example
     * // Get one Emission
     * const emission = await prisma.emission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, EmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Emissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emissions
     * const emissions = await prisma.emission.findMany()
     * 
     * // Get first 10 Emissions
     * const emissions = await prisma.emission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emissionWithIdOnly = await prisma.emission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmissionFindManyArgs>(args?: SelectSubset<T, EmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Emission.
     * @param {EmissionCreateArgs} args - Arguments to create a Emission.
     * @example
     * // Create one Emission
     * const Emission = await prisma.emission.create({
     *   data: {
     *     // ... data to create a Emission
     *   }
     * })
     * 
     */
    create<T extends EmissionCreateArgs>(args: SelectSubset<T, EmissionCreateArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Emissions.
     * @param {EmissionCreateManyArgs} args - Arguments to create many Emissions.
     * @example
     * // Create many Emissions
     * const emission = await prisma.emission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmissionCreateManyArgs>(args?: SelectSubset<T, EmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Emissions and returns the data saved in the database.
     * @param {EmissionCreateManyAndReturnArgs} args - Arguments to create many Emissions.
     * @example
     * // Create many Emissions
     * const emission = await prisma.emission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Emissions and only return the `id`
     * const emissionWithIdOnly = await prisma.emission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, EmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Emission.
     * @param {EmissionDeleteArgs} args - Arguments to delete one Emission.
     * @example
     * // Delete one Emission
     * const Emission = await prisma.emission.delete({
     *   where: {
     *     // ... filter to delete one Emission
     *   }
     * })
     * 
     */
    delete<T extends EmissionDeleteArgs>(args: SelectSubset<T, EmissionDeleteArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Emission.
     * @param {EmissionUpdateArgs} args - Arguments to update one Emission.
     * @example
     * // Update one Emission
     * const emission = await prisma.emission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmissionUpdateArgs>(args: SelectSubset<T, EmissionUpdateArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Emissions.
     * @param {EmissionDeleteManyArgs} args - Arguments to filter Emissions to delete.
     * @example
     * // Delete a few Emissions
     * const { count } = await prisma.emission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmissionDeleteManyArgs>(args?: SelectSubset<T, EmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emissions
     * const emission = await prisma.emission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmissionUpdateManyArgs>(args: SelectSubset<T, EmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emissions and returns the data updated in the database.
     * @param {EmissionUpdateManyAndReturnArgs} args - Arguments to update many Emissions.
     * @example
     * // Update many Emissions
     * const emission = await prisma.emission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Emissions and only return the `id`
     * const emissionWithIdOnly = await prisma.emission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, EmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Emission.
     * @param {EmissionUpsertArgs} args - Arguments to update or create a Emission.
     * @example
     * // Update or create a Emission
     * const emission = await prisma.emission.upsert({
     *   create: {
     *     // ... data to create a Emission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Emission we want to update
     *   }
     * })
     */
    upsert<T extends EmissionUpsertArgs>(args: SelectSubset<T, EmissionUpsertArgs<ExtArgs>>): Prisma__EmissionClient<$Result.GetResult<Prisma.$EmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Emissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionCountArgs} args - Arguments to filter Emissions to count.
     * @example
     * // Count the number of Emissions
     * const count = await prisma.emission.count({
     *   where: {
     *     // ... the filter for the Emissions we want to count
     *   }
     * })
    **/
    count<T extends EmissionCountArgs>(
      args?: Subset<T, EmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Emission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmissionAggregateArgs>(args: Subset<T, EmissionAggregateArgs>): Prisma.PrismaPromise<GetEmissionAggregateType<T>>

    /**
     * Group by Emission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmissionGroupByArgs['orderBy'] }
        : { orderBy?: EmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Emission model
   */
  readonly fields: EmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Emission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emissionProduct<T extends EmissionProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmissionProductDefaultArgs<ExtArgs>>): Prisma__EmissionProductClient<$Result.GetResult<Prisma.$EmissionProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Emission model
   */
  interface EmissionFieldRefs {
    readonly id: FieldRef<"Emission", 'String'>
    readonly companyId: FieldRef<"Emission", 'String'>
    readonly emissionProductId: FieldRef<"Emission", 'String'>
    readonly year: FieldRef<"Emission", 'Int'>
    readonly quantity: FieldRef<"Emission", 'Int'>
    readonly calculatedCo2e: FieldRef<"Emission", 'Float'>
    readonly registeredAt: FieldRef<"Emission", 'DateTime'>
    readonly createdAt: FieldRef<"Emission", 'DateTime'>
    readonly description: FieldRef<"Emission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Emission findUnique
   */
  export type EmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * Filter, which Emission to fetch.
     */
    where: EmissionWhereUniqueInput
  }

  /**
   * Emission findUniqueOrThrow
   */
  export type EmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * Filter, which Emission to fetch.
     */
    where: EmissionWhereUniqueInput
  }

  /**
   * Emission findFirst
   */
  export type EmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * Filter, which Emission to fetch.
     */
    where?: EmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emissions to fetch.
     */
    orderBy?: EmissionOrderByWithRelationInput | EmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emissions.
     */
    cursor?: EmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emissions.
     */
    distinct?: EmissionScalarFieldEnum | EmissionScalarFieldEnum[]
  }

  /**
   * Emission findFirstOrThrow
   */
  export type EmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * Filter, which Emission to fetch.
     */
    where?: EmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emissions to fetch.
     */
    orderBy?: EmissionOrderByWithRelationInput | EmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emissions.
     */
    cursor?: EmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emissions.
     */
    distinct?: EmissionScalarFieldEnum | EmissionScalarFieldEnum[]
  }

  /**
   * Emission findMany
   */
  export type EmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * Filter, which Emissions to fetch.
     */
    where?: EmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emissions to fetch.
     */
    orderBy?: EmissionOrderByWithRelationInput | EmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emissions.
     */
    cursor?: EmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emissions.
     */
    skip?: number
    distinct?: EmissionScalarFieldEnum | EmissionScalarFieldEnum[]
  }

  /**
   * Emission create
   */
  export type EmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Emission.
     */
    data: XOR<EmissionCreateInput, EmissionUncheckedCreateInput>
  }

  /**
   * Emission createMany
   */
  export type EmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Emissions.
     */
    data: EmissionCreateManyInput | EmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Emission createManyAndReturn
   */
  export type EmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Emissions.
     */
    data: EmissionCreateManyInput | EmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Emission update
   */
  export type EmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Emission.
     */
    data: XOR<EmissionUpdateInput, EmissionUncheckedUpdateInput>
    /**
     * Choose, which Emission to update.
     */
    where: EmissionWhereUniqueInput
  }

  /**
   * Emission updateMany
   */
  export type EmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Emissions.
     */
    data: XOR<EmissionUpdateManyMutationInput, EmissionUncheckedUpdateManyInput>
    /**
     * Filter which Emissions to update
     */
    where?: EmissionWhereInput
    /**
     * Limit how many Emissions to update.
     */
    limit?: number
  }

  /**
   * Emission updateManyAndReturn
   */
  export type EmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * The data used to update Emissions.
     */
    data: XOR<EmissionUpdateManyMutationInput, EmissionUncheckedUpdateManyInput>
    /**
     * Filter which Emissions to update
     */
    where?: EmissionWhereInput
    /**
     * Limit how many Emissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Emission upsert
   */
  export type EmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Emission to update in case it exists.
     */
    where: EmissionWhereUniqueInput
    /**
     * In case the Emission found by the `where` argument doesn't exist, create a new Emission with this data.
     */
    create: XOR<EmissionCreateInput, EmissionUncheckedCreateInput>
    /**
     * In case the Emission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmissionUpdateInput, EmissionUncheckedUpdateInput>
  }

  /**
   * Emission delete
   */
  export type EmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
    /**
     * Filter which Emission to delete.
     */
    where: EmissionWhereUniqueInput
  }

  /**
   * Emission deleteMany
   */
  export type EmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emissions to delete
     */
    where?: EmissionWhereInput
    /**
     * Limit how many Emissions to delete.
     */
    limit?: number
  }

  /**
   * Emission without action
   */
  export type EmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Emission
     */
    select?: EmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Emission
     */
    omit?: EmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    email: 'email'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const EmissionProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    unit: 'unit',
    scope: 'scope',
    createdAt: 'createdAt'
  };

  export type EmissionProductScalarFieldEnum = (typeof EmissionProductScalarFieldEnum)[keyof typeof EmissionProductScalarFieldEnum]


  export const EmissionFactorScalarFieldEnum: {
    id: 'id',
    emissionProductId: 'emissionProductId',
    region: 'region',
    year: 'year',
    factorValue: 'factorValue',
    createdAt: 'createdAt'
  };

  export type EmissionFactorScalarFieldEnum = (typeof EmissionFactorScalarFieldEnum)[keyof typeof EmissionFactorScalarFieldEnum]


  export const EmissionScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    emissionProductId: 'emissionProductId',
    year: 'year',
    quantity: 'quantity',
    calculatedCo2e: 'calculatedCo2e',
    registeredAt: 'registeredAt',
    createdAt: 'createdAt',
    description: 'description'
  };

  export type EmissionScalarFieldEnum = (typeof EmissionScalarFieldEnum)[keyof typeof EmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    email?: StringFilter<"Company"> | string
    emissions?: EmissionListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    emissions?: EmissionOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    emissions?: EmissionListRelationFilter
  }, "id" | "email">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    email?: StringWithAggregatesFilter<"Company"> | string
  }

  export type EmissionProductWhereInput = {
    AND?: EmissionProductWhereInput | EmissionProductWhereInput[]
    OR?: EmissionProductWhereInput[]
    NOT?: EmissionProductWhereInput | EmissionProductWhereInput[]
    id?: StringFilter<"EmissionProduct"> | string
    name?: StringFilter<"EmissionProduct"> | string
    unit?: StringFilter<"EmissionProduct"> | string
    scope?: StringNullableFilter<"EmissionProduct"> | string | null
    createdAt?: DateTimeFilter<"EmissionProduct"> | Date | string
    emissionFactors?: EmissionFactorListRelationFilter
    emissions?: EmissionListRelationFilter
  }

  export type EmissionProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    scope?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    emissionFactors?: EmissionFactorOrderByRelationAggregateInput
    emissions?: EmissionOrderByRelationAggregateInput
  }

  export type EmissionProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: EmissionProductWhereInput | EmissionProductWhereInput[]
    OR?: EmissionProductWhereInput[]
    NOT?: EmissionProductWhereInput | EmissionProductWhereInput[]
    unit?: StringFilter<"EmissionProduct"> | string
    scope?: StringNullableFilter<"EmissionProduct"> | string | null
    createdAt?: DateTimeFilter<"EmissionProduct"> | Date | string
    emissionFactors?: EmissionFactorListRelationFilter
    emissions?: EmissionListRelationFilter
  }, "id" | "name">

  export type EmissionProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    scope?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmissionProductCountOrderByAggregateInput
    _max?: EmissionProductMaxOrderByAggregateInput
    _min?: EmissionProductMinOrderByAggregateInput
  }

  export type EmissionProductScalarWhereWithAggregatesInput = {
    AND?: EmissionProductScalarWhereWithAggregatesInput | EmissionProductScalarWhereWithAggregatesInput[]
    OR?: EmissionProductScalarWhereWithAggregatesInput[]
    NOT?: EmissionProductScalarWhereWithAggregatesInput | EmissionProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmissionProduct"> | string
    name?: StringWithAggregatesFilter<"EmissionProduct"> | string
    unit?: StringWithAggregatesFilter<"EmissionProduct"> | string
    scope?: StringNullableWithAggregatesFilter<"EmissionProduct"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EmissionProduct"> | Date | string
  }

  export type EmissionFactorWhereInput = {
    AND?: EmissionFactorWhereInput | EmissionFactorWhereInput[]
    OR?: EmissionFactorWhereInput[]
    NOT?: EmissionFactorWhereInput | EmissionFactorWhereInput[]
    id?: StringFilter<"EmissionFactor"> | string
    emissionProductId?: StringFilter<"EmissionFactor"> | string
    region?: StringNullableFilter<"EmissionFactor"> | string | null
    year?: IntNullableFilter<"EmissionFactor"> | number | null
    factorValue?: FloatFilter<"EmissionFactor"> | number
    createdAt?: DateTimeFilter<"EmissionFactor"> | Date | string
    emissionProduct?: XOR<EmissionProductScalarRelationFilter, EmissionProductWhereInput>
  }

  export type EmissionFactorOrderByWithRelationInput = {
    id?: SortOrder
    emissionProductId?: SortOrder
    region?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    factorValue?: SortOrder
    createdAt?: SortOrder
    emissionProduct?: EmissionProductOrderByWithRelationInput
  }

  export type EmissionFactorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmissionFactorWhereInput | EmissionFactorWhereInput[]
    OR?: EmissionFactorWhereInput[]
    NOT?: EmissionFactorWhereInput | EmissionFactorWhereInput[]
    emissionProductId?: StringFilter<"EmissionFactor"> | string
    region?: StringNullableFilter<"EmissionFactor"> | string | null
    year?: IntNullableFilter<"EmissionFactor"> | number | null
    factorValue?: FloatFilter<"EmissionFactor"> | number
    createdAt?: DateTimeFilter<"EmissionFactor"> | Date | string
    emissionProduct?: XOR<EmissionProductScalarRelationFilter, EmissionProductWhereInput>
  }, "id">

  export type EmissionFactorOrderByWithAggregationInput = {
    id?: SortOrder
    emissionProductId?: SortOrder
    region?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    factorValue?: SortOrder
    createdAt?: SortOrder
    _count?: EmissionFactorCountOrderByAggregateInput
    _avg?: EmissionFactorAvgOrderByAggregateInput
    _max?: EmissionFactorMaxOrderByAggregateInput
    _min?: EmissionFactorMinOrderByAggregateInput
    _sum?: EmissionFactorSumOrderByAggregateInput
  }

  export type EmissionFactorScalarWhereWithAggregatesInput = {
    AND?: EmissionFactorScalarWhereWithAggregatesInput | EmissionFactorScalarWhereWithAggregatesInput[]
    OR?: EmissionFactorScalarWhereWithAggregatesInput[]
    NOT?: EmissionFactorScalarWhereWithAggregatesInput | EmissionFactorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmissionFactor"> | string
    emissionProductId?: StringWithAggregatesFilter<"EmissionFactor"> | string
    region?: StringNullableWithAggregatesFilter<"EmissionFactor"> | string | null
    year?: IntNullableWithAggregatesFilter<"EmissionFactor"> | number | null
    factorValue?: FloatWithAggregatesFilter<"EmissionFactor"> | number
    createdAt?: DateTimeWithAggregatesFilter<"EmissionFactor"> | Date | string
  }

  export type EmissionWhereInput = {
    AND?: EmissionWhereInput | EmissionWhereInput[]
    OR?: EmissionWhereInput[]
    NOT?: EmissionWhereInput | EmissionWhereInput[]
    id?: StringFilter<"Emission"> | string
    companyId?: StringFilter<"Emission"> | string
    emissionProductId?: StringFilter<"Emission"> | string
    year?: IntFilter<"Emission"> | number
    quantity?: IntFilter<"Emission"> | number
    calculatedCo2e?: FloatFilter<"Emission"> | number
    registeredAt?: DateTimeNullableFilter<"Emission"> | Date | string | null
    createdAt?: DateTimeFilter<"Emission"> | Date | string
    description?: StringNullableFilter<"Emission"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    emissionProduct?: XOR<EmissionProductScalarRelationFilter, EmissionProductWhereInput>
  }

  export type EmissionOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    emissionProductId?: SortOrder
    year?: SortOrder
    quantity?: SortOrder
    calculatedCo2e?: SortOrder
    registeredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    description?: SortOrderInput | SortOrder
    company?: CompanyOrderByWithRelationInput
    emissionProduct?: EmissionProductOrderByWithRelationInput
  }

  export type EmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_emissionProductId_year?: EmissionCompanyIdEmissionProductIdYearCompoundUniqueInput
    AND?: EmissionWhereInput | EmissionWhereInput[]
    OR?: EmissionWhereInput[]
    NOT?: EmissionWhereInput | EmissionWhereInput[]
    companyId?: StringFilter<"Emission"> | string
    emissionProductId?: StringFilter<"Emission"> | string
    year?: IntFilter<"Emission"> | number
    quantity?: IntFilter<"Emission"> | number
    calculatedCo2e?: FloatFilter<"Emission"> | number
    registeredAt?: DateTimeNullableFilter<"Emission"> | Date | string | null
    createdAt?: DateTimeFilter<"Emission"> | Date | string
    description?: StringNullableFilter<"Emission"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    emissionProduct?: XOR<EmissionProductScalarRelationFilter, EmissionProductWhereInput>
  }, "id" | "companyId_emissionProductId_year">

  export type EmissionOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    emissionProductId?: SortOrder
    year?: SortOrder
    quantity?: SortOrder
    calculatedCo2e?: SortOrder
    registeredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: EmissionCountOrderByAggregateInput
    _avg?: EmissionAvgOrderByAggregateInput
    _max?: EmissionMaxOrderByAggregateInput
    _min?: EmissionMinOrderByAggregateInput
    _sum?: EmissionSumOrderByAggregateInput
  }

  export type EmissionScalarWhereWithAggregatesInput = {
    AND?: EmissionScalarWhereWithAggregatesInput | EmissionScalarWhereWithAggregatesInput[]
    OR?: EmissionScalarWhereWithAggregatesInput[]
    NOT?: EmissionScalarWhereWithAggregatesInput | EmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Emission"> | string
    companyId?: StringWithAggregatesFilter<"Emission"> | string
    emissionProductId?: StringWithAggregatesFilter<"Emission"> | string
    year?: IntWithAggregatesFilter<"Emission"> | number
    quantity?: IntWithAggregatesFilter<"Emission"> | number
    calculatedCo2e?: FloatWithAggregatesFilter<"Emission"> | number
    registeredAt?: DateTimeNullableWithAggregatesFilter<"Emission"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Emission"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Emission"> | string | null
  }

  export type CompanyCreateInput = {
    id?: string
    email: string
    emissions?: EmissionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    email: string
    emissions?: EmissionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emissions?: EmissionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emissions?: EmissionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    email: string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type EmissionProductCreateInput = {
    id?: string
    name: string
    unit: string
    scope?: string | null
    createdAt?: Date | string
    emissionFactors?: EmissionFactorCreateNestedManyWithoutEmissionProductInput
    emissions?: EmissionCreateNestedManyWithoutEmissionProductInput
  }

  export type EmissionProductUncheckedCreateInput = {
    id?: string
    name: string
    unit: string
    scope?: string | null
    createdAt?: Date | string
    emissionFactors?: EmissionFactorUncheckedCreateNestedManyWithoutEmissionProductInput
    emissions?: EmissionUncheckedCreateNestedManyWithoutEmissionProductInput
  }

  export type EmissionProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emissionFactors?: EmissionFactorUpdateManyWithoutEmissionProductNestedInput
    emissions?: EmissionUpdateManyWithoutEmissionProductNestedInput
  }

  export type EmissionProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emissionFactors?: EmissionFactorUncheckedUpdateManyWithoutEmissionProductNestedInput
    emissions?: EmissionUncheckedUpdateManyWithoutEmissionProductNestedInput
  }

  export type EmissionProductCreateManyInput = {
    id?: string
    name: string
    unit: string
    scope?: string | null
    createdAt?: Date | string
  }

  export type EmissionProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionFactorCreateInput = {
    id?: string
    region?: string | null
    year?: number | null
    factorValue: number
    createdAt?: Date | string
    emissionProduct: EmissionProductCreateNestedOneWithoutEmissionFactorsInput
  }

  export type EmissionFactorUncheckedCreateInput = {
    id?: string
    emissionProductId: string
    region?: string | null
    year?: number | null
    factorValue: number
    createdAt?: Date | string
  }

  export type EmissionFactorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    factorValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emissionProduct?: EmissionProductUpdateOneRequiredWithoutEmissionFactorsNestedInput
  }

  export type EmissionFactorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emissionProductId?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    factorValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionFactorCreateManyInput = {
    id?: string
    emissionProductId: string
    region?: string | null
    year?: number | null
    factorValue: number
    createdAt?: Date | string
  }

  export type EmissionFactorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    factorValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionFactorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emissionProductId?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    factorValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionCreateInput = {
    id?: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
    company: CompanyCreateNestedOneWithoutEmissionsInput
    emissionProduct: EmissionProductCreateNestedOneWithoutEmissionsInput
  }

  export type EmissionUncheckedCreateInput = {
    id?: string
    companyId: string
    emissionProductId: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
  }

  export type EmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutEmissionsNestedInput
    emissionProduct?: EmissionProductUpdateOneRequiredWithoutEmissionsNestedInput
  }

  export type EmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    emissionProductId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmissionCreateManyInput = {
    id?: string
    companyId: string
    emissionProductId: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
  }

  export type EmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    emissionProductId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EmissionListRelationFilter = {
    every?: EmissionWhereInput
    some?: EmissionWhereInput
    none?: EmissionWhereInput
  }

  export type EmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmissionFactorListRelationFilter = {
    every?: EmissionFactorWhereInput
    some?: EmissionFactorWhereInput
    none?: EmissionFactorWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmissionFactorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmissionProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
  }

  export type EmissionProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
  }

  export type EmissionProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    scope?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EmissionProductScalarRelationFilter = {
    is?: EmissionProductWhereInput
    isNot?: EmissionProductWhereInput
  }

  export type EmissionFactorCountOrderByAggregateInput = {
    id?: SortOrder
    emissionProductId?: SortOrder
    region?: SortOrder
    year?: SortOrder
    factorValue?: SortOrder
    createdAt?: SortOrder
  }

  export type EmissionFactorAvgOrderByAggregateInput = {
    year?: SortOrder
    factorValue?: SortOrder
  }

  export type EmissionFactorMaxOrderByAggregateInput = {
    id?: SortOrder
    emissionProductId?: SortOrder
    region?: SortOrder
    year?: SortOrder
    factorValue?: SortOrder
    createdAt?: SortOrder
  }

  export type EmissionFactorMinOrderByAggregateInput = {
    id?: SortOrder
    emissionProductId?: SortOrder
    region?: SortOrder
    year?: SortOrder
    factorValue?: SortOrder
    createdAt?: SortOrder
  }

  export type EmissionFactorSumOrderByAggregateInput = {
    year?: SortOrder
    factorValue?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type EmissionCompanyIdEmissionProductIdYearCompoundUniqueInput = {
    companyId: string
    emissionProductId: string
    year: number
  }

  export type EmissionCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    emissionProductId?: SortOrder
    year?: SortOrder
    quantity?: SortOrder
    calculatedCo2e?: SortOrder
    registeredAt?: SortOrder
    createdAt?: SortOrder
    description?: SortOrder
  }

  export type EmissionAvgOrderByAggregateInput = {
    year?: SortOrder
    quantity?: SortOrder
    calculatedCo2e?: SortOrder
  }

  export type EmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    emissionProductId?: SortOrder
    year?: SortOrder
    quantity?: SortOrder
    calculatedCo2e?: SortOrder
    registeredAt?: SortOrder
    createdAt?: SortOrder
    description?: SortOrder
  }

  export type EmissionMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    emissionProductId?: SortOrder
    year?: SortOrder
    quantity?: SortOrder
    calculatedCo2e?: SortOrder
    registeredAt?: SortOrder
    createdAt?: SortOrder
    description?: SortOrder
  }

  export type EmissionSumOrderByAggregateInput = {
    year?: SortOrder
    quantity?: SortOrder
    calculatedCo2e?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EmissionCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmissionCreateWithoutCompanyInput, EmissionUncheckedCreateWithoutCompanyInput> | EmissionCreateWithoutCompanyInput[] | EmissionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutCompanyInput | EmissionCreateOrConnectWithoutCompanyInput[]
    createMany?: EmissionCreateManyCompanyInputEnvelope
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
  }

  export type EmissionUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmissionCreateWithoutCompanyInput, EmissionUncheckedCreateWithoutCompanyInput> | EmissionCreateWithoutCompanyInput[] | EmissionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutCompanyInput | EmissionCreateOrConnectWithoutCompanyInput[]
    createMany?: EmissionCreateManyCompanyInputEnvelope
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EmissionUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmissionCreateWithoutCompanyInput, EmissionUncheckedCreateWithoutCompanyInput> | EmissionCreateWithoutCompanyInput[] | EmissionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutCompanyInput | EmissionCreateOrConnectWithoutCompanyInput[]
    upsert?: EmissionUpsertWithWhereUniqueWithoutCompanyInput | EmissionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmissionCreateManyCompanyInputEnvelope
    set?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    disconnect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    delete?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    update?: EmissionUpdateWithWhereUniqueWithoutCompanyInput | EmissionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmissionUpdateManyWithWhereWithoutCompanyInput | EmissionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmissionScalarWhereInput | EmissionScalarWhereInput[]
  }

  export type EmissionUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmissionCreateWithoutCompanyInput, EmissionUncheckedCreateWithoutCompanyInput> | EmissionCreateWithoutCompanyInput[] | EmissionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutCompanyInput | EmissionCreateOrConnectWithoutCompanyInput[]
    upsert?: EmissionUpsertWithWhereUniqueWithoutCompanyInput | EmissionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmissionCreateManyCompanyInputEnvelope
    set?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    disconnect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    delete?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    update?: EmissionUpdateWithWhereUniqueWithoutCompanyInput | EmissionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmissionUpdateManyWithWhereWithoutCompanyInput | EmissionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmissionScalarWhereInput | EmissionScalarWhereInput[]
  }

  export type EmissionFactorCreateNestedManyWithoutEmissionProductInput = {
    create?: XOR<EmissionFactorCreateWithoutEmissionProductInput, EmissionFactorUncheckedCreateWithoutEmissionProductInput> | EmissionFactorCreateWithoutEmissionProductInput[] | EmissionFactorUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionFactorCreateOrConnectWithoutEmissionProductInput | EmissionFactorCreateOrConnectWithoutEmissionProductInput[]
    createMany?: EmissionFactorCreateManyEmissionProductInputEnvelope
    connect?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
  }

  export type EmissionCreateNestedManyWithoutEmissionProductInput = {
    create?: XOR<EmissionCreateWithoutEmissionProductInput, EmissionUncheckedCreateWithoutEmissionProductInput> | EmissionCreateWithoutEmissionProductInput[] | EmissionUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutEmissionProductInput | EmissionCreateOrConnectWithoutEmissionProductInput[]
    createMany?: EmissionCreateManyEmissionProductInputEnvelope
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
  }

  export type EmissionFactorUncheckedCreateNestedManyWithoutEmissionProductInput = {
    create?: XOR<EmissionFactorCreateWithoutEmissionProductInput, EmissionFactorUncheckedCreateWithoutEmissionProductInput> | EmissionFactorCreateWithoutEmissionProductInput[] | EmissionFactorUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionFactorCreateOrConnectWithoutEmissionProductInput | EmissionFactorCreateOrConnectWithoutEmissionProductInput[]
    createMany?: EmissionFactorCreateManyEmissionProductInputEnvelope
    connect?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
  }

  export type EmissionUncheckedCreateNestedManyWithoutEmissionProductInput = {
    create?: XOR<EmissionCreateWithoutEmissionProductInput, EmissionUncheckedCreateWithoutEmissionProductInput> | EmissionCreateWithoutEmissionProductInput[] | EmissionUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutEmissionProductInput | EmissionCreateOrConnectWithoutEmissionProductInput[]
    createMany?: EmissionCreateManyEmissionProductInputEnvelope
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmissionFactorUpdateManyWithoutEmissionProductNestedInput = {
    create?: XOR<EmissionFactorCreateWithoutEmissionProductInput, EmissionFactorUncheckedCreateWithoutEmissionProductInput> | EmissionFactorCreateWithoutEmissionProductInput[] | EmissionFactorUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionFactorCreateOrConnectWithoutEmissionProductInput | EmissionFactorCreateOrConnectWithoutEmissionProductInput[]
    upsert?: EmissionFactorUpsertWithWhereUniqueWithoutEmissionProductInput | EmissionFactorUpsertWithWhereUniqueWithoutEmissionProductInput[]
    createMany?: EmissionFactorCreateManyEmissionProductInputEnvelope
    set?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    disconnect?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    delete?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    connect?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    update?: EmissionFactorUpdateWithWhereUniqueWithoutEmissionProductInput | EmissionFactorUpdateWithWhereUniqueWithoutEmissionProductInput[]
    updateMany?: EmissionFactorUpdateManyWithWhereWithoutEmissionProductInput | EmissionFactorUpdateManyWithWhereWithoutEmissionProductInput[]
    deleteMany?: EmissionFactorScalarWhereInput | EmissionFactorScalarWhereInput[]
  }

  export type EmissionUpdateManyWithoutEmissionProductNestedInput = {
    create?: XOR<EmissionCreateWithoutEmissionProductInput, EmissionUncheckedCreateWithoutEmissionProductInput> | EmissionCreateWithoutEmissionProductInput[] | EmissionUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutEmissionProductInput | EmissionCreateOrConnectWithoutEmissionProductInput[]
    upsert?: EmissionUpsertWithWhereUniqueWithoutEmissionProductInput | EmissionUpsertWithWhereUniqueWithoutEmissionProductInput[]
    createMany?: EmissionCreateManyEmissionProductInputEnvelope
    set?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    disconnect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    delete?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    update?: EmissionUpdateWithWhereUniqueWithoutEmissionProductInput | EmissionUpdateWithWhereUniqueWithoutEmissionProductInput[]
    updateMany?: EmissionUpdateManyWithWhereWithoutEmissionProductInput | EmissionUpdateManyWithWhereWithoutEmissionProductInput[]
    deleteMany?: EmissionScalarWhereInput | EmissionScalarWhereInput[]
  }

  export type EmissionFactorUncheckedUpdateManyWithoutEmissionProductNestedInput = {
    create?: XOR<EmissionFactorCreateWithoutEmissionProductInput, EmissionFactorUncheckedCreateWithoutEmissionProductInput> | EmissionFactorCreateWithoutEmissionProductInput[] | EmissionFactorUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionFactorCreateOrConnectWithoutEmissionProductInput | EmissionFactorCreateOrConnectWithoutEmissionProductInput[]
    upsert?: EmissionFactorUpsertWithWhereUniqueWithoutEmissionProductInput | EmissionFactorUpsertWithWhereUniqueWithoutEmissionProductInput[]
    createMany?: EmissionFactorCreateManyEmissionProductInputEnvelope
    set?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    disconnect?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    delete?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    connect?: EmissionFactorWhereUniqueInput | EmissionFactorWhereUniqueInput[]
    update?: EmissionFactorUpdateWithWhereUniqueWithoutEmissionProductInput | EmissionFactorUpdateWithWhereUniqueWithoutEmissionProductInput[]
    updateMany?: EmissionFactorUpdateManyWithWhereWithoutEmissionProductInput | EmissionFactorUpdateManyWithWhereWithoutEmissionProductInput[]
    deleteMany?: EmissionFactorScalarWhereInput | EmissionFactorScalarWhereInput[]
  }

  export type EmissionUncheckedUpdateManyWithoutEmissionProductNestedInput = {
    create?: XOR<EmissionCreateWithoutEmissionProductInput, EmissionUncheckedCreateWithoutEmissionProductInput> | EmissionCreateWithoutEmissionProductInput[] | EmissionUncheckedCreateWithoutEmissionProductInput[]
    connectOrCreate?: EmissionCreateOrConnectWithoutEmissionProductInput | EmissionCreateOrConnectWithoutEmissionProductInput[]
    upsert?: EmissionUpsertWithWhereUniqueWithoutEmissionProductInput | EmissionUpsertWithWhereUniqueWithoutEmissionProductInput[]
    createMany?: EmissionCreateManyEmissionProductInputEnvelope
    set?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    disconnect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    delete?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    connect?: EmissionWhereUniqueInput | EmissionWhereUniqueInput[]
    update?: EmissionUpdateWithWhereUniqueWithoutEmissionProductInput | EmissionUpdateWithWhereUniqueWithoutEmissionProductInput[]
    updateMany?: EmissionUpdateManyWithWhereWithoutEmissionProductInput | EmissionUpdateManyWithWhereWithoutEmissionProductInput[]
    deleteMany?: EmissionScalarWhereInput | EmissionScalarWhereInput[]
  }

  export type EmissionProductCreateNestedOneWithoutEmissionFactorsInput = {
    create?: XOR<EmissionProductCreateWithoutEmissionFactorsInput, EmissionProductUncheckedCreateWithoutEmissionFactorsInput>
    connectOrCreate?: EmissionProductCreateOrConnectWithoutEmissionFactorsInput
    connect?: EmissionProductWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmissionProductUpdateOneRequiredWithoutEmissionFactorsNestedInput = {
    create?: XOR<EmissionProductCreateWithoutEmissionFactorsInput, EmissionProductUncheckedCreateWithoutEmissionFactorsInput>
    connectOrCreate?: EmissionProductCreateOrConnectWithoutEmissionFactorsInput
    upsert?: EmissionProductUpsertWithoutEmissionFactorsInput
    connect?: EmissionProductWhereUniqueInput
    update?: XOR<XOR<EmissionProductUpdateToOneWithWhereWithoutEmissionFactorsInput, EmissionProductUpdateWithoutEmissionFactorsInput>, EmissionProductUncheckedUpdateWithoutEmissionFactorsInput>
  }

  export type CompanyCreateNestedOneWithoutEmissionsInput = {
    create?: XOR<CompanyCreateWithoutEmissionsInput, CompanyUncheckedCreateWithoutEmissionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmissionsInput
    connect?: CompanyWhereUniqueInput
  }

  export type EmissionProductCreateNestedOneWithoutEmissionsInput = {
    create?: XOR<EmissionProductCreateWithoutEmissionsInput, EmissionProductUncheckedCreateWithoutEmissionsInput>
    connectOrCreate?: EmissionProductCreateOrConnectWithoutEmissionsInput
    connect?: EmissionProductWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CompanyUpdateOneRequiredWithoutEmissionsNestedInput = {
    create?: XOR<CompanyCreateWithoutEmissionsInput, CompanyUncheckedCreateWithoutEmissionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmissionsInput
    upsert?: CompanyUpsertWithoutEmissionsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutEmissionsInput, CompanyUpdateWithoutEmissionsInput>, CompanyUncheckedUpdateWithoutEmissionsInput>
  }

  export type EmissionProductUpdateOneRequiredWithoutEmissionsNestedInput = {
    create?: XOR<EmissionProductCreateWithoutEmissionsInput, EmissionProductUncheckedCreateWithoutEmissionsInput>
    connectOrCreate?: EmissionProductCreateOrConnectWithoutEmissionsInput
    upsert?: EmissionProductUpsertWithoutEmissionsInput
    connect?: EmissionProductWhereUniqueInput
    update?: XOR<XOR<EmissionProductUpdateToOneWithWhereWithoutEmissionsInput, EmissionProductUpdateWithoutEmissionsInput>, EmissionProductUncheckedUpdateWithoutEmissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EmissionCreateWithoutCompanyInput = {
    id?: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
    emissionProduct: EmissionProductCreateNestedOneWithoutEmissionsInput
  }

  export type EmissionUncheckedCreateWithoutCompanyInput = {
    id?: string
    emissionProductId: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
  }

  export type EmissionCreateOrConnectWithoutCompanyInput = {
    where: EmissionWhereUniqueInput
    create: XOR<EmissionCreateWithoutCompanyInput, EmissionUncheckedCreateWithoutCompanyInput>
  }

  export type EmissionCreateManyCompanyInputEnvelope = {
    data: EmissionCreateManyCompanyInput | EmissionCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type EmissionUpsertWithWhereUniqueWithoutCompanyInput = {
    where: EmissionWhereUniqueInput
    update: XOR<EmissionUpdateWithoutCompanyInput, EmissionUncheckedUpdateWithoutCompanyInput>
    create: XOR<EmissionCreateWithoutCompanyInput, EmissionUncheckedCreateWithoutCompanyInput>
  }

  export type EmissionUpdateWithWhereUniqueWithoutCompanyInput = {
    where: EmissionWhereUniqueInput
    data: XOR<EmissionUpdateWithoutCompanyInput, EmissionUncheckedUpdateWithoutCompanyInput>
  }

  export type EmissionUpdateManyWithWhereWithoutCompanyInput = {
    where: EmissionScalarWhereInput
    data: XOR<EmissionUpdateManyMutationInput, EmissionUncheckedUpdateManyWithoutCompanyInput>
  }

  export type EmissionScalarWhereInput = {
    AND?: EmissionScalarWhereInput | EmissionScalarWhereInput[]
    OR?: EmissionScalarWhereInput[]
    NOT?: EmissionScalarWhereInput | EmissionScalarWhereInput[]
    id?: StringFilter<"Emission"> | string
    companyId?: StringFilter<"Emission"> | string
    emissionProductId?: StringFilter<"Emission"> | string
    year?: IntFilter<"Emission"> | number
    quantity?: IntFilter<"Emission"> | number
    calculatedCo2e?: FloatFilter<"Emission"> | number
    registeredAt?: DateTimeNullableFilter<"Emission"> | Date | string | null
    createdAt?: DateTimeFilter<"Emission"> | Date | string
    description?: StringNullableFilter<"Emission"> | string | null
  }

  export type EmissionFactorCreateWithoutEmissionProductInput = {
    id?: string
    region?: string | null
    year?: number | null
    factorValue: number
    createdAt?: Date | string
  }

  export type EmissionFactorUncheckedCreateWithoutEmissionProductInput = {
    id?: string
    region?: string | null
    year?: number | null
    factorValue: number
    createdAt?: Date | string
  }

  export type EmissionFactorCreateOrConnectWithoutEmissionProductInput = {
    where: EmissionFactorWhereUniqueInput
    create: XOR<EmissionFactorCreateWithoutEmissionProductInput, EmissionFactorUncheckedCreateWithoutEmissionProductInput>
  }

  export type EmissionFactorCreateManyEmissionProductInputEnvelope = {
    data: EmissionFactorCreateManyEmissionProductInput | EmissionFactorCreateManyEmissionProductInput[]
    skipDuplicates?: boolean
  }

  export type EmissionCreateWithoutEmissionProductInput = {
    id?: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
    company: CompanyCreateNestedOneWithoutEmissionsInput
  }

  export type EmissionUncheckedCreateWithoutEmissionProductInput = {
    id?: string
    companyId: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
  }

  export type EmissionCreateOrConnectWithoutEmissionProductInput = {
    where: EmissionWhereUniqueInput
    create: XOR<EmissionCreateWithoutEmissionProductInput, EmissionUncheckedCreateWithoutEmissionProductInput>
  }

  export type EmissionCreateManyEmissionProductInputEnvelope = {
    data: EmissionCreateManyEmissionProductInput | EmissionCreateManyEmissionProductInput[]
    skipDuplicates?: boolean
  }

  export type EmissionFactorUpsertWithWhereUniqueWithoutEmissionProductInput = {
    where: EmissionFactorWhereUniqueInput
    update: XOR<EmissionFactorUpdateWithoutEmissionProductInput, EmissionFactorUncheckedUpdateWithoutEmissionProductInput>
    create: XOR<EmissionFactorCreateWithoutEmissionProductInput, EmissionFactorUncheckedCreateWithoutEmissionProductInput>
  }

  export type EmissionFactorUpdateWithWhereUniqueWithoutEmissionProductInput = {
    where: EmissionFactorWhereUniqueInput
    data: XOR<EmissionFactorUpdateWithoutEmissionProductInput, EmissionFactorUncheckedUpdateWithoutEmissionProductInput>
  }

  export type EmissionFactorUpdateManyWithWhereWithoutEmissionProductInput = {
    where: EmissionFactorScalarWhereInput
    data: XOR<EmissionFactorUpdateManyMutationInput, EmissionFactorUncheckedUpdateManyWithoutEmissionProductInput>
  }

  export type EmissionFactorScalarWhereInput = {
    AND?: EmissionFactorScalarWhereInput | EmissionFactorScalarWhereInput[]
    OR?: EmissionFactorScalarWhereInput[]
    NOT?: EmissionFactorScalarWhereInput | EmissionFactorScalarWhereInput[]
    id?: StringFilter<"EmissionFactor"> | string
    emissionProductId?: StringFilter<"EmissionFactor"> | string
    region?: StringNullableFilter<"EmissionFactor"> | string | null
    year?: IntNullableFilter<"EmissionFactor"> | number | null
    factorValue?: FloatFilter<"EmissionFactor"> | number
    createdAt?: DateTimeFilter<"EmissionFactor"> | Date | string
  }

  export type EmissionUpsertWithWhereUniqueWithoutEmissionProductInput = {
    where: EmissionWhereUniqueInput
    update: XOR<EmissionUpdateWithoutEmissionProductInput, EmissionUncheckedUpdateWithoutEmissionProductInput>
    create: XOR<EmissionCreateWithoutEmissionProductInput, EmissionUncheckedCreateWithoutEmissionProductInput>
  }

  export type EmissionUpdateWithWhereUniqueWithoutEmissionProductInput = {
    where: EmissionWhereUniqueInput
    data: XOR<EmissionUpdateWithoutEmissionProductInput, EmissionUncheckedUpdateWithoutEmissionProductInput>
  }

  export type EmissionUpdateManyWithWhereWithoutEmissionProductInput = {
    where: EmissionScalarWhereInput
    data: XOR<EmissionUpdateManyMutationInput, EmissionUncheckedUpdateManyWithoutEmissionProductInput>
  }

  export type EmissionProductCreateWithoutEmissionFactorsInput = {
    id?: string
    name: string
    unit: string
    scope?: string | null
    createdAt?: Date | string
    emissions?: EmissionCreateNestedManyWithoutEmissionProductInput
  }

  export type EmissionProductUncheckedCreateWithoutEmissionFactorsInput = {
    id?: string
    name: string
    unit: string
    scope?: string | null
    createdAt?: Date | string
    emissions?: EmissionUncheckedCreateNestedManyWithoutEmissionProductInput
  }

  export type EmissionProductCreateOrConnectWithoutEmissionFactorsInput = {
    where: EmissionProductWhereUniqueInput
    create: XOR<EmissionProductCreateWithoutEmissionFactorsInput, EmissionProductUncheckedCreateWithoutEmissionFactorsInput>
  }

  export type EmissionProductUpsertWithoutEmissionFactorsInput = {
    update: XOR<EmissionProductUpdateWithoutEmissionFactorsInput, EmissionProductUncheckedUpdateWithoutEmissionFactorsInput>
    create: XOR<EmissionProductCreateWithoutEmissionFactorsInput, EmissionProductUncheckedCreateWithoutEmissionFactorsInput>
    where?: EmissionProductWhereInput
  }

  export type EmissionProductUpdateToOneWithWhereWithoutEmissionFactorsInput = {
    where?: EmissionProductWhereInput
    data: XOR<EmissionProductUpdateWithoutEmissionFactorsInput, EmissionProductUncheckedUpdateWithoutEmissionFactorsInput>
  }

  export type EmissionProductUpdateWithoutEmissionFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emissions?: EmissionUpdateManyWithoutEmissionProductNestedInput
  }

  export type EmissionProductUncheckedUpdateWithoutEmissionFactorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emissions?: EmissionUncheckedUpdateManyWithoutEmissionProductNestedInput
  }

  export type CompanyCreateWithoutEmissionsInput = {
    id?: string
    email: string
  }

  export type CompanyUncheckedCreateWithoutEmissionsInput = {
    id?: string
    email: string
  }

  export type CompanyCreateOrConnectWithoutEmissionsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutEmissionsInput, CompanyUncheckedCreateWithoutEmissionsInput>
  }

  export type EmissionProductCreateWithoutEmissionsInput = {
    id?: string
    name: string
    unit: string
    scope?: string | null
    createdAt?: Date | string
    emissionFactors?: EmissionFactorCreateNestedManyWithoutEmissionProductInput
  }

  export type EmissionProductUncheckedCreateWithoutEmissionsInput = {
    id?: string
    name: string
    unit: string
    scope?: string | null
    createdAt?: Date | string
    emissionFactors?: EmissionFactorUncheckedCreateNestedManyWithoutEmissionProductInput
  }

  export type EmissionProductCreateOrConnectWithoutEmissionsInput = {
    where: EmissionProductWhereUniqueInput
    create: XOR<EmissionProductCreateWithoutEmissionsInput, EmissionProductUncheckedCreateWithoutEmissionsInput>
  }

  export type CompanyUpsertWithoutEmissionsInput = {
    update: XOR<CompanyUpdateWithoutEmissionsInput, CompanyUncheckedUpdateWithoutEmissionsInput>
    create: XOR<CompanyCreateWithoutEmissionsInput, CompanyUncheckedCreateWithoutEmissionsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutEmissionsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutEmissionsInput, CompanyUncheckedUpdateWithoutEmissionsInput>
  }

  export type CompanyUpdateWithoutEmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyUncheckedUpdateWithoutEmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type EmissionProductUpsertWithoutEmissionsInput = {
    update: XOR<EmissionProductUpdateWithoutEmissionsInput, EmissionProductUncheckedUpdateWithoutEmissionsInput>
    create: XOR<EmissionProductCreateWithoutEmissionsInput, EmissionProductUncheckedCreateWithoutEmissionsInput>
    where?: EmissionProductWhereInput
  }

  export type EmissionProductUpdateToOneWithWhereWithoutEmissionsInput = {
    where?: EmissionProductWhereInput
    data: XOR<EmissionProductUpdateWithoutEmissionsInput, EmissionProductUncheckedUpdateWithoutEmissionsInput>
  }

  export type EmissionProductUpdateWithoutEmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emissionFactors?: EmissionFactorUpdateManyWithoutEmissionProductNestedInput
  }

  export type EmissionProductUncheckedUpdateWithoutEmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emissionFactors?: EmissionFactorUncheckedUpdateManyWithoutEmissionProductNestedInput
  }

  export type EmissionCreateManyCompanyInput = {
    id?: string
    emissionProductId: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
  }

  export type EmissionUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emissionProduct?: EmissionProductUpdateOneRequiredWithoutEmissionsNestedInput
  }

  export type EmissionUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emissionProductId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmissionUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emissionProductId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmissionFactorCreateManyEmissionProductInput = {
    id?: string
    region?: string | null
    year?: number | null
    factorValue: number
    createdAt?: Date | string
  }

  export type EmissionCreateManyEmissionProductInput = {
    id?: string
    companyId: string
    year: number
    quantity: number
    calculatedCo2e: number
    registeredAt?: Date | string | null
    createdAt?: Date | string
    description?: string | null
  }

  export type EmissionFactorUpdateWithoutEmissionProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    factorValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionFactorUncheckedUpdateWithoutEmissionProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    factorValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionFactorUncheckedUpdateManyWithoutEmissionProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    factorValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmissionUpdateWithoutEmissionProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutEmissionsNestedInput
  }

  export type EmissionUncheckedUpdateWithoutEmissionProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmissionUncheckedUpdateManyWithoutEmissionProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    calculatedCo2e?: FloatFieldUpdateOperationsInput | number
    registeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}