import {defineField, defineType} from 'sanity'

export const atletaType = defineType({
  name: 'atleta',
  title: 'Atletas',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'apellido',
      title: 'Apellido',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'idFederativo',
      title: 'ID Federativo',
      type: 'string',
      description: 'Número de carnet del atleta (ej. FEV-1234)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.nombre}-${doc.apellido}-${doc.idFederativo}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto del Atleta',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Juvenil', value: 'juvenil'},
          {title: 'Senior', value: 'senior'},
          {title: 'Veterano', value: 'veterano'},
          {title: 'Master', value: 'master'},
        ],
      },
    }),
    defineField({
      name: 'disciplina',
      title: 'Disciplina',
      type: 'string',
      options: {
        list: [
          {title: 'Pistola de Aire', value: 'pistola_aire'},
          {title: 'Rifle de Aire', value: 'rifle_aire'},
          {title: 'Pistola Libre', value: 'pistola_libre'},
          {title: 'Fosa Olímpica', value: 'fosa'},
          {title: 'Skeet', value: 'skeet'},
        ],
      },
    }),
    defineField({
      name: 'club',
      title: 'Club',
      type: 'string',
    }),
    defineField({
      name: 'estado',
      title: 'Estado/Asociación',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Estatus',
      type: 'string',
      initialValue: 'activo',
      options: {
        list: [
          {title: 'Activo', value: 'activo'},
          {title: 'Inactivo', value: 'inactivo'},
          {title: 'Suspendido', value: 'suspendido'},
        ],
      },
    }),
    defineField({
      name: 'fechaNacimiento',
      title: 'Fecha de Nacimiento',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'apellido',
      media: 'foto',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: `${title} ${subtitle}`,
        subtitle: 'Atleta Federado',
        media,
      }
    },
  },
})
