import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { PostList } from './posts'; 


function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">

<Admin dataProvider={simpleRestProvider("http://localhost:3000")}>
<Resource name="posts" list={PostList} edit={EditGuesser} />
  </Admin>
  </div>
  );
}

export default Dashboard;
