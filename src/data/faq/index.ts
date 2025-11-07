// FAQ Data for Blog Posts
// Each export represents a FAQ list for a specific blog topic

export interface FAQItem {
  question: string;
  answer: string;
}

// 3D House Rendering Blog
export const faq_house_rendering: FAQItem[] = [
  {
    question: "What does 3D rendering mean in architecture?",
    answer: "It digitally converts 2D plans into realistic 3D visuals for better understanding."
  },
  {
    question: "How long does a 3D house render take?",
    answer: "Simple renders take 1–2 days; complex projects up to a week."
  },
  {
    question: "How much does a 3D render cost?",
    answer: "Usually between $300–$1,000 per view, depending on detail and revision count."
  },
  {
    question: "Which software is best for home rendering?",
    answer: "Blender for photorealism, Lumion and Twinmotion for speed, D5 for AI-assisted pipelines."
  },
  {
    question: "Can AI help in 3D rendering?",
    answer: "Yes — AI tools accelerate lighting setup and denoising for realism."
  },
  {
    question: "What deliverables should a client expect?",
    answer: "WebP/JPG images, MP4 videos, and optional scene files."
  }
];

// Cloud GPU Blog
export const faq_cloud_gpu: FAQItem[] = [
  {
    question: "What GPU do I need for deep learning?",
    answer: "For beginners learning ML, start with NVIDIA T4 or RTX 4070 Ti (8-16GB VRAM). For research and medium models, use A100 40GB or V100 32GB. For large language models (>10B parameters), use A100 80GB or H100."
  },
  {
    question: "How much does cloud GPU cost per hour?",
    answer: "Budget options (T4) cost $0.10-$0.50/hour. Mid-range GPUs (RTX 4090) cost $0.50-$1.50/hour. High-end data center GPUs (A100 40GB) cost $1.50-$3.50/hour. Spot instances offer 60-90% discounts."
  },
  {
    question: "Can I use cloud GPU for gaming?",
    answer: "Yes, cloud gaming services like GeForce NOW and Xbox Cloud Gaming provide GPU-powered gaming. However, for personal gaming, latency may make local hardware preferable."
  },
  {
    question: "Which cloud GPU is best for 3D rendering?",
    answer: "For 3D rendering, use RTX 6000 Ada (48GB), RTX 4090 (24GB), or A6000 (48GB). These support OptiX, CUDA, and excel in Blender, V-Ray, and Octane."
  },
  {
    question: "What is the difference between A100 and H100 GPUs?",
    answer: "H100 offers 3x faster AI training, 80GB HBM3 memory, and 4th-gen Tensor Cores with FP8 support. It costs 30-50% more but provides 2-3x performance for large models."
  }
];

// Cloud Computing Blog
export const faq_cloud_computing: FAQItem[] = [
  {
    question: "What are the 3 main types of cloud computing?",
    answer: "IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service). Each offers different levels of control and management."
  },
  {
    question: "Is cloud computing cheaper than on-premises?",
    answer: "For variable workloads and startups, yes. Cloud eliminates upfront hardware costs and reduces maintenance. However, for constant high-usage scenarios, on-premises may be more cost-effective long-term."
  },
  {
    question: "Which cloud provider is best?",
    answer: "AWS leads in market share and services. Azure excels in enterprise and Microsoft integration. Google Cloud is strong in AI/ML and data analytics. Choice depends on your specific needs."
  },
  {
    question: "How secure is cloud computing?",
    answer: "Major providers (AWS, Azure, GCP) offer enterprise-grade security with encryption, compliance certifications (SOC 2, ISO 27001, HIPAA), and dedicated security teams—often more robust than on-premises."
  },
  {
    question: "What is cloud migration strategy?",
    answer: "The 6 R's: Rehost (lift-and-shift), Replatform (lift-tinker-shift), Repurchase (move to SaaS), Refactor (re-architect), Retire (decommission), and Retain (keep on-premises)."
  }
];

