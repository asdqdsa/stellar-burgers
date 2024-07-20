import { ChangeEvent, SyntheticEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (_e: SyntheticEvent) => void;
  handleCancel: (_e: SyntheticEvent) => void;
  handleInputChange: (_e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
};
