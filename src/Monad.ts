/**
 * Utility functions to accommodate `fp-ts/Monad`.
 *
 * @since 0.15.0
 */

import {
  HKT,
  Kind,
  Kind2,
  Kind3,
  Kind4,
  URIS,
  URIS2,
  URIS3,
  URIS4,
} from "fp-ts/HKT"
import {
  Monad,
  Monad1,
  Monad2,
  Monad2C,
  Monad3,
  Monad3C,
  Monad4,
} from "fp-ts/Monad"

/**
 * Monadic if/then/else. Only executes the relevant action.
 *
 * @example
 * import { pipe } from 'fp-ts/function';
 * import { ifM } from 'fp-ts-std/Monad';
 * import * as IO from 'fp-ts/IO';
 * import { execute } from 'fp-ts-std/IO';
 *
 * const f =
 *   ifM(IO.Monad)(IO.of(true))
 *     (IO.of('foo'))(IO.of('bar'));
 *
 * assert.strictEqual(execute(f), 'foo');
 *
 * @since 0.15.0
 */
export function ifM<M extends URIS4>(
  M: Monad4<M>,
): <S, R, E>(
  p: Kind4<M, S, R, E, boolean>,
) => <A>(
  x: Kind4<M, S, R, E, A>,
) => (y: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function ifM<M extends URIS3>(
  M: Monad3<M>,
): <R, E>(
  p: Kind3<M, R, E, boolean>,
) => <A>(x: Kind3<M, R, E, A>) => (y: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function ifM<M extends URIS3, E>(
  M: Monad3C<M, E>,
): <R>(
  p: Kind3<M, R, E, boolean>,
) => <A>(x: Kind3<M, R, E, A>) => (y: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function ifM<M extends URIS2>(
  M: Monad2<M>,
): <E>(
  p: Kind2<M, E, boolean>,
) => <A>(x: Kind2<M, E, A>) => (y: Kind2<M, E, A>) => Kind2<M, E, A>
export function ifM<M extends URIS2, E>(
  M: Monad2C<M, E>,
): (
  p: Kind2<M, E, boolean>,
) => <A>(x: Kind2<M, E, A>) => (y: Kind2<M, E, A>) => Kind2<M, E, A>
export function ifM<M extends URIS>(
  M: Monad1<M>,
): (p: Kind<M, boolean>) => <A>(x: Kind<M, A>) => (y: Kind<M, A>) => Kind<M, A>
export function ifM<M>(
  M: Monad<M>,
): (p: HKT<M, boolean>) => <A>(x: HKT<M, A>) => (y: HKT<M, A>) => HKT<M, A> {
  return p => x => y => M.chain(p, b => (b ? x : y))
}
