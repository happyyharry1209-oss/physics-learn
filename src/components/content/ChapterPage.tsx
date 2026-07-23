import type { ChapterData, Level } from '@/types/content';
import type { QuizData } from '@/types/quiz';
import Sidebar from '@/components/layout/Sidebar';
import Badge from '@/components/ui/Badge';
import MarkdownRenderer from './MarkdownRenderer';
import TableOfContents from './TableOfContents';
import Quiz from './Quiz';
import AiAssistant from './AiAssistant';
import BuoyancySimulator from '@/components/sim/BuoyancySimulator';
import DopplerSimulator from '@/components/sim/DopplerSimulator';
import LensRayTracer from '@/components/sim/LensRayTracer';
import HeatingCurve from '@/components/sim/HeatingCurve';
import MagneticForceSim from '@/components/sim/MagneticForceSim';
import ProjectileSim from '@/components/sim/ProjectileSim';
import InclinedPlaneSim from '@/components/sim/InclinedPlaneSim';
import RollerCoasterSim from '@/components/sim/RollerCoasterSim';
import CollisionSim from '@/components/sim/CollisionSim';
import KeplerSim from '@/components/sim/KeplerSim';
import ParticleDeflectionSim from '@/components/sim/ParticleDeflectionSim';
import RCCircuitSim from '@/components/sim/RCCircuitSim';
import FaradaySim from '@/components/sim/FaradaySim';
import DoubleSlitSim from '@/components/sim/DoubleSlitSim';
import BohrSim from '@/components/sim/BohrSim';
import DoublePendulumSim from '@/components/sim/DoublePendulumSim';
import SkinDepthSim from '@/components/sim/SkinDepthSim';
import QuantumWellSim from '@/components/sim/QuantumWellSim';
import BlackHoleSim from '@/components/sim/BlackHoleSim';
import BindingEnergySim from '@/components/sim/BindingEnergySim';
import BandStructureSim from '@/components/sim/BandStructureSim';
import FeynmanSim from '@/components/sim/FeynmanSim';
import CarnotDiagram from '@/components/sim/CarnotDiagram';

interface ChapterPageProps {
  level: Level;
  chapter: ChapterData;
  chapters: { slug: string; frontmatter: ChapterData['frontmatter'] }[];
  quizData: QuizData | null;
}

export default function ChapterPage({ level, chapter, chapters, quizData }: ChapterPageProps) {
  return (
    <div className="flex">
      <Sidebar level={level} chapters={chapters} />
      <div className="flex min-h-screen flex-1">
        <article className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <Badge level={level} />
              <span className="text-xs text-zinc-400">第 {chapter.frontmatter.order} 章</span>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {chapter.frontmatter.title}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {chapter.frontmatter.description}
            </p>
            {chapter.frontmatter.topics && chapter.frontmatter.topics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {chapter.frontmatter.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content + TOC */}
          <div className="flex gap-8">
            <div className="min-w-0 flex-1">
              <div className="prose-custom max-w-none">
                <MarkdownRenderer content={chapter.content} />
              </div>

              {/* Interactive Simulations */}
              {level === 'junior' && chapter.slug === '01-mechanics' && <BuoyancySimulator />}
              {level === 'junior' && chapter.slug === '02-sound' && <DopplerSimulator />}
              {level === 'junior' && chapter.slug === '03-optics' && <LensRayTracer />}
              {level === 'junior' && chapter.slug === '04-thermal' && <HeatingCurve />}
              {level === 'junior' && chapter.slug === '06-magnetism' && <MagneticForceSim />}
              {level === 'senior' && chapter.slug === '01-kinematics' && <ProjectileSim />}
              {level === 'senior' && chapter.slug === '02-dynamics' && <InclinedPlaneSim />}
              {level === 'senior' && chapter.slug === '03-energy' && <RollerCoasterSim />}
              {level === 'senior' && chapter.slug === '04-momentum' && <CollisionSim />}
              {level === 'senior' && chapter.slug === '05-circular-gravity' && <KeplerSim />}
              {level === 'senior' && chapter.slug === '06-electrostatics' && <ParticleDeflectionSim />}
              {level === 'senior' && chapter.slug === '07-circuits' && <RCCircuitSim />}
              {level === 'senior' && chapter.slug === '08-magnetism-induction' && <FaradaySim />}
              {level === 'senior' && chapter.slug === '09-waves-optics' && <DoubleSlitSim />}
              {level === 'senior' && chapter.slug === '10-modern-physics' && <BohrSim />}
              {level === 'university' && chapter.slug === '01-classical-mechanics' && <DoublePendulumSim />}
              {level === 'university' && chapter.slug === '02-electromagnetism' && <SkinDepthSim />}
              {level === 'university' && chapter.slug === '04-quantum-mechanics' && <QuantumWellSim />}
              {level === 'university' && chapter.slug === '05-relativity' && <BlackHoleSim />}
              {level === 'university' && chapter.slug === '06-atomic-nuclear' && <BindingEnergySim />}
              {level === 'university' && chapter.slug === '07-solid-state' && <BandStructureSim />}
              {level === 'university' && chapter.slug === '08-particle-physics' && <FeynmanSim />}
              {level === 'university' && chapter.slug === '03-thermodynamics' && <CarnotDiagram />}

              {/* Quiz */}
              {quizData && quizData.questions.length > 0 && (
                <div className="mt-12">
                  <Quiz questions={quizData.questions} />
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 flex items-center justify-between border-t border-zinc-200 py-6 dark:border-zinc-800">
                <div>
                  {chapters[0] && chapter.frontmatter.order > 1 && (
                    <a
                      href={`/${level}/${chapters[chapter.frontmatter.order - 2].slug}`}
                      className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      ← {chapters[chapter.frontmatter.order - 2].frontmatter.title}
                    </a>
                  )}
                </div>
                <div className="text-right">
                  {chapters[chapter.frontmatter.order] && (
                    <a
                      href={`/${level}/${chapters[chapter.frontmatter.order].slug}`}
                      className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      {chapters[chapter.frontmatter.order].frontmatter.title} →
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right-side TOC */}
            <TableOfContents content={chapter.content} />
          </div>
        </article>
      </div>

      {/* AI Assistant FAB */}
      <AiAssistant chapterTitle={chapter.frontmatter.title} chapterContent={chapter.content} />
    </div>
  );
}
