import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  handleSubmit: (_e: SyntheticEvent) => void;
  handleChange: (_e: ChangeEvent<HTMLInputElement>) => void;
};
