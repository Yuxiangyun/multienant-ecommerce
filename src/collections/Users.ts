import type { CollectionConfig } from 'payload'
import { username } from 'payload/shared'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
        name:"username",
        required: true,
        type:"text",
        unique:true,
    }
    // Add more fields as needed
  ],
}
