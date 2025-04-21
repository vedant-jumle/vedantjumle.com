var content = {
  sections: ['about', 'cv', 'projects', 'research', 'blog', 'contact'],
  about: 'Hi, I\u2019m Vedant Jumle. I am an AI researcher with interests in deep learning, reinforcement learning, and probabilistic models. Welcome to my terminal-style personal website!',
  cv: {
    description: 'Download my CV',
    link: 'cv.pdf'
  },
  projects: [
    {
      slug: 'ai-optimizer',
      title: 'AI Optimizer',
      desc: 'A meta-learning algorithm for black-box optimization.',
      stack: ['TensorFlow', 'JAX', 'Python'],
      repo: 'https://github.com/vedant/ai-optimizer',
      demo: 'https://vedant.ai/ai-optimizer'
    },
    {
      slug: 'cool-vision-demo',
      title: 'Cool Vision Demo',
      desc: 'Real-time computer vision web application.',
      stack: ['OpenCV', 'JavaScript', 'WebRTC'],
      repo: 'https://github.com/vedant/cool-vision-demo',
      demo: 'https://vedant.ai/vision-demo'
    }
  ],
  research: [
    {
      slug: 'deep-rl-paper',
      title: 'Deep RL for Games',
      desc: 'Deep reinforcement learning methods for sample-efficient gameplay.',
      link: 'https://doi.org/10.1234/deeprl'
    }
  ],
  contact: {
    email: 'vedantjumle@gmail.com',
    github: 'https://github.com/vedantjumle',
    linkedin: 'https://www.linkedin.com/in/vedantjumle'
  },
  // Blog entries (external links)
  blog: [
    {
      slug: 'medium',
      title: 'Mamba: SSM, Theory, and Implementation in Keras and TensorFlow',
      link: 'https://towardsdatascience.com/mamba-ssm-theory-and-implementation-in-keras-and-tensorflow-32d6d4b32546/'
    },
    {
      slug: 'blog',
      title: 'Image generation with diffusion models using Keras and TensorFlow',
      link: 'https://towardsdatascience.com/image-generation-with-diffusion-models-using-keras-and-tensorflow-9f60aae72ac/'
    }
  ]
};