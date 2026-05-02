import { createTheme } from '@mantine/core';

export const tslcTheme = createTheme({
  primaryColor: 'tslcBlue',
  colors: {
    tslcBlue: [
      '#e8f0fb', '#c5d9f5', '#9ec0ee',
      '#6fa3e6', '#3d84dd', '#1E6BB0', // [5] = primary
      '#185d9a', '#124e84', '#0c3f6e', '#063058',
    ],
    tslcGreen: [
      '#eaf5ea', '#c6e5c6', '#9fd49f',
      '#74c274', '#4aaf4a', '#3a8f3a', // [5] = primary
      '#317a31', '#276527', '#1d501d', '#133b13',
    ],
  },
  fontFamily: 'PT Sans, sans-serif',
  headings: { fontFamily: 'Aldrich, sans-serif' },
});