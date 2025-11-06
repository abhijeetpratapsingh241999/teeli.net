"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Brain,
  Network,
  Cpu,
  Database,
  Zap,
  Code,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Activity,
  Target,
  BarChart3,
  FileCode,
  GitBranch,
  Cloud,
  Lock,
  Rocket,
  Cpu as Processor,
  Bot,
  Lightbulb,
  CircuitBoard
} from 'lucide-react';
import Link from 'next/link';

export default function AIMLStackPage() {
  const [selectedLayer, setSelectedLayer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mlStackLayers = [
    {
      id: 0,
      title: "Deep Learning",
      description: "Neural networks and deep learning frameworks",
      icon: Brain,
      tech: ["TensorFlow", "PyTorch", "Keras", "JAX"],
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 1,
      title: "Training Infrastructure",
      description: "Distributed training and model optimization",
      icon: Zap,
      tech: ["Horovod", "DeepSpeed", "FSDP", "Megatron"],
      color: "from-orange-500 to-red-600"
    },
    {
      id: 2,
      title: "Data Processing",
      description: "Data pipelines and preprocessing",
      icon: Database,
      tech: ["Apache Spark", "Pandas", "Dask", "Ray"],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 3,
      title: "Model Serving",
      description: "Production ML model deployment",
      icon: Rocket,
      tech: ["TensorRT", "ONNX", "Triton", "TorchServe"],
      color: "from-red-500 to-pink-600"
    },
    {
      id: 4,
      title: "MLOps Pipeline",
      description: "Continuous integration and deployment",
      icon: GitBranch,
      tech: ["MLflow", "Kubeflow", "Weights & Biases", "DVC"],
      color: "from-rose-500 to-pink-600"
    },
    {
      id: 5,
      title: "Inference Engine",
      description: "Real-time inference and optimization",
      icon: CircuitBoard,
      tech: ["TensorRT", "OpenVINO", "CoreML", "NCNN"],
      color: "from-magenta-500 to-purple-600"
    }
  ];

  const capabilities = [
    {
      title: "Model Training",
      description: "Distributed training across multiple GPUs",
      icon: Brain,
      metric: "1000+ GPUs"
    },
    {
      title: "Inference Speed",
      description: "Ultra-low latency inference",
      icon: Zap,
      metric: "< 5ms"
    },
    {
      title: "Model Accuracy",
      description: "State-of-the-art model performance",
      icon: Target,
      metric: "99.9%"
    },
    {
      title: "Data Throughput",
      description: "High-speed data processing",
      icon: Activity,
      metric: "10TB/s"
    }
  ];

  const frameworks = [
    {
      category: "Deep Learning",
      items: ["TensorFlow 2.x", "PyTorch 2.0", "JAX", "Flux.jl"]
    },
    {
      category: "ML Libraries",
      items: ["scikit-learn", "XGBoost", "LightGBM", "CatBoost"]
    },
    {
      category: "Computer Vision",
      items: ["OpenCV", "Albumentations", "Detectron2", "YOLO"]
    },
    {
      category: "NLP",
      items: ["Transformers", "Hugging Face", "spaCy", "NLTK"]
    }
  ];

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-purple-950 via-pink-950 to-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Neural Network Visualization */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        {/* Matrix-style Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0"}></div>
        </div>

        {/* Animated Neural Network Nodes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const x = (i % 5) * 20 + 10 + Math.random() * 5;
            const y = Math.floor(i / 5) * 20 + 10 + Math.random() * 5;
            return (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-pink-500"%`,
                  top: `${y}%`,
                }}}}
              />
            );
          })}
          
          {/* Connection Lines */}
          {[...Array(15)].map((_, i) => {
            const startX = (i % 5) * 20 + 12;
            const startY = Math.floor(i / 5) * 20 + 12;
            const endX = ((i + 1) % 5) * 20 + 12;
            const endY = Math.floor((i + 1) / 5) * 20 + 12;
            
            if (i % 5 === 4) return null; // Skip connections at row end
            
            return (
              <motion.svg
                key={`line-${i}`}
                className="absolute inset-0 pointer-events-none"}
              >
                <line
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="rgba(236, 72, 153, 0.2)"
                  strokeWidth="1"}}
                />
              </motion.svg>
            );
          })}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <div}}}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-sm">
              <Brain className="w-5 h-5 text-pink-400" />
              <span className="text-pink-400 font-semibold text-sm uppercase tracking-wider">AI & Machine Learning Stack</span>
            </div>
          </div>

          {/* Main Title */}
          <h1}}}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center leading-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400">
              Enterprise
            </span>
            <span className="block text-white mt-2">AI & ML Stack</span>
          </h1>

          <p}}}
            className="text-xl md:text-2xl text-pink-200/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Complete machine learning infrastructure from training to production with cutting-edge frameworks and tools.
          </p>

          {/* Neural Network Layer Visualization */}
          <div}}}
            className="relative w-full max-w-6xl mx-auto mb-12"
          >
            <div className="relative">
              {/* Network Layers */}
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                {mlStackLayers.map((layer, index) => {
                  const Icon = layer.icon;
                  const isSelected = selectedLayer === layer.id;

                  return (
                    <div
                      key={layer.id}}}}
                      onClick={() => setSelectedLayer(layer.id)}
                      className="cursor-pointer group relative"
                    >
                      {/* Node */}
                      <div}
                        className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${layer.color} ${
                          isSelected ? 'ring-4 ring-pink-400 ring-offset-4 ring-offset-black' : ''
                        } flex items-center justify-center transition-all duration-300 shadow-lg`}
                      >
                        <Icon className="w-12 h-12 md:w-14 md:h-14 text-white" />
                        
                        {/* Pulse Effect */}
                        {isSelected && (
                          <div}}
                            className="absolute inset-0 rounded-full bg-pink-400"
                          />
                        )}
                      </div>

                      {/* Label */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32">
                        <p className={`text-xs md:text-sm font-bold text-center ${
                          isSelected ? 'text-pink-400' : 'text-pink-300/70'
                        } transition-colors`}>
                          {layer.title}
                        </p>
                      </div>

                      {/* Connection Lines to Next Node */}
                      {index < mlStackLayers.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-pink-500/50 to-transparent transform -translate-y-1/2 z-0"}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Layer Details */}
          <div
            key={selectedLayer}}}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative rounded-2xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-950/60 to-black/60 backdrop-blur-xl p-8">
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                {mlStackLayers[selectedLayer]?.title}
              </h3>
              <p className="text-lg text-pink-200/80 mb-6 leading-relaxed">
                {mlStackLayers[selectedLayer]?.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {mlStackLayers[selectedLayer]?.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-300 text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div}}}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <button}}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-lg shadow-lg shadow-pink-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Explore Stack
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl border-2 border-pink-500/30 bg-pink-500/10 text-pink-400 font-bold text-lg hover:bg-pink-500/20 transition-all flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                View Docs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities - Grid Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Stack Capabilities
            </h2>
            <p className="text-lg text-pink-200/80 max-w-3xl mx-auto">
              Enterprise-grade AI/ML infrastructure performance metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}}}}}
                  className="relative rounded-2xl border-2 border-pink-700/30 bg-gradient-to-br from-purple-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-pink-500/50 transition-all group overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-pink-400 mb-2">{capability.metric}</div>
                    <h4 className="font-heading text-lg font-bold text-white mb-2">{capability.title}</h4>
                    <p className="text-sm text-pink-200/70 leading-relaxed">{capability.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Framework Stack - Grid Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Supported Frameworks
            </h2>
            <p className="text-lg text-pink-200/80 max-w-3xl mx-auto">
              Comprehensive ML framework support and ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((framework, index) => (
              <div
                key={index}}}}}
                className="relative rounded-2xl border-2 border-pink-700/30 bg-gradient-to-br from-purple-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-pink-500/50 transition-all"
              >
                <h3 className="font-heading text-xl font-bold text-white mb-4">{framework.category}</h3>
                <div className="space-y-2">
                  {framework.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                      <span className="text-sm text-pink-200/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ML Pipeline - Flow Visualization */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              ML Pipeline Architecture
            </h2>
            <p className="text-lg text-pink-200/80 max-w-3xl mx-auto">
              End-to-end machine learning workflow from data to deployment
            </p>
          </div>

          {/* Pipeline Flow */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-600 hidden md:block transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { title: "Data Ingestion", icon: Database, color: "from-pink-500 to-rose-600" },
                { title: "Preprocessing", icon: Layers, color: "from-rose-500 to-pink-600" },
                { title: "Training", icon: Brain, color: "from-orange-500 to-red-600" },
                { title: "Validation", icon: Target, color: "from-red-500 to-pink-600" },
                { title: "Deployment", icon: Rocket, color: "from-pink-600 to-rose-600" }
              ].map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={index}}}}}
                    className="relative"
                  >
                    {/* Connection Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                      <div className="w-4 h-4 rounded-full bg-pink-500 border-4 border-black"></div>
                    </div>

                    {/* Stage Card */}
                    <div className="relative rounded-2xl border-2 border-pink-700/30 bg-gradient-to-br from-purple-950/60 to-black/60 backdrop-blur-xl p-6 text-center">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">{stage.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-purple-950/40 via-pink-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            {/* Background Pattern - Neural Network */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0"}></div>
            </div>

            <div}}}}
              className="relative z-10"
            >
              <Brain className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Build AI?
              </h2>
              <p className="text-xl text-pink-200/80 mb-8 max-w-2xl mx-auto">
                Get started with our enterprise AI & ML stack. Build, train, and deploy models at scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button}}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-lg shadow-lg shadow-pink-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-pink-500/30 bg-pink-500/10 text-pink-400 font-bold text-lg hover:bg-pink-500/20 transition-all flex items-center gap-2">
                    <FileCode className="w-5 h-5" />
                    Documentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
