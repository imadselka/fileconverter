export type Action = {
  file_name: string;
  file_size: number;
  from: string;
  to: string;
  file_type: string;
  file: File;
  is_converted: boolean;
  is_converting: boolean;
  is_error: boolean;
  url?: string;
  output?: string;
};
