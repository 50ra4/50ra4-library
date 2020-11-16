import isBefore from 'date-fns/fp/isBefore';
import parseISO from 'date-fns/fp/parseISO';
import { repeat } from '../../src';

import {
  ValueValidatorConfig,
  ValueValidatorMessageTemplate,
  isNonNullable,
  valueValidator,
  ValidationError,
  EValidatorType,
  Lookup,
  isNil,
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
  function1: (v) => !isNil(v) && !!v?.id && v.id.length < 2,
  function2: (v) => !isNil(v) && !!v?.value && v.value === 'high',
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
  function1: (v) => isNonNullable(v) && v.every((vv) => vv.id.length < 2),
  function2: (v) => isNonNullable(v) && v.every((vv) => v.filter((vvv) => vvv.id === vv.id).length > 1),
};
const LabelsMessageTemplate: ValueValidatorMessageTemplate<keyof typeof LabelsValidator> = {
  name: 'Labels',
  length: '{name} is selected over {max}.',
  function1: "{name}'s id is not under 10.",
  function2: '{name} is dupulicated.',
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
    // always failed test case
    expect(falseOrError).toBeTruthy();
    return false;
  }
  expect(falseOrError).toBeInstanceOf(ValidationError);
  return true;
};

const repeatString = (str: string, times: number) => repeat(str, times).join('');

describe('valueValidator', () => {
  describe('IssueNumberValidator', () => {
    const validator = issueNumberValidator(IssueNumberMessageTemplate);
    it('false', () => {
      const result = validator(1111);
      expect(result).toBeFalsy();
    });
    it('error required', () => {
      const result = validator(undefined);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.required);
      }
    });
    it('error length', () => {
      const result = validator(11111);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.length);
      }
    });
    it('error pattern1', () => {
      const result = validator(('111a' as unknown) as number);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.pattern1);
      }
    });
  });
  describe('LinksValidator', () => {
    const validator = linksValidator(LinksMessageTemplate);
    it('false', () => {
      const result = validator(['https://github.com/shigarashi1/50ra4-library/pull/3/files']);
      expect(result).toBeFalsy();
    });
    it('error required', () => {
      const result = validator([]);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.required);
      }
    });
    it('error function1', () => {
      const result = validator(['https://www.google.com/mail']);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.function1);
      }
    });
    it('error pettern1', () => {
      const result = validator(['aaaaa://www.google.com/?hl=ja']);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.pattern1);
      }
    });
    it('error length', () => {
      const result = validator([
        'https://github.com/shigarashi1/50ra4-library',
        'https://github.com/shigarashi1/50ra4-library',
        'https://github.com/shigarashi1/50ra4-library',
        'https://github.com/shigarashi1/50ra4-library',
      ]);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.length);
      }
    });
  });
  describe('TitleValidator', () => {
    const validator = titleValidator(TitleMessageTemplate);
    it('false', () => {
      const result1 = validator(repeatString('あ', 10));
      expect(result1).toBeFalsy();
      const result2 = validator(repeatString('あ', 100));
      expect(result2).toBeFalsy();
    });
    it('error required', () => {
      const result = validator('');
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.required);
      }
    });
    it('error length', () => {
      const result1 = validator(repeatString('あ', 9));
      if (shouldError(result1)) {
        expect(result1.types).toContain(EValidatorType.length);
      }
      const result2 = validator(repeatString('あ', 101));
      if (shouldError(result2)) {
        expect(result2.types).toContain(EValidatorType.length);
      }
    });
  });
  describe('DescriptionMessageTemplate', () => {
    const validator = descriptionValidator(DescriptionMessageTemplate);
    it('false', () => {
      const result1 = validator(repeatString('あ', 1000));
      expect(result1).toBeFalsy();
      const result2 = validator(undefined);
      expect(result2).toBeFalsy();
    });
    it('error length', () => {
      const result = validator(repeatString('あ', 1001));
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.length);
      }
    });
  });
  describe('PriorityValidator', () => {
    const validator = priorityValidator(PriorityMessageTemplate);
    it('false', () => {
      const result = validator({ id: '1', value: 'high' });
      expect(result).toBeFalsy();
    });
    it('required', () => {
      const result1 = validator({} as Lookup);
      if (shouldError(result1)) {
        expect(result1.types).toContain(EValidatorType.required);
      }
      const result2 = validator(undefined);
      if (shouldError(result2)) {
        expect(result2.types).toContain(EValidatorType.required);
      }
    });
    it('function1', () => {
      const result = validator({ id: '10' } as Lookup);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.function1);
      }
    });
    it('function2', () => {
      const result = validator({ id: '1', value: 'low' });
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.function2);
      }
    });
  });
  describe('LabelsValidator', () => {
    const validator = labelValidator(LabelsMessageTemplate);
    it('false', () => {
      const result = validator([]);
      expect(result).toBeFalsy();
    });
    it('length', () => {
      const result = validator([
        { id: '1', value: '1' },
        { id: '2', value: '2' },
        { id: '3', value: '3' },
        { id: '4', value: '4' },
      ]);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.length);
      }
    });
    it('function1', () => {
      const result = validator([
        { id: '10', value: '1' },
        { id: '2', value: '2' },
        { id: '3', value: '3' },
      ]);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.function1);
      }
    });
    it('function2', () => {
      const result = validator([
        { id: '2', value: '1' },
        { id: '2', value: '2' },
        { id: '3', value: '3' },
      ]);
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.function2);
      }
    });
  });
  describe('CreatedAtValidator', () => {
    const validator = createdAtValidator(CreatedAtMessageTemplate);
    it('false', () => {
      const result = validator('2020-10-18');
      expect(result).toBeFalsy();
    });
    it('error required', () => {
      const result = validator('');
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.required);
      }
    });
    it('error pattern1', () => {
      const result = validator('2020-1-1');
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.pattern1);
      }
    });
    it('error function1', () => {
      const result = validator('2020-10-17');
      if (shouldError(result)) {
        expect(result.types).toContain(EValidatorType.function1);
      }
    });
  });
});
