// schemas/gallery.js
import BulkImageUpload from '../../components/BulkImageUpload.jsx'

export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Name of the photoshoot or client'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'accessCode',
      title: 'Access Code',
      type: 'string',
      description: 'Simple password to share with clients'
    },
    // Add bulk upload component
    {
      name: 'bulkUpload',
      title: 'Bulk Image Upload',
      type: 'string',
      components: {
        field: BulkImageUpload
      }
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true
              }
            },
            {
              name: 'filename',
              type: 'string',
              title: 'Original Filename',
              options: {
                isHighlighted: true
              }
            },
            {
              name: 'selected',
              type: 'boolean',
              title: 'Selected by Client',
              initialValue: false
            }
          ]
        }
      ]
    },
    {
      name: 'clientEmail',
      title: 'Client Email',
      type: 'string'
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string'
    },
    {
      name: 'shootDate',
      title: 'Shoot Date',
      type: 'date'
    },
    {
      name: 'expiryDate',
      title: 'Gallery Expiry Date',
      type: 'date',
      description: 'When should this gallery expire?'
    }
  ]
};