// 3D Visualization Blog
export const faq_3d_visualization: FAQItem[] = [
  {
    question: "What is the difference between 3D visualization and 3D rendering?",
    answer: "3D visualization is the broader process including modeling, texturing, and lighting. 3D rendering is the specific computational step that generates final 2D images from the 3D scene."
  },
  {
    question: "How long does it take to create a 3D visualization?",
    answer: "Simple product renders take 1-3 days. Detailed architectural visualizations require 1-2 weeks. Complex animations may need 4-12 weeks depending on scope and detail."
  },
  {
    question: "What skills are needed to become a 3D visualization artist?",
    answer: "Proficiency in 3D software (Blender, 3ds Max), understanding of lighting and composition, knowledge of PBR materials, color theory, and basic photography/cinematography concepts."
  },
  {
    question: "Can I learn 3D visualization on my own?",
    answer: "Yes! Use free software like Blender and online courses (Udemy, YouTube). Practice 2-3 hours daily for 6-12 months to reach job-ready skills."
  },
  {
    question: "What is the best software for beginners in 3D visualization?",
    answer: "Blender is the top choice—completely free, comprehensive features, extensive tutorials, and active community support. Alternatives include SketchUp (easiest) and Cinema 4D (intuitive)."
  }
];

// AI Rendering Blog
export const faq_ai_rendering: FAQItem[] = [
  {
    question: "What is AI rendering?",
    answer: "AI rendering uses machine learning to accelerate 3D visualization by automating material assignment, lighting setup, denoising, and upscaling—reducing render times by 50-70%."
  },
  {
    question: "Which AI rendering tools are best?",
    answer: "D5 Render for real-time AI materials, NVIDIA OptiX for AI denoising, Topaz Gigapixel for upscaling, and NVIDIA Omniverse for collaborative workflows."
  },
  {
    question: "Can AI replace 3D artists?",
    answer: "No, AI enhances workflows but can't replace creative vision and artistic direction. AI handles repetitive tasks, allowing artists to focus on design and storytelling."
  },
  {
    question: "How much faster is AI rendering?",
    answer: "AI denoising reduces render times by 50-70%. AI material assignment saves 60% setup time. Overall, AI-assisted workflows are 2-5x faster than traditional methods."
  },
  {
    question: "Is AI rendering quality as good as traditional?",
    answer: "Yes, modern AI denoising (OptiX, OIDN) produces photorealistic quality indistinguishable from fully-sampled renders while using 50% fewer samples."
  }
];

// Image to 3D Blog
export const faq_image_to_3d: FAQItem[] = [
  {
    question: "How does image-to-3D conversion work?",
    answer: "AI models analyze 2D images to predict depth, geometry, and texture, generating 3D meshes. Technologies like NeRF and photogrammetry enable this transformation."
  },
  {
    question: "Which tools convert images to 3D models?",
    answer: "Kaedim, Luma AI, Polycam, and NVIDIA Instant NeRF are popular choices. Each offers different levels of automation and quality."
  },
  {
    question: "How accurate is image-to-3D conversion?",
    answer: "Accuracy depends on image quality and number of views. Single-image conversion is approximate; multi-view photogrammetry achieves 95%+ accuracy."
  },
  {
    question: "Can I convert a photo to a 3D model for free?",
    answer: "Yes, tools like Polycam (limited free tier), KIRI Engine, and Meshroom (open-source) offer free image-to-3D conversion with varying quality."
  }
];

// Digital Twins (AEC) Blog
export const faq_digital_twins: FAQItem[] = [
  {
    question: "What is a digital twin in construction?",
    answer: "A digital twin is a virtual replica of a physical building or infrastructure, updated in real-time with sensor data for monitoring, simulation, and optimization."
  },
  {
    question: "How do digital twins improve AEC workflows?",
    answer: "They enable predictive maintenance, energy optimization, clash detection, and real-time project monitoring—reducing costs by 20-30% and improving efficiency."
  },
  {
    question: "What software is used for digital twins?",
    answer: "Autodesk BIM 360, Bentley iTwin, NVIDIA Omniverse, and Microsoft Azure Digital Twins are industry-leading platforms."
  },
  {
    question: "How much does a digital twin cost?",
    answer: "Basic implementations start at $50,000-$100,000. Large infrastructure projects may cost $500,000+, but ROI typically justifies investment within 2-3 years."
  }
];

