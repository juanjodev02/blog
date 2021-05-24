import { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import * as Yup from 'yup'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  VStack,
  Text
} from '@chakra-ui/react'

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Dirección de correo electrónico no válida').required('Obligatorio'),
  password: Yup.string().required('Hey, no has ingresado la constraseña')
})

type Props = {
  handleSubmit: (values: any, actions: any) => Promise<void>,
  errorMsg: string,
  loading: boolean
}

export const SigninForm = ({ handleSubmit, errorMsg = '', loading }: Props) => {
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
        >
        {(props) => (
          <Form>
            <VStack spacing='30px' display='flex' alignItems='flex-start'>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                    <Input {...field} size='lg' variant='filled' id="email" placeholder="example@example.com" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="password"
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Contraseña"
                        variant='filled'
                        size='lg'
                      />
                      <InputRightElement height='100%' width="4.5rem" display='flex' justifyContent='center'>
                        {show ? <ViewOffIcon onClick={handleClick} /> : <ViewIcon onClick={handleClick} />}
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={loading}
                type='submit'
              >
                Iniciar Sesión
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
      <Text fontSize='m' color='red.500' mt='5'>{errorMsg}</Text>
    </>
  )
}
