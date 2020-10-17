import { Lookup } from '../../src/utils';

export type Issue = {
  number: number;
  links: string[];
  title: string;
  description: string;
  priority: Lookup;
  labels: Lookup[];
  createdAt: string;
};
