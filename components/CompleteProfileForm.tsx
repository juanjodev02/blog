import * as Yup from 'yup'
import { Form, Formik, Field } from 'formik'
import {
  HStack,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  Text
} from '@chakra-ui/react'
import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai'
import { FormControl, FormLabel } from '@chakra-ui/form-control'

const CompleteProfileSchema = Yup.object().shape({
  name: Yup.string().required('Este nombre será el que aparece en tus publicaciones'),
  lastName: Yup.string().required('Este nombre será el que aparece en tus publicaciones'),
  twitter: Yup.string(),
  github: Yup.string()
})

type Props = {
  handleSubmit: (values: any, actions: any) => Promise<void>
  errorMsg: string,
  loading: boolean
}

// TODO mostrar errores en el formulario

export const CompleteProfileForm = ({ handleSubmit, errorMsg, loading }: Props) => {
  return (
    <>
      <Formik
        initialValues={{ name: '', lastName: '', twitter: '', github: '' }}
        validationSchema={CompleteProfileSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <VStack spacing='30' alignItems='flex-start'>
              <HStack spacing='30'>
                <VStack spacing='30'>
                  <Field name='name'>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor='name'>Nombre</FormLabel>
                      <Input {...field} size='lg' variant='filled' id='name' placeholder='Mark'/>
                    </FormControl>
                  )}
                  </Field>
                  <Field name='lastName'>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor='lastName'>Apellido</FormLabel>
                      <Input {...field} size='lg' variant='filled' id='lastName' placeholder='Zuckerberg'/>
                    </FormControl>
                  )}
                  </Field>
                </VStack>
                <VStack spacing='30'>
                  <Field name='twitter'>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor='twitter'>Twitter</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          id="twitter"
                          placeholder="@example123"
                          variant='filled'
                          size='lg'
                        />
                        <InputRightElement height='100%' width="4.5rem" display='flex' justifyContent='center'>
                          <Icon as={AiOutlineTwitter}/>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  )}
                  </Field>
                  <Field name='github'>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor='github'>Github</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          id="github"
                          placeholder="example123"
                          variant='filled'
                          size='lg'
                        />
                        <InputRightElement height='100%' width="4.5rem" display='flex' justifyContent='center'>
                          <Icon as={AiOutlineGithub}/>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  )}
                  </Field>
                </VStack>
              </HStack>
              <Button colorScheme='teal' isLoading={loading} type='submit'>Guardar cambios</Button>
            </VStack>
          </Form>
        )}
      </Formik>
      <Text>{errorMsg}</Text>
    </>
  )
}
