import add from 'ramda/src/add';
import addIndex from 'ramda/src/addIndex';
import adjust from 'ramda/src/adjust';
import all from 'ramda/src/all';
// import allPass from 'ramda/src/allPass';
import always from 'ramda/src/always';
import and from 'ramda/src/and';
import andThen from 'ramda/src/andThen';
import any from 'ramda/src/any';
// import anyPass from 'ramda/src/anyPass';
import ap from 'ramda/src/ap';
import aperture from 'ramda/src/aperture';
import append from 'ramda/src/append';
import apply from 'ramda/src/apply';
import applySpec from 'ramda/src/applySpec';
import applyTo from 'ramda/src/applyTo';
import ascend from 'ramda/src/ascend';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import binary from 'ramda/src/binary';
import bind from 'ramda/src/bind';
import both from 'ramda/src/both';
import call from 'ramda/src/call';
import chain from 'ramda/src/chain';
import clamp from 'ramda/src/clamp';
import clone from 'ramda/src/clone';
import comparator from 'ramda/src/comparator';
import complement from 'ramda/src/complement';
import compose from 'ramda/src/compose';
import composeWith from 'ramda/src/composeWith';
import concat from 'ramda/src/concat';
// import cond from 'ramda/src/cond';
import construct from 'ramda/src/construct';
import constructN from 'ramda/src/constructN';
import converge from 'ramda/src/converge';
import countBy from 'ramda/src/countBy';
import curry from 'ramda/src/curry';
import curryN from 'ramda/src/curryN';
import dec from 'ramda/src/dec';
import defaultTo from 'ramda/src/defaultTo';
import descend from 'ramda/src/descend';
import difference from 'ramda/src/difference';
import differenceWith from 'ramda/src/differenceWith';
import dissoc from 'ramda/src/dissoc';
import dissocPath from 'ramda/src/dissocPath';
import divide from 'ramda/src/divide';
import drop from 'ramda/src/drop';
import dropLast from 'ramda/src/dropLast';
import dropLastWhile from 'ramda/src/dropLastWhile';
import dropRepeats from 'ramda/src/dropRepeats';
import dropRepeatsWith from 'ramda/src/dropRepeatsWith';
import dropWhile from 'ramda/src/dropWhile';
import either from 'ramda/src/either';
import empty from 'ramda/src/empty';
import endsWith from 'ramda/src/endsWith';
import eqBy from 'ramda/src/eqBy';
import eqProps from 'ramda/src/eqProps';
import equals from 'ramda/src/equals';
import evolve from 'ramda/src/evolve';
import filter from 'ramda/src/filter';
import find from 'ramda/src/find';
import findIndex from 'ramda/src/findIndex';
import findLast from 'ramda/src/findLast';
import findLastIndex from 'ramda/src/findLastIndex';
import flatten from 'ramda/src/flatten';
import flip from 'ramda/src/flip';
import forEach from 'ramda/src/forEach';
import forEachObjIndexed from 'ramda/src/forEachObjIndexed';
import fromPairs from 'ramda/src/fromPairs';
import groupBy from 'ramda/src/groupBy';
import groupWith from 'ramda/src/groupWith';
// import gt from 'ramda/src/gt';
// import gte from 'ramda/src/gte';
import has from 'ramda/src/has';
import hasIn from 'ramda/src/hasIn';
import hasPath from 'ramda/src/hasPath';
import head from 'ramda/src/head';
import identical from 'ramda/src/identical';
import identity from 'ramda/src/identity';
import ifElse from 'ramda/src/ifElse';
import inc from 'ramda/src/inc';
import includes from 'ramda/src/includes';
import index from 'ramda/src/index';
import indexBy from 'ramda/src/indexBy';
import indexOf from 'ramda/src/indexOf';
import init from 'ramda/src/init';
import innerJoin from 'ramda/src/innerJoin';
import insert from 'ramda/src/insert';
import insertAll from 'ramda/src/insertAll';
import intersection from 'ramda/src/intersection';
import intersperse from 'ramda/src/intersperse';
import into from 'ramda/src/into';
import invert from 'ramda/src/invert';
import invertObj from 'ramda/src/invertObj';
import invoker from 'ramda/src/invoker';
import is from 'ramda/src/is';
// import isEmpty from 'ramda/src/isEmpty';
// import isNil from 'ramda/src/isNil';
import join from 'ramda/src/join';
import juxt from 'ramda/src/juxt';
import keys from 'ramda/src/keys';
import keysIn from 'ramda/src/keysIn';
import last from 'ramda/src/last';
import lastIndexOf from 'ramda/src/lastIndexOf';
// import length from 'ramda/src/length';
import lens from 'ramda/src/lens';
import lensIndex from 'ramda/src/lensIndex';
import lensPath from 'ramda/src/lensPath';
import lensProp from 'ramda/src/lensProp';
import lift from 'ramda/src/lift';
import liftN from 'ramda/src/liftN';
// import lt from 'ramda/src/lt';
// import lte from 'ramda/src/lte';
import map from 'ramda/src/map';
import mapAccum from 'ramda/src/mapAccum';
import mapAccumRight from 'ramda/src/mapAccumRight';
import mapObjIndexed from 'ramda/src/mapObjIndexed';
// import match from 'ramda/src/match';
import mathMod from 'ramda/src/mathMod';
import max from 'ramda/src/max';
import maxBy from 'ramda/src/maxBy';
import mean from 'ramda/src/mean';
import median from 'ramda/src/median';
import memoizeWith from 'ramda/src/memoizeWith';
import mergeAll from 'ramda/src/mergeAll';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import mergeDeepWith from 'ramda/src/mergeDeepWith';
import mergeDeepWithKey from 'ramda/src/mergeDeepWithKey';
import mergeLeft from 'ramda/src/mergeLeft';
import mergeRight from 'ramda/src/mergeRight';
import mergeWith from 'ramda/src/mergeWith';
import mergeWithKey from 'ramda/src/mergeWithKey';
import min from 'ramda/src/min';
import minBy from 'ramda/src/minBy';
import modulo from 'ramda/src/modulo';
import move from 'ramda/src/move';
import multiply from 'ramda/src/multiply';
import nAry from 'ramda/src/nAry';
import negate from 'ramda/src/negate';
import none from 'ramda/src/none';
import not from 'ramda/src/not';
import nth from 'ramda/src/nth';
import nthArg from 'ramda/src/nthArg';
import o from 'ramda/src/o';
import objOf from 'ramda/src/objOf';
import of from 'ramda/src/of';
import omit from 'ramda/src/omit';
import once from 'ramda/src/once';
import or from 'ramda/src/or';
import otherwise from 'ramda/src/otherwise';
import over from 'ramda/src/over';
import pair from 'ramda/src/pair';
import partial from 'ramda/src/partial';
import partialRight from 'ramda/src/partialRight';
import partition from 'ramda/src/partition';
import path from 'ramda/src/path';
import pathEq from 'ramda/src/pathEq';
import pathOr from 'ramda/src/pathOr';
import pathSatisfies from 'ramda/src/pathSatisfies';
import paths from 'ramda/src/paths';
import pick from 'ramda/src/pick';
import pickAll from 'ramda/src/pickAll';
import pickBy from 'ramda/src/pickBy';
import pipe from 'ramda/src/pipe';
import pipeWith from 'ramda/src/pipeWith';
import pluck from 'ramda/src/pluck';
import prepend from 'ramda/src/prepend';
import product from 'ramda/src/product';
import project from 'ramda/src/project';
import prop from 'ramda/src/prop';
import propEq from 'ramda/src/propEq';
import propIs from 'ramda/src/propIs';
import propOr from 'ramda/src/propOr';
import propSatisfies from 'ramda/src/propSatisfies';
import props from 'ramda/src/props';
import range from 'ramda/src/range';
import reduce from 'ramda/src/reduce';
import reduceBy from 'ramda/src/reduceBy';
import reduceRight from 'ramda/src/reduceRight';
import reduceWhile from 'ramda/src/reduceWhile';
import reduced from 'ramda/src/reduced';
import reject from 'ramda/src/reject';
import remove from 'ramda/src/remove';
import repeat from 'ramda/src/repeat';
import replace from 'ramda/src/replace';
import reverse from 'ramda/src/reverse';
import scan from 'ramda/src/scan';
import sequence from 'ramda/src/sequence';
import set from 'ramda/src/set';
import slice from 'ramda/src/slice';
import sort from 'ramda/src/sort';
import sortBy from 'ramda/src/sortBy';
import sortWith from 'ramda/src/sortWith';
import split from 'ramda/src/split';
import splitAt from 'ramda/src/splitAt';
import splitEvery from 'ramda/src/splitEvery';
import splitWhen from 'ramda/src/splitWhen';
import startsWith from 'ramda/src/startsWith';
import subtract from 'ramda/src/subtract';
import sum from 'ramda/src/sum';
import symmetricDifference from 'ramda/src/symmetricDifference';
import symmetricDifferenceWith from 'ramda/src/symmetricDifferenceWith';
import tail from 'ramda/src/tail';
import take from 'ramda/src/take';
import takeLast from 'ramda/src/takeLast';
import takeLastWhile from 'ramda/src/takeLastWhile';
import takeWhile from 'ramda/src/takeWhile';
import tap from 'ramda/src/tap';
import test from 'ramda/src/test';
import thunkify from 'ramda/src/thunkify';
import times from 'ramda/src/times';
import toLower from 'ramda/src/toLower';
import toPairs from 'ramda/src/toPairs';
import toPairsIn from 'ramda/src/toPairsIn';
import toString from 'ramda/src/toString';
import toUpper from 'ramda/src/toUpper';
import transduce from 'ramda/src/transduce';
import transpose from 'ramda/src/transpose';
import traverse from 'ramda/src/traverse';
import trim from 'ramda/src/trim';
import tryCatch from 'ramda/src/tryCatch';
import type from 'ramda/src/type';
import unapply from 'ramda/src/unapply';
import unary from 'ramda/src/unary';
import uncurryN from 'ramda/src/uncurryN';
import unfold from 'ramda/src/unfold';
import union from 'ramda/src/union';
import unionWith from 'ramda/src/unionWith';
import uniq from 'ramda/src/uniq';
import uniqBy from 'ramda/src/uniqBy';
import uniqWith from 'ramda/src/uniqWith';
import unless from 'ramda/src/unless';
import unnest from 'ramda/src/unnest';
import until from 'ramda/src/until';
import update from 'ramda/src/update';
import useWith from 'ramda/src/useWith';
import values from 'ramda/src/values';
import valuesIn from 'ramda/src/valuesIn';
import view from 'ramda/src/view';
import when from 'ramda/src/when';
import where from 'ramda/src/where';
import whereEq from 'ramda/src/whereEq';
import without from 'ramda/src/without';
import xor from 'ramda/src/xor';
import xprod from 'ramda/src/xprod';
import zip from 'ramda/src/zip';
import zipObj from 'ramda/src/zipObj';
import zipWith from 'ramda/src/zipWith';

