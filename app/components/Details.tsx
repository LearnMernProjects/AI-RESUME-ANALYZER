import React, { useState } from 'react'
import type { Feedback } from '~/lib/puter';

interface DetailsProps {
  feedback: Feedback;
}

// Helper Component: ScoreBadge
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadgeDetail: React.FC<ScoreBadgeProps> = ({ score }) => {
  let bgColor = '';
  let textColor = '';
  let icon = '';

  if (score > 70) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-600';
    icon = '✓';
  } else if (score > 50) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-600';
    icon = '!';
  } else {
    bgColor = 'bg-red-100';
    textColor = 'text-red-600';
    icon = '!';
  }

  return (
    <div className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1`}>
      <span className='text-lg'>{icon}</span>
      <span>{score}/100</span>
    </div>
  );
};

// Accordion Section Component
interface AccordionSectionProps {
  title: string;
  score: number;
  tips: {
    type: "good" | "improve";
    tip: string;
    explanation: string;
  }[];
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  score,
  tips,
  isOpen,
  onToggle,
}) => {
  return (
    <div className='border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm'>
      {/* Header */}
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors'
      >
        <div className='flex items-center gap-4'>
          <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
          <ScoreBadgeDetail score={score} />
        </div>
        <svg
          className={`w-6 h-6 text-gray-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 14l-7 7m0 0l-7-7m7 7V3'
          />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className='bg-gray-50 border-t border-gray-200 p-4 space-y-3'>
          {tips && tips.length > 0 ? (
            tips.map((tip, index) => (
              <div key={index} className='flex gap-3 items-start bg-white p-3 rounded-lg'>
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    tip.type === 'good'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {tip.type === 'good' ? '✓' : '!'}
                </div>
                <div className='flex-1'>
                  <p className='font-semibold text-gray-800'>{tip.tip}</p>
                  <p className='text-sm text-gray-600 mt-1'>{tip.explanation}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-500 italic text-center py-2'>No tips available</p>
          )}
        </div>
      )}
    </div>
  );
};

// Main Details Component
const Details = ({ feedback }: DetailsProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    toneAndStyle: false,
    content: false,
    structure: false,
    skills: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      key: 'toneAndStyle',
      title: 'Tone & Style',
      score: feedback.toneAndStyle.score,
      tips: feedback.toneAndStyle.tips,
    },
    {
      key: 'content',
      title: 'Content',
      score: feedback.content.score,
      tips: feedback.content.tips,
    },
    {
      key: 'structure',
      title: 'Structure',
      score: feedback.structure.score,
      tips: feedback.structure.tips,
    },
    {
      key: 'skills',
      title: 'Skills',
      score: feedback.skills.score,
      tips: feedback.skills.tips,
    },
  ];

  return (
    <div className='bg-white rounded-2xl shadow-md p-6 space-y-4'>
      <h2 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-6'>
        Detailed Feedback
      </h2>

      <div className='space-y-2'>
        {sections.map((section) => (
          <AccordionSection
            key={section.key}
            title={section.title}
            score={section.score}
            tips={section.tips}
            isOpen={openSections[section.key]}
            onToggle={() => toggleSection(section.key)}
          />
        ))}
      </div>
    </div>
  );
}

export default Details
