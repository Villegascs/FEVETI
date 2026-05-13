import {defineField, defineType} from 'sanity'

export const resultadoType = defineType({
  name: 'resultado',
  title: 'Resultado de Competencia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Resultado',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Archivo PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Año Descendente',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
})
