import React, { useState, ReactNode } from 'react';
import { Meta } from '@storybook/react';

import { TextInput, TextInputProps } from '../TextInput';

export default {
  title: 'Forms/Text Input',
  component: TextInput,
  argTypes: {
    block: {
      name: 'Block',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      name: 'Disabled',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    variant: {
      name: 'Variants',
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    validationStatus: {
      name: 'Validation Status',
      options: ['warning', 'error'],
      control: { type: 'radio' },
    },
    placeholder: {
      name: 'Placeholder',
      defaultValue: 'Hello!',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default = (args: TextInputProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const inputId = 'basic-text-input';

  return (
    <form>
      <div className='form-group'>
        <div className='form-group-body'>
          <TextInput
            id={inputId}
            value={value}
            onChange={handleChange}
            {...args}
          />
        </div>
      </div>
    </form>
  );
};

export const TextInputInWarningState = (args: TextInputProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const inputId = 'text-input-with-warning';

  return (
    <form>
      <TextInput
        type='password'
        id={inputId}
        value={value}
        validationStatus='warning'
        onChange={handleChange}
        {...args}
      />
    </form>
  );
};
