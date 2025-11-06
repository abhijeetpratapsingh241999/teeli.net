import Image from 'next/image';

/**
 * Visual Diagram Component for Blog Posts
 * Increases dwell time and engagement by adding visual anchors after H2 sections
 */

interface VisualDiagramProps {
  type: 'comparison' | 'workflow' | 'architecture' | 'timeline';
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function VisualDiagram({ type, title, description, imageSrc, imageAlt }: VisualDiagramProps) {
  // Placeholder diagrams for different types
  const placeholders = {
    comparison: {
      title: 'Before vs After Comparison',
      bgGradient: 'from-cyan-500/10 to-purple-500/10',
      icon: '⚡',
      defaultAlt: 'Visual comparison diagram showing before and after results'
    },
    workflow: {
      title: 'Step-by-Step Process',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      icon: '🔄',
      defaultAlt: 'Workflow diagram showing process steps'
    },
    architecture: {
      title: 'System Architecture',
      bgGradient: 'from-green-500/10 to-cyan-500/10',
      icon: '🏗️',
      defaultAlt: 'Technical architecture diagram'
    },
    timeline: {
      title: 'Timeline Overview',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      icon: '📊',
      defaultAlt: 'Timeline visualization diagram'
    }
  };

  const config = placeholders[type];

  return (
    <div className="my-8 md:my-12 group">
      <div className="relative rounded-2xl border-2 border-cyan-500/20 bg-gradient-to-br from-black/40 via-purple-950/20 to-black/40 backdrop-blur-sm p-6 md:p-8 transition-all hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(0,255,255,0.15)]">
        {/* Visual Content */}
        {imageSrc ? (
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 aspect-video">
            <Image 
              src={imageSrc} 
              alt={imageAlt || config.defaultAlt}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          // Placeholder diagram
          <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${config.bgGradient} p-12 md:p-16 text-center`}>
            <div className="text-6xl md:text-8xl mb-4">{config.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {title || config.title}
            </h3>
            {description && (
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Caption */}
        {(title || description) && imageSrc && (
          <div className="mt-4 text-center">
            {title && (
              <h4 className="text-lg font-semibold text-cyan-300 mb-1">
                {title}
              </h4>
            )}
            {description && (
              <p className="text-sm text-zinc-500">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
