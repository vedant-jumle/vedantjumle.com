var content = {
  sections: ['about', 'cv', 'projects', 'research', 'blog', 'contact'],
  about: 'Hi, I\u2019m Vedant Jumle. I am an AI researcher with interests in deep learning, reinforcement learning, and probabilistic models. Welcome to my terminal-style personal website!',
  cv: {
    description: 'Download my CV',
    link: 'https://drive.google.com/file/d/10a601FPWkfytt2RjeRe9CagkyfwNl4Gm/view'
  },
  projects: [
    {
      slug: 'reinforcement-learning-101',
      title: 'Reinforcement Learning 101 (Active Repo)',
      desc: 'Comprehensive guide to reinforcement learning concepts and algorithms with code examples.',
      stack: ['Torch', 'Python', 'RL'],
      repo: 'https://github.com/vedant-jumle/reinforcement-learning-101',
      demo: 'https://github.com/vedant-jumle/reinforcement-learning-101'
    },
    {
      slug: 'cosAE',
      title: 'CosAE: Convolutional Harmonic Autoencoder',
      desc: 'PyTorch implementation of the Convolutional Harmonic Autoencoder (CosAE)',
      stack: ['Torch', 'Python'],
      repo: 'https://github.com/vedant-jumle/CosAE',
      demo: 'https://github.com/vedant-jumle/CosAE'
    },
    {
      slug: 'buzztrends',
      title: 'BuzzTrends',
      desc: 'AI Copilot for moment marketing using LLMs and vector search to generate brand-specific social media posts.',
      stack: ['LLM', 'Azure', 'Python', 'ChromaDB'],
      repo: 'https://buzztrends.in/',
      demo: 'https://buzztrends.in/'
    },
    {
      slug: 'diffusion-tf',
      title: 'Diffusion in TensorFlow',
      desc: 'Custom DDPM and class-conditioned diffusion models with Keras and TensorFlow.',
      stack: ['TensorFlow', 'Keras', 'Deep Learning'],
      repo: 'https://medium.com/@vedantjumle/image-generation-with-diffusion-models-using-keras-and-tensorflow-9f60aae72ac',
      demo: 'https://medium.com/@vedantjumle/class-conditioned-diffusion-models-using-keras-and-tensorflow-9997fa6d958c'
    },
    {
      slug: 'mamba-tf',
      title: 'Mamba in TensorFlow',
      desc: 'Custom implementation of Mamba architecture with theory and TensorFlow/Keras code.',
      stack: ['TensorFlow', 'Keras', 'Mamba'],
      repo: 'https://medium.com/towards-data-science/mamba-ssm-theory-and-implementation-in-keras-and-tensorflow-32d6d4b32546',
      demo: ''
    },
    {
      slug: 'genie',
      title: 'Genie: Generative Models in Flask',
      desc: 'SRGAN, DCGAN, and Neural Style Transfer models deployed via Flask.',
      stack: ['TensorFlow', 'Flask', 'Python'],
      repo: 'https://github.com/maxDeCoder/gen_ML_sem_4/',
      demo: ''
    },
    {
      slug: 'twitter-disaster-watcher',
      title: 'Twitter Disaster Watcher',
      desc: 'Pipeline to extract disaster-related data from tweets using verifier and custom NER models.',
      stack: ['Python', 'NLP', 'Twitter API'],
      repo: 'https://github.com/AkhileshManda/Hacknado',
      demo: ''
    }
  ],
  research: [
    {
      slug: 'tcpd-ias',
      title: 'Bureaucrats of India - TCPD–IAS',
      desc: 'Dataset on officers of the Indian Administrative Service (IAS).',
      link: 'https://tcpd.ashoka.edu.in/bureaucrats-of-india/'
    },
    {
      slug: 'twitter-journalism-global-south',
      title: 'Decoding the Star System: Twitter and Journalism in the Global South',
      desc: 'Published paper analyzing Twitter’s impact on journalism.',
      link: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/1758-5899.13252'
    }
  ],
  blog: [
    {
      slug: 'rl-with-actor-critic-methods',
      title: 'Deep Reinforcement Learning: The Actor-Critic Method',
      link: 'https://towardsdatascience.com/deep-reinforcement-learning-the-actor-critic-method/'
    },
    {
      slug: 'rl-with-policy-gradients',
      title: 'Deep Reinforcement Learning: 0 to 100',
      link: 'https://towardsdatascience.com/deep-reinforcement-learning-for-dummies/'
    },
    {
      slug: 'diffusion-models',
      title: 'Image generation with diffusion models using Keras and TensorFlow',
      link: 'https://medium.com/@vedantjumle/image-generation-with-diffusion-models-using-keras-and-tensorflow-9f60aae72ac'
    },
    {
      slug: 'class-conditioned-diffusion',
      title: 'Class-conditioned diffusion models using Keras and TensorFlow',
      link: 'https://medium.com/@vedantjumle/class-conditioned-diffusion-models-using-keras-and-tensorflow-9997fa6d958c'
    },
    {
      slug: 'mamba-tutorial',
      title: 'Mamba: SSM, Theory, and Implementation in Keras and TensorFlow',
      link: 'https://towardsdatascience.com/mamba-ssm-theory-and-implementation-in-keras-and-tensorflow-32d6d4b32546'
    }
  ],
  contact: {
    email: 'vedantjumle@gmail.com',
    github: 'https://github.com/vedant-jumle',
    linkedin: 'https://www.linkedin.com/in/vedantjumle'
  }
};
