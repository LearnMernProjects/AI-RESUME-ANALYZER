import React from 'react'

interface ATSProps {
  score: number;
  suggestions: {
    type: "good" | "improve";
    tip: string;
  }[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Determine background gradient based on score
  const getBgGradient = () => {
    if (score > 69) return 'from-green-100 to-green-50';
    if (score > 49) return 'from-yellow-100 to-yellow-50';
    return 'from-red-100 to-red-50';
  };

  // Determine icon and color based on score
  const getIcon = () => {
    return score > 69 ? '/icons/ats-good.svg' : '/icons/ats-warning.svg';
  };

  const getTextColor = () => {
    if (score > 69) return 'text-green-600';
    if (score > 49) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSuggestionIcon = (type: "good" | "improve") => {
    return type === "good" ? '/icons/check.svg' : '/icons/warning.svg';
  };

  return (
    <div className={`bg-gradient-to-br ${getBgGradient()} rounded-2xl shadow-md p-8 space-y-6`}>
      {/* Top Section with Icon and Score */}
      <div className='flex flex-col lg:flex-row items-start lg:items-center gap-6'>
        <div className='flex-shrink-0'>
          <img src={getIcon()} alt="ATS Status" className='w-16 h-16 lg:w-20 lg:h-20' />
        </div>
        <div className='flex-1'>
          <h3 className={`text-3xl lg:text-4xl font-bold ${getTextColor()} mb-2`}>
            ATS Score - {score}/100
          </h3>
          <p className='text-gray-600 text-lg'>
            Applicant Tracking System Compatibility
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className='space-y-3 bg-white bg-opacity-60 rounded-lg p-4'>
        <h4 className='text-lg font-semibold text-gray-800'>How Your Resume Performs</h4>
        <p className='text-gray-700'>
          {score > 69 
            ? "Your resume is well-optimized for ATS systems. It should pass through most applicant tracking systems without issues."
            : score > 49
            ? "Your resume has a decent ATS score, but there are areas for improvement to ensure it gets through more systems."
            : "Your resume may struggle with ATS systems. Consider addressing the suggestions below to improve compatibility."}
        </p>
      </div>

      {/* Suggestions List */}
      <div className='space-y-3'>
        <h4 className='text-lg font-semibold text-gray-800'>Suggestions for Improvement</h4>
        <div className='space-y-2'>
          {suggestions && suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div key={index} className='flex gap-3 items-start bg-white bg-opacity-50 p-3 rounded-lg'>
                <img 
                  src={getSuggestionIcon(suggestion.type)} 
                  alt={suggestion.type} 
                  className='w-5 h-5 mt-0.5 flex-shrink-0'
                />
                <p className='text-gray-700 flex-1'>{suggestion.tip}</p>
              </div>
            ))
          ) : (
            <p className='text-gray-600 italic'>No suggestions at this time.</p>
          )}
        </div>
      </div>

      {/* Closing Encouragement */}
      <div className='border-t border-gray-300 pt-6 text-center'>
        <p className='text-gray-700 font-semibold'>
          {score > 69 
            ? "✅ Great job! Your resume is ATS-friendly."
            : score > 49
            ? "📈 Keep improving! Make these adjustments to boost your ATS score."
            : "💪 Don't worry! Follow the suggestions to make your resume ATS-compatible."}
        </p>
      </div>
    </div>
  );
}

export const score = null;

export default ATS