export {
  add,
  addIndex,
  adjust,
  all,
  // allPass,
  always,
  and,
  andThen,
  any,
  // anyPass,
  ap,
  aperture,
  append,
  apply,
  applySpec,
  applyTo,
  ascend,
  assoc,
  assocPath,
  binary,
  bind,
  both,
  call,
  chain,
  clamp,
  clone,
  comparator,
  complement,
  compose,
  composeWith,
  concat,
  // cond,
  construct,
  constructN,
  converge,
  countBy,
  curry,
  curryN,
  dec,
  defaultTo,
  descend,
  difference,
  differenceWith,
  dissoc,
  dissocPath,
  divide,
  drop,
  dropLast,
  dropLastWhile,
  dropRepeats,
  dropRepeatsWith,
  dropWhile,
  either,
  empty,
  endsWith,
  eqBy,
  eqProps,
  equals,
  evolve,
  filter,
  find,
  findIndex,
  findLast,
  findLastIndex,
  flatten,
  flip,
  forEach,
  forEachObjIndexed,
  fromPairs,
  groupBy,
  groupWith,
  // gt,
  // gte,
  has,
  hasIn,
  hasPath,
  head,
  identical,
  identity,
  ifElse,
  inc,
  includes,
  index,
  indexBy,
  indexOf,
  init,
  innerJoin,
  insert,
  insertAll,
  intersection,
  intersperse,
  into,
  invert,
  invertObj,
  invoker,
  is,
  // isEmpty,
  // isNil,
  join,
  juxt,
  keys,
  keysIn,
  last,
  lastIndexOf,
  // length,
  lens,
  lensIndex,
  lensPath,
  lensProp,
  lift,
  liftN,
  // lt,
  // lte,
  map,
  mapAccum,
  mapAccumRight,
  mapObjIndexed,
  // match,
  mathMod,
  max,
  maxBy,
  mean,
  median,
  memoizeWith,
  mergeAll,
  mergeDeepLeft,
  mergeDeepRight,
  mergeDeepWith,
  mergeDeepWithKey,
  mergeLeft,
  mergeRight,
  mergeWith,
  mergeWithKey,
  min,
  minBy,
  modulo,
  move,
  multiply,
  nAry,
  negate,
  none,
  not,
  nth,
  nthArg,
  o,
  objOf,
  of,
  omit,
  once,
  or,
  otherwise,
  over,
  pair,
  partial,
  partialRight,
  partition,
  path,
  pathEq,
  pathOr,
  pathSatisfies,
  paths,
  pick,
  pickAll,
  pickBy,
  pipe,
  pipeWith,
  pluck,
  prepend,
  product,
  project,
  prop,
  propEq,
  propIs,
  propOr,
  propSatisfies,
  props,
  range,
  reduce,
  reduceBy,
  reduceRight,
  reduceWhile,
  reduced,
  reject,
  remove,
  repeat,
  replace,
  reverse,
  scan,
  sequence,
  set,
  slice,
  sort,
  sortBy,
  sortWith,
  split,
  splitAt,
  splitEvery,
  splitWhen,
  startsWith,
  subtract,
  sum,
  symmetricDifference,
  symmetricDifferenceWith,
  tail,
  take,
  takeLast,
  takeLastWhile,
  takeWhile,
  tap,
  test,
  thunkify,
  times,
  toLower,
  toPairs,
  toPairsIn,
  toString,
  toUpper,
  transduce,
  transpose,
  traverse,
  trim,
  tryCatch,
  type,
  unapply,
  unary,
  uncurryN,
  unfold,
  union,
  unionWith,
  uniq,
  uniqBy,
  uniqWith,
  unless,
  unnest,
  until,
  update,
  useWith,
  values,
  valuesIn,
  view,
  when,
  where,
  whereEq,
  without,
  xor,
  xprod,
  zip,
  zipObj,
  zipWith,
};
