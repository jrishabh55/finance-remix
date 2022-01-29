import { FC, FormEventHandler } from 'react';
import { Form, useSubmit, useTransition } from 'remix';
import Button from '~/lib/Button';
import Card from '~/lib/Card';
import Input from '~/lib/form/Input';

const AddUser: FC<{ error?: string }> = ({ error }) => {
  const submit = useSubmit();
  const transition = useTransition();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    submit(form, { method: 'post', action: '/users/add' });
  };

  return (
    <Card
      title="Add User"
      footer={
        <div className="flex justify-end">
          <Button
            type="submit"
            form="createUser"
            className="mr-10 ml-auto"
            disabled={transition.state === 'submitting'}>
            {transition.state === 'submitting' ? 'Adding User' : 'Add User'}
          </Button>
        </div>
      }>
      <div className="p-4 pb-0 md:w-[35vw]">
        <Form id="createUser" method="post" onSubmit={handleSubmit}>
          <Input autoComplete="none" required label="Username" name="username" />
          <Input autoComplete="none" required label="Name" name="name" />
          <Input autoComplete="none" required label="Email" name="email" type="email" />
          <Input autoComplete="none" required label="Password" name="password" type="password" />
          {error && (
            <div className="text-center text-error">
              <p>{error}</p>
            </div>
          )}
        </Form>
      </div>
    </Card>
  );
};

export default AddUser;
