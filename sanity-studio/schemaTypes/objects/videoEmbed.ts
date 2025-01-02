export default {
  name: 'videoEmbed',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'  // This allows video file uploads
      }
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Add a caption to describe the video'
    },
    {
      // Keep the URL field as a fallback for external videos
      name: 'url',
      title: 'Or use Video URL',
      type: 'url',
      description: 'Alternative: Link to the video (YouTube, Vimeo, etc.)',
    }
  ]
};