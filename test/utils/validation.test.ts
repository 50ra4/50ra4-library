import isBefore from 'date-fns/fp/isBefore';
import parseISO from 'date-fns/fp/parseISO';
import { repeat } from '../../src/ramda';

import {
  ValueValidatorConfig,
  ValueValidatorMessageTemplate,
  isNonNullable,
  valueValidator,
  ValidationError,
  EValidatorType,
} from '../../src/utils';
import { Issue } from '../tools/types';

type PartialIssue = Partial<Issue>;
type IssueNumber = PartialIssue['number'];
type Links = PartialIssue['links'];
type Title = PartialIssue['title'];
type Description = PartialIssue['description'];
type Priority = PartialIssue['priority'];
type Labelss = PartialIssue['labels'];
type CreatedAt = PartialIssue['createdAt'];

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

const shouldError = (falseOrError: false | ValidationError): falseOrError is ValidationError => {
  if (!falseOrError) {
    // always Error
    expect(falseOrError).toBeTruthy();
    return false;
  }
  expect(falseOrError).toBeInstanceOf(ValidationError);
  return true;
};

describe('valueValidator', () => {
  describe('IssueNumberValidator', () => {
    const validator = issueNumberValidator(IssueNumberMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator(1111);
      expect(result).toBeFalsy();
    });
    it('should return ValidationError type required', () => {
      const result = validator(undefined);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.required);
      }
    });
    it('should return ValidationError type length', () => {
      const result = validator(11111);
      expect(result).toBeInstanceOf(ValidationError);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.length);
      }
    });
  });
  describe('LinksValidator', () => {
    const validator = linksValidator(LinksMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator(['https://github.com/shigarashi1/50ra4-library/pull/3/files']);
      expect(result).toBeFalsy();
    });
    it('should return ValidationError function1 type', () => {
      const result = validator(['https://www.google.com/?hl=ja']);
      expect(result).toBeInstanceOf(ValidationError);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.function1);
      }
    });
    it('should return ValidationError pettern1 type', () => {
      const result = validator(['aaaaa://www.google.com/?hl=ja']);
      expect(result).toBeInstanceOf(ValidationError);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.pattern1);
      }
    });
  });
  describe('TitleValidator', () => {
    const validator = titleValidator(TitleMessageTemplate);
    it('not invalid value should return false', () => {
      const result = validator('アイウエオかきくけこ');
      expect(result).toBeFalsy();
    });
    it('return ValidationError type length', () => {
      const result1 = validator('アイウエオかきくけ');
      expect(result1).toBeInstanceOf(ValidationError);
      if (result1) {
        expect(result1.types).toContain(EValidatorType.length);
      }
      const result2 = validator(repeat('あ', 101).join(''));
      expect(result2).toBeInstanceOf(ValidationError);
      if (result2) {
        expect(result2.types).toContain(EValidatorType.length);
      }
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
