import fastifySwagger from '@fastify/swagger'
import { app } from './app'

import {
    serializerCompiler,
    validatorCompiler,
    jsonSchemaTransform
} from "fastify-type-provider-zod";
import fastifySwaggerUi from '@fastify/swagger-ui';

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'PguaTur API',
      description: 'Documentação da API do PguaTur',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, { routePrefix: '/docs' })