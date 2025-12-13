import React from 'react'
import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'
import type { Feedback } from '~/lib/puter'

const Category =({title,score}: {title:string, score :number})=>{
     const textColor= score>70 ?'text-green-600'  : score>49 ? 'text-yellow-600' : 'text-red-600';
     return(
     <div className='resume-summary'>
          <div className='category'>
               <div className='flex flex-row gap-3 items-center justify-center'>
                    <p className='text-2xl'>
                         {title}
                    </p>
                    <ScoreBadge score={score} />
               </div>
               <p className='text-2xl '>
                    <span className={textColor}>
                         {score} </span>

               </p>
</div>
     </div>
     )
}
const Summary = ({feedback}:{feedback:Feedback}) => {
  // Calculate overall score if not provided
  const overallScore = feedback.overallScore || Math.round(
    (feedback.ATS.score + 
     feedback.toneAndStyle.score + 
     feedback.content.score + 
     feedback.structure.score + 
     feedback.skills.score) / 5
  );

  return (
    <div className='bg-white rounded-2xl shadow-md w-full overflow-hidden'>
     <div className='flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-6 gap-6 lg:gap-8'>
          <div className='flex-shrink-0'>
            <ScoreGauge score={overallScore}/>
          </div>
          <div className='flex flex-col gap-2 flex-1 text-center lg:text-left'>
               <h2 className='text-2xl font-bold'>Your Resume Score

               </h2>
               <p className='text-sm text-gray-500'>
                    This score is calculated based on the variables listed below
               </p>
          </div>
     </div>
      <div className='flex flex-col gap-2'>
        <Category title="Tone & Style" score={feedback.toneAndStyle.score}/>
        <Category title="Content" score={feedback.content.score}/>
        <Category title="Structure" score={feedback.structure.score}/>
        <Category title="Skills" score={feedback.skills.score}/>
      </div>


    </div>
  )
}

export default Summary
