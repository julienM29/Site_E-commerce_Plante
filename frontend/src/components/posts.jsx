import { List, Datagrid, TextField, DateField } from 'react-admin';

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="body" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
