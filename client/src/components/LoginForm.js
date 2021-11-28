import React, { useState } from "react";
import { Box, ResponsiveContext, TextInput, Heading, Button, Form, FormField } from "grommet";
import { Mail, FormLock, Login } from "grommet-icons";
import axios from "axios";

export default () => {

  // Functions
  const submitForm = async ({ value }) => {
    await axios.post("http://localhost:5000/api/login", {
      email: value.email,
      password: value.password
    })
    .then( res => console.log(res))
    .catch( err => console.log(err))
  };

  const trytoDelete = async () => {
    await axios.delete("http://localhost:5000/api/delete")
      .then( res => console.log(res))
      .catch( err => console.log(err))
  }

  // Render
  return (
    <>
      <Heading>Login!</Heading>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box border={{ color: 'black', size: 'large' }} pad="medium" width={size} >
            <Form onSubmit={e => submitForm(e)} >

              <FormField >
                <TextInput name="email" placeholder="Email"/>
              </FormField>

              <FormField>
                <TextInput name="password" type="password" placeholder="Password"/>
              </FormField>

              <Button type="submit" icon={<Login />} color="black" hoverIndicator />
              <Button hoverIndicator label="Try to Delete" onClick={()=>trytoDelete()}/>


          </Form>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </>
  );
};