import { Lookup } from '../../src/utils';

export type Issue = {
  number: number;
  url: string;
  title: string;
  description: string;
  priority: Lookup;
  label: Lookup[];
  createdAt: string;
};
