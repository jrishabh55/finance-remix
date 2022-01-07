import { FC } from 'react';
import { Form } from 'remix';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Input from '~/components/form/input';

const AddUser: FC<{ error?: string }> = ({ error }) => {
  return (
    <Card
      title="Add User"
      className="col-span-4 col-start-5"
      footer={
        <div className="flex justify-end">
          <Button type="submit" form="createUser" className="mr-5">
            Add User
          </Button>
        </div>
      }>
      <div className="">
        <Form id="createUser" method="post">
          <Input autoComplete="none" required label="Username" name="username" />
          <Input autoComplete="none" required label="Name" name="name" />
          <Input autoComplete="none" required label="Email" name="email" type="email" />
          <Input autoComplete="none" required label="Password" name="password" type="password" />
          {error && (
            <div className="text-error text-center">
              <p>{error}</p>
            </div>
          )}
        </Form>
      </div>
    </Card>
  );
};

export default AddUser;
