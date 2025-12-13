import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router';
import { usePuterStore, type Feedback } from '~/lib/puter';
import type { PdfConversionResult } from '~/lib/pdf2image';
import Summary from '~/components/Summary';
import ATS from '~/components/ATS';
import Details from '~/components/Details';
import { score } from '~/components/ATS';
export const meta = () => [
    { title: "Resumind | Review" },
    { name: "description", content: "Log onto your account" },
];

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    // Track generated assets; start undefined until async load completes
    const [imageUrl, setImageUrl] = useState<PdfConversionResult['imageUrl']>();
    const [resumeUrl, setResumeUrl] = useState<string | undefined>();
    const [feedback, setFeedback] = useState<Feedback | null>();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated)
           navigate(`/auth?next=/resume/${id}`)
    }, [auth.isAuthenticated, navigate, id]);

    useEffect(() => {
        const loadResume = async () => {
            if (!id) return;
            
            const resume = await kv.get(`resume:${id}`);
            
            if (!resume) return;
            const data = JSON.parse(resume);
            
            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;
            
            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);
            
            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            
            // Fixed: Typo 'createobjectURL' -> 'createObjectURL'
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback:data.feedback})
        };

        loadResume();
    }, [id, kv, fs]);

    return (
        <main className='pt-0!'>
            <nav className='resume-nav'>
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" className="h-2.5 w-2.5" alt="Back" />
                    <span className='text-gray-800 text-sm font-semibold'>
                        Back to Homepage
                    </span>
                </Link>
            </nav>
            <div className='flex flex-col lg:flex-row w-full gap-4 lg:gap-6 p-4 lg:p-6'>
                <section className="flex-1 min-w-0">
                <section className='bg-white rounded-2xl shadow-md p-6 space-y-6'>
                    <h2 className='text-2xl lg:text-4xl font-bold text-black'> Resume Review</h2>
                    {feedback ?(
                         <div className='flex flex-col gap-6 lg:gap-8 animate-in fade-in duration-1000 '>
                          <Summary feedback={feedback}/>
                          <ATS score={feedback?.ATS?.score || 0} suggestions={feedback?.ATS?.tips || []}/>
                          <Details feedback={feedback}/>

                         </div>) :(
                              <img src="/images/resume-scan-2.gif" className='w-full'/>
                         
                    )}
                </section>
                </section>
                    {imageUrl && resumeUrl && (
                        <div className='animate-in fade-in duration-1000 gradient-border flex-1 min-w-0 flex items-center justify-center'>
                         <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className='w-full h-full block'>
                              <img src={imageUrl} className='w-full h-full object-contain rounded-2xl' title="resume"/>
                         </a>
                        </div>
                    )}
            </div>
          
        </main>
    )
}

export default Resume