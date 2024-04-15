import { fn } from '@storybook/test';
import Task from '../pages/components/task'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'FFPH/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

function handleDelete() {
  return;
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NotDue = {
  args: {
    onDelete: handleDelete,
    task: {
      name: 'name',
      description: 'desc',
      deadline: '2024-04-20'
    },
  },
};

export const AlmostDue = {
  args: {
    onDelete: handleDelete,
    task: {
      name: 'name',
      description: 'desc',
      deadline: '2024-04-15'
    },
  },
};

export const OverDue = {
  args: {
    onDelete: handleDelete,
    task: {
      name: 'name',
      description: 'desc',
      deadline: '2022-04-10'
    },
  },
};

export const Reallylongname = {
  args: {
    onDelete: handleDelete,
    task: {
      name: 'asdfdsafasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      description: 'desc',
      deadline: '2022-04-10'
    },
  },
};