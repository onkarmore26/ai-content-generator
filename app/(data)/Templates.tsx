export default [
  {
    name: "Blog Title",
    desc: "An AI tool that generates blog titles based on your niche and outline, offering professional, engaging, and relevant suggestions.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/6104/6104040.png",
    aiPrompt:
      "Generate 5 unique, catchy, and engaging blog title suggestions based on the provided niche and outline. Ensure the titles are optimized for SEO, concise, and intriguing to readers.",
    slug: "generate-blog-title",
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        label: "Enter blog outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Blog Content",
    desc: "An AI tool that creates well-structured and compelling blog posts based on your selected topic and outline, ensuring a clear flow of ideas.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4905/4905454.png",
    slug: "blog-content-generation",
    aiPrompt:
      "Write a detailed and informative blog post based on the given topic and outline. The post should be well-researched, engaging, and written in a professional tone suitable for your audience.",
    form: [
      {
        label: "Enter your blog topic",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "Enter blog Outline here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Blog Topic Ideas",
    desc: "An AI tool that generates creative and viral-worthy blog topic ideas based on your niche, designed to attract attention and engage your audience.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/11497/11497847.png",
    slug: "blog-topic-idea",
    aiPrompt:
      "Provide 5 compelling and innovative blog topic ideas based on the given niche. Ensure the topics are trending, unique, and relevant to your target audience.",
    form: [
      {
        label: "Enter your Niche",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Youtube SEO Title",
    desc: "An AI tool that generates SEO-optimized YouTube video titles designed to improve visibility and engagement.",
    category: "YouTube Tools",
    icon: "https://cdn-icons-png.flaticon.com/128/402/402075.png",
    slug: "youtube-seo-title",
    aiPrompt:
      "Generate 5 SEO-optimized YouTube video titles based on the provided keywords and outline. Ensure the titles are catchy, relevant, and designed to rank high in search results.",
    form: [
      {
        label: "Enter your YouTube video topic keywords",
        field: "input",
        name: "keywords",
        required: true,
      },
      {
        label: "Enter YouTube description Outline here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Youtube Description",
    desc: "An AI tool that generates concise, engaging YouTube video descriptions with a professional tone, enhanced with relevant emojis.",
    category: "YouTube Tool",
    icon: "https://cdn-icons-png.flaticon.com/128/2111/2111748.png",
    slug: "youtube-description",
    aiPrompt:
      "Generate a concise, engaging YouTube description with relevant emojis, based on the provided topic and outline. The description should be informative, attention-grabbing, and optimized for audience engagement.",
    form: [
      {
        label: "Enter your blog topic/title",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "Enter YouTube Outline here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Youtube Tags",
    desc: "An AI tool that generates the most relevant YouTube tags based on your video title and outline, improving visibility and reach.",
    category: "YouTube Tool",
    icon: "https://cdn-icons-png.flaticon.com/128/4674/4674918.png",
    slug: "youtube-tag",
    aiPrompt:
      "Generate 10 highly relevant YouTube tags based on the provided video title and outline. Ensure the tags are optimized for searchability and reach.",
    form: [
      {
        label: "Enter your YouTube title",
        field: "input",
        name: "title",
        required: true,
      },
      {
        label: "Enter YouTube video Outline here (Optional)",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Rewrite Article (Plagiarism Free)",
    desc: "This tool rewrites articles or blog posts to be plagiarism-free and optimized for SEO, ensuring high-quality, original content.",
    icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
    category: "Rewriting Tool",
    slug: "rewrite-article",
    aiPrompt:
      "Rewrite the given article or blog post in a unique and original manner, ensuring it is plagiarism-free and optimized for SEO. Maintain the same meaning while enhancing the readability and professionalism.",
    form: [
      {
        label: "Provide your Article/Blogpost or any other content to rewrite.",
        field: "textarea",
        name: "article",
        required: true,
      },
    ],
  },
  {
    name: "Text Improver",
    desc: "An AI tool that enhances your writing by eliminating grammar errors, improving clarity, and offering professional tone adjustments.",
    icon: "https://cdn-icons-png.flaticon.com/128/1686/1686815.png",
    category: "Writing Assistant",
    slug: "text-improver",
    aiPrompt:
      "Rewrite the given text by eliminating any grammar mistakes, improving readability, and ensuring a professional tone. Provide suggestions for better word choices and sentence structures where applicable.",
    form: [
      {
        label: "Enter text that you want to re-write or improve",
        field: "textarea",
        name: "textToImprove",
      },
    ],
  },
  {
    name: "Add Emojis to Text",
    desc: "An AI tool that enhances your text by adding relevant emojis, making your content more engaging and visually appealing.",
    icon: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
    category: "Blog",
    slug: "add-emoji-to-text",
    aiPrompt:
      "Enhance the given text by strategically adding relevant emojis. Ensure the emojis align with the tone and context of the text, improving engagement without overwhelming the content.",
    form: [
      {
        label: "Enter your text to add emojis",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post Generator",
    desc: "An AI tool that generates professional Instagram posts based on your keywords, designed to be eye-catching and engaging.",
    icon: "https://cdn-icons-png.flaticon.com/128/15713/15713420.png",
    category: "Blog",
    slug: "instagram-post-generator",
    aiPrompt:
      "Generate 3 professional and engaging Instagram post ideas based on the provided keywords. Ensure the posts are optimized for user engagement and visually appealing.",
    form: [
      {
        label: "Enter Keywords for your post",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Hash Tag Generator",
    desc: "An AI tool that generates effective and trending Instagram hashtags based on your keywords to maximize your post's reach.",
    icon: "https://cdn-icons-png.flaticon.com/128/7045/7045432.png",
    category: "Blog",
    slug: "instagram-hash-tag-generator",
    aiPrompt:
      "Generate 15 highly relevant and trending Instagram hashtags based on the provided keywords. Ensure the hashtags are optimized for increased reach and engagement.",
    form: [
      {
        label: "Enter Keywords for your Instagram hashtag",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post/Reel Idea",
    desc: "An AI tool that generates fresh, trending Instagram post and reel ideas based on your niche, ensuring maximum engagement.",
    icon: "https://cdn-icons-png.flaticon.com/128/1029/1029183.png",
    category: "Instagram",
    slug: "instagram-post-idea-generator",
    aiPrompt:
      "Generate 5-10 innovative and trending Instagram post/reel ideas based on your niche. Ensure the ideas are engaging, timely, and tailored to your target audience.",
    form: [
      {
        label: "Enter Keywords / Niche for your Instagram idea",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "English Grammar Check",
    desc: "An AI model designed to correct grammar and enhance the clarity of your English writing, ensuring polished and professional text.",
    icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
    category: "English",
    slug: "english-grammar-checker",
    aiPrompt:
      "Correct the grammar of the provided text, improving sentence structure, word choice, and overall readability. Ensure the text is polished and professional.",
    form: [
      {
        label: "Enter text to correct the grammar",
        field: "input",
        name: "inputText",
        required: true,
      },
    ],
  },
  {
    name: "Write Code",
    desc: "An AI model that generates programming code in any language based on your description, ensuring clean and efficient solutions.",
    icon: "https://cdn-icons-png.flaticon.com/128/6062/6062646.png",
    category: "Coding",
    slug: "write-code",
    aiPrompt:
      "Write code based on the given description, ensuring the code is clean, efficient, and written in the specified programming language. Provide the code in a properly formatted block.",
    form: [
      {
        label: "Enter description of code you want along with Programming Lang",
        field: "textarea",
        name: "codeDescription",
        required: true,
      },
    ],
  },
  {
    name: "Explain Code",
    desc: "An AI model that explains programming code line by line, offering a clear understanding of its functionality and purpose.",
    icon: "https://cdn-icons-png.flaticon.com/128/8488/8488751.png",
    category: "Coding",
    slug: "explain-code",
    aiPrompt:
      "Explain the given code line by line, detailing its functionality and purpose in a clear and easy-to-understand manner.",
    form: [
      {
        label: "Enter code which you want to understand",
        field: "textarea",
        name: "codeDescription",
        required: true,
      },
    ],
  },
  {
    name: "Code Bug Detector",
    desc: "This tool analyzes your input, detects bugs in the code, and provides clear solutions or alternatives for fixing the issues.",
    icon: "https://cdn-icons-png.flaticon.com/128/4426/4426267.png",
    category: "Code Bug Detector",
    slug: "code-bug-detector",
    aiPrompt:
      "Analyze the provided code for bugs, identify the issues, and offer detailed solutions and alternative fixes in a clear and straightforward manner.",
    form: [
      {
        label: "Enter code which you want to test bug",
        field: "textarea",
        name: "codeInput",
        required: true,
      },
    ],
  },
  {
    name: "Tagline Generator",
    desc: "An AI tool that generates catchy and memorable taglines for your brand or product, designed to stand out in the market.",
    icon: "https://cdn-icons-png.flaticon.com/128/2178/2178616.png",
    category: "Marketing",
    slug: "tagline-generator",
    aiPrompt:
      "Generate 5-10 creative and impactful taglines for the provided product or brand, ensuring they capture the essence of the business and resonate with the target audience.",
    form: [
      {
        label: "Product/Brand Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "What you are selling / Marketing",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Product Description",
    desc: "An AI-powered tool that generates engaging and SEO-optimized product descriptions designed to boost e-commerce sales.",
    icon: "https://cdn-icons-png.flaticon.com/128/679/679922.png",
    category: "Marketing",
    slug: "product-description",
    aiPrompt:
      "Generate a captivating and SEO-optimized product description based on the provided product name and details. Ensure the description highlights the product's features, benefits, and appeal.",
    form: [
      {
        label: "Product Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "Product Details",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
];
