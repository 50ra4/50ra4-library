import isBefore from 'date-fns/fp/isBefore';
import parseISO from 'date-fns/fp/parseISO';

import { ValueValidatorConfig, ValueValidatorMessageTemplate, isNonNullable, valueValidator } from '../../src/utils';
import { Issue } from '../tools/types';

type IssueNumber = Issue['number'];
type Links = Issue['links'];
type Title = Issue['title'];
type Description = Issue['description'];
type Priority = Issue['priority'];
type Labelss = Issue['labels'];
type CreatedAt = Issue['createdAt'];

const IssueNumberValidator: ValueValidatorConfig<IssueNumber> = {
  required: true,
  length: { max: 9999 },
  pattern1: /^[0-9]+$/,
  function1: (v) => v !== 0,
};
const IssueNumberMessageTemplate: ValueValidatorMessageTemplate<keyof typeof IssueNumberValidator> = {
  name: 'IssueNumber',
  required: '{name} is required.',
  length: '{name} is over {max}.',
  pattern1: '{name} is only number.',
  function1: '{name} is not 0.',
};
const issueNumberValidator = valueValidator(IssueNumberValidator);

const LinksValidator: ValueValidatorConfig<Links> = {
  required: true,
  length: { max: 3 },
  pattern1: /https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/g,
  function1: (v) => (v ?? []).every((vv) => vv.match('github')),
};
const LinksMessageTemplate: ValueValidatorMessageTemplate<keyof typeof LinksValidator> = {
  name: 'Links',
  required: '{name} is required.',
  length: '{name} is over {max}.',
  pattern1: '{name} is invalid format.',
  function1: '{name} do not have "github" url.',
};
const linksValidator = valueValidator(LinksValidator);

const TitleValidator: ValueValidatorConfig<Title> = {
  required: true,
  length: { min: 10, max: 100 },
};
const TitleMessageTemplate: ValueValidatorMessageTemplate<keyof typeof TitleValidator> = {
  name: 'Title',
  required: '{name} is required.',
  length: '{name} is over {max} or under {min}.',
};
const titleValidator = valueValidator(TitleValidator);

const DescriptionValidator: ValueValidatorConfig<Description> = {
  length: { max: 1000 },
};
const DescriptionMessageTemplate: ValueValidatorMessageTemplate<keyof typeof DescriptionValidator> = {
  name: 'Description',
  length: '{name} is over {max}.',
};
const descriptionValidator = valueValidator(DescriptionValidator);

const PriorityValidator: ValueValidatorConfig<Priority> = {
  required: true,
  function1: (v) => isNonNullable(v) && v.id.length < 10,
  function2: (v) => isNonNullable(v) && v.id.length === 1,
};
const PriorityMessageTemplate: ValueValidatorMessageTemplate<keyof typeof PriorityValidator> = {
  name: 'Priority',
  required: '{name} is required.',
  function1: "{name}'s id is not under 10.",
  function2: "{name}'s id is not 1.",
};
const priorityValidator = valueValidator(PriorityValidator);

const LabelsValidator: ValueValidatorConfig<Labelss> = {
  length: { max: 3 },
  function1: (v) => isNonNullable(v) && v.every((vv) => vv.id.length < 10),
  function2: (v) => isNonNullable(v) && v.every((vv) => v.filter((vvv) => vvv === vv).length > 1),
};
const LabelsMessageTemplate: ValueValidatorMessageTemplate<keyof typeof LabelsValidator> = {
  name: 'Labels',
  length: '{name} is selected over {max}.',
  function1: "{name}'s id is not under 10.",
  function2: '{name} is not dupulicated.',
};
const labelValidator = valueValidator(LabelsValidator);

const CreatedAtValidator: ValueValidatorConfig<CreatedAt> = {
  required: true,
  length: { max: 10, min: 10 },
  pattern1: /\d{4}-\d{2}-\d{2}/,
  function1: (v) => isNonNullable(v) && isBefore(parseISO(v))(parseISO('2020-10-17')),
};
const CreatedAtMessageTemplate: ValueValidatorMessageTemplate<keyof typeof CreatedAtValidator> = {
  name: 'CreatedAt',
  length: '{name} is over {max}.',
  pattern1: '{name} is invalid date pattern.',
  function1: '{name} is before 2020-10-17.',
};
const createdAtValidator = valueValidator(CreatedAtValidator);

describe('valueValidator', () => {
  describe('IssueNumberValidator', () => {
    const validator = issueNumberValidator(IssueNumberMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator(1111);
      expect(result).toBeFalsy();
    });
  });
  describe('LinksMessageTemplate', () => {
    const validator = linksValidator(LinksMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator(['https://github.com/shigarashi1/50ra4-library/pull/3/files']);
      expect(result).toBeFalsy();
    });
  });
  describe('TitleValidator', () => {
    const validator = titleValidator(TitleMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator('アイウエオかきくけこさ');
      expect(result).toBeFalsy();
    });
  });
  describe('DescriptionMessageTemplate', () => {
    const validator = descriptionValidator(DescriptionMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator('');
      expect(result).toBeFalsy();
    });
  });
  describe('PriorityValidator', () => {
    const validator = priorityValidator(PriorityMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator({ id: '1', value: '' });
      expect(result).toBeFalsy();
    });
  });
  describe('LabelsValidator', () => {
    const validator = labelValidator(LabelsMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator([]);
      expect(result).toBeFalsy();
    });
  });
  describe('CreatedAtValidator', () => {
    const validator = createdAtValidator(CreatedAtMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator('2020-10-18');
      expect(result).toBeFalsy();
    });
  });
});