// Green Rendering / Sustainability Blog
export const faq_sustainable_rendering: FAQItem[] = [
  {
    question: "How does 3D rendering impact the environment?",
    answer: "Rendering consumes significant electricity. A single GPU farm can use 100-500 kW continuously. Carbon footprint depends on energy source and efficiency."
  },
  {
    question: "What is green rendering?",
    answer: "Green rendering uses renewable energy, optimized algorithms, and efficient hardware to minimize carbon footprint while maintaining quality."
  },
  {
    question: "How can I make my rendering workflow more sustainable?",
    answer: "Use cloud providers with renewable energy, optimize render settings, leverage AI denoising, and choose efficient GPUs like NVIDIA A100 over older models."
  },
  {
    question: "Which cloud providers use renewable energy?",
    answer: "Google Cloud (carbon-neutral since 2007), Microsoft Azure (100% renewable by 2025), and AWS (committed to 100% renewable by 2030)."
  }
];

// Generative AI Architecture Blog
export const faq_generative_ai_architecture: FAQItem[] = [
  {
    question: "What is generative AI in architecture?",
    answer: "Generative AI uses machine learning to automatically create design variations based on constraints like site, budget, and aesthetics—exploring thousands of options instantly."
  },
  {
    question: "Which tools offer generative design for architecture?",
    answer: "Autodesk Forma (formerly Spacemaker), TestFit, Finch, and Autodesk Generative Design are leading platforms."
  },
  {
    question: "Can AI design buildings better than architects?",
    answer: "No, AI generates options based on parameters, but architects provide creative vision, cultural context, and human-centric design that AI cannot replicate."
  },
  {
    question: "How does generative design save time?",
    answer: "It reduces initial design exploration from weeks to hours, testing thousands of layout variations automatically while architects focus on refinement and client interaction."
  }
];

// NeRF / Instant 3D Blog
export const faq_nerf_instant_3d: FAQItem[] = [
  {
    question: "What is NeRF in 3D rendering?",
    answer: "Neural Radiance Fields (NeRF) use neural networks to reconstruct photorealistic 3D scenes from 2D photos, enabling novel viewpoint synthesis."
  },
  {
    question: "How is Instant NeRF different from regular NeRF?",
    answer: "NVIDIA Instant NeRF trains in seconds (vs. hours for standard NeRF) using hash encoding and efficient GPU acceleration, making it practical for production use."
  },
  {
    question: "What are NeRF use cases?",
    answer: "Virtual tours, VFX, game asset creation, real estate visualization, and cultural heritage preservation. Any scenario requiring photorealistic 3D from photos."
  },
  {
    question: "Do I need special hardware for NeRF?",
    answer: "Modern NVIDIA GPUs (RTX 3000+ series) work well. Instant NeRF requires RTX GPUs for optimal performance. Cloud GPU options are also available."
  }
];

// Quantum Design / Future Tech Blog
export const faq_quantum_design: FAQItem[] = [
  {
    question: "What is quantum computing in design?",
    answer: "Quantum computing leverages quantum mechanics for exponentially faster simulations—useful for complex structural analysis, material science, and optimization problems."
  },
  {
    question: "When will quantum design be practical?",
    answer: "Current quantum computers are experimental. Practical architectural applications are expected by 2028-2030 as quantum hardware matures and becomes accessible."
  },
  {
    question: "How will quantum computing change architecture?",
    answer: "It will enable real-time simulation of complex systems, instant optimization of thousands of variables, and molecular-level material design impossible with classical computers."
  }
];

// Add more FAQ lists as needed for other blog topics

// 3D Product Rendering Blog
export const faq_product_rendering: FAQItem[] = [
  {
    question: "What is 3D product rendering?",
    answer: "It's the process of converting digital models into lifelike product visuals for marketing, design, or eCommerce."
  },
  {
    question: "Which software is best for 3D rendering?",
    answer: "KeyShot, Blender, and Adobe Substance 3D are the most widely used tools for realistic visualization."
  },
  {
    question: "How much does product rendering cost?",
    answer: "Freelance projects start around $100–$500 per render; enterprise campaigns can exceed $10,000."
  },
  {
    question: "How does 3D rendering help eCommerce?",
    answer: "It increases engagement, reduces returns, and provides immersive shopping experiences."
  },
  {
    question: "Can AI improve rendering?",
    answer: "Yes — AI tools optimize materials, lighting, and denoising to accelerate output by up to 60%."
  },
  {
    question: "What is the difference between 3D rendering and 3D visualization?",
    answer: "Rendering is the process of creating photorealistic images, while visualization is the broader process including interaction and animation."
  }
];
