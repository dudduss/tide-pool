export type Cruise = {
  entry_id: string;
  entry_type: string;
  platform_id: string;
  chief: string;
  year: number;
  flag_alt: string;
  created: string;
  device_make: string;
  device_model: string;
  total_area: number;
};

export enum SortByOption {
  None = 'Sort by',
  DateAscending = 'Date (Ascending)',
  DateDescending = 'Date (Descending)',
}
