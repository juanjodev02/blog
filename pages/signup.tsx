import { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  Box,
  VStack,
  Text,
  useColorModeValue,
  Center,
  Link as ChakraLink
} from '@chakra-ui/react'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../lib/form'

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!, $username: String!) {
    signUp(input: { email: $email, password: $password, username: $username }) {
      user {
        id
      }
    }
  }
`

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Dirección de correo electrónico no válida').required('Obligatorio'),
  username: Yup.string()
    .min(2, 'Prueba con un nombre algo más largo')
    .max(50, 'Ops! Al parecer que el nombre es muy largo')
    .required('Obligatorio'),
  password: Yup.string().required('Hey, no has establecido la constraseña'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Ops! Al parecer que las contraseñas no coinciden')
})

function SignUp () {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const bg = useColorModeValue('gray.50', 'black')
  const color = useColorModeValue('dark', 'light')

  const handleClick = () => setShow(!show)

  const handleClickPass = () => setShowPassword(!showPassword)

  async function handleSubmit ({ email, password, username }, actions) {
    try {
      actions.setSubmitting(true)
      await signUp({
        variables: {
          email,
          password,
          username
        }
      })
      actions.setSubmitting(false)
      router.push('/signin')
    } catch (error) {
      console.error(error)
      setErrorMsg(getErrorMessage(error))
      actions.setSubmitting(false)
    }
  }

  return (
    <VStack spacing='1em' height='100%'>
        <Heading fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} size="4xl" my='1rem'>
          Forma parte de nuestro equipo
        </Heading>
        <Center flexDirection='column' alignItems='center'>
          <Box bg={bg} color={color} borderWidth="1px" borderRadius="lg" w={[400, 400, 450]} padding='20px' display='block'>
            <Center>
              <Text as="h1" fontSize="4xl" colorScheme='teal'>Registro</Text>
            </Center>
              <Formik
              initialValues={{ email: '', username: '', password: '', passwordConfirmation: '' }}
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
                    <Field name="username">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.username && form.touched.username}>
                          <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
                          <Input {...field} size='lg' variant='filled' id="username" placeholder="username" />
                          <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Contraseña"
                              variant='filled'
                              size='lg'
                            />
                            <InputRightElement height='100%' width="4.5rem" display='flex' justifyContent='center'>
                              {showPassword ? <ViewOffIcon onClick={handleClickPass} /> : <ViewIcon onClick={handleClickPass} />}
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="passwordConfirmation">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.passwordConfirmation && form.touched.passwordConfirmation}>
                          <FormLabel htmlFor="repeatPassword">Repite la contraseña</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              id="repeatPassword"
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
                          <FormErrorMessage>{form.errors.passwordConfirmation}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      // eslint-disable-next-line react/prop-types
                      isLoading={props.isSubmitting}
                      type='submit'
                    >
                      Registrarse
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
            <Text fontSize='m' color='red.500' mt='5'>{errorMsg}</Text>
          </Box>
        </Center>
        <Box>
          <Text>Si ya tienes cuenta, <Link href='/signin'><ChakraLink>inicia sesión </ChakraLink></Link></Text>
        </Box>
      </VStack>
  )
}

export default SignUp
