import React, { type FormEvent } from 'react' // 
import Navbar from '~/components/Navbar'
import { useState } from 'react'
import FileUploader from '~/components/FileUploader'
import { usePuterStore } from '~/lib/puter'
import { useNavigate } from 'react-router'
import { convertPdfToImage } from '~/lib/pdf2image'
import { AIResponseFormat, prepareInstructions } from '../../constants'
import { generateUUID } from '~/lib/utils'
const Upload = () => {
const {auth, isLoading, fs, ai ,kv}= usePuterStore();
const  navigate= useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState(''); 
    const [file, setFile]= useState<File | null>(null);
    const handleFileSelect =(file: File | null) =>{
setFile(file)
    }
    // Corrected handleSubmit function signature to use FormEvent
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setIsProcessing(true);
        setStatusText("Uploading resume...");
        console.debug("[Upload] submit started");
        try {
            const form= e.currentTarget.closest('form');
            if(!form) return;
            const formData= new FormData(form)  ;
            const companyName=formData.get('company-name') as string;
            const jobTitle=formData.get('Job-title') as string;
            const jobDescription =formData.get('job-description') as string;

        
            if(!file) {
                setStatusText("Error while uploading file occured");
                setIsProcessing(false);
                console.error("[Upload] No file selected");
                return;
            }
            console.debug("[Upload] uploading PDF");
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile?.path) {
                setStatusText("Failed to upload resume");
                setIsProcessing(false);
                console.error("[Upload] PDF upload failed", uploadedFile);
                return;
            }
            setStatusText("Converting to image....");
            console.debug("[Upload] converting PDF to image");
            const imageFile= await convertPdfToImage(file);
            if (!imageFile.file) {
                setStatusText("Error converting PDF to image");
                setIsProcessing(false);
                console.error("[Upload] PDF to image failed", imageFile.error);
                return;
            }
            setStatusText("Uploading the image")
            console.debug("[Upload] uploading image");
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage?.path) {
                setStatusText("Failed to upload image");
                setIsProcessing(false);
                console.error("[Upload] image upload failed", uploadedImage);
                return;
            }
            setStatusText("preparing data......")
            const uuid= generateUUID();
            const data= {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback:"",
            }
            await kv.set(`resume:${uuid}` ,JSON.stringify(data));
        setStatusText("Analyzing your Resume content")
        console.debug("[Upload] calling AI feedback");
        const feedback= await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
        )
        if (!feedback) {
            setStatusText("Error Failed to analyze resume ");
            setIsProcessing(false);
            console.error("[Upload] feedback response empty");
            return;
        }
        const feedbackText= typeof feedback.message.content==="string" ? feedback.message.content : feedback.message.content[0].text;
        const cleanFeedbackText = feedbackText
          // remove Markdown code fences if present
          .replace(/```json\s*/i, "")
          .replace(/```$/, "")
          .trim();
        try{
            data.feedback =JSON.parse(cleanFeedbackText);
        }catch(parseErr){
            console.error("[Upload] failed to parse feedback", parseErr, feedbackText);
            data.feedback = feedbackText;
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText("Analyzing complete redirecting")
        console.log(data);
        } catch (err) {
            const message =
              err instanceof Error
                ? err.message
                : typeof err === "string"
                ? err
                : JSON.stringify(err);
            console.error("Upload flow error", err, message, (err as any)?.stack);
            setStatusText(`Unexpected error during upload: ${message}`);
        } finally {
            setIsProcessing(false);
        }

    }
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading">
                    <h1> Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full " alt="Resume scanning animation"/>
                        </>
                    ) : (
                        <h2> drop your resume for an ATS Score</h2>
                    )}
                    
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8 '>
                            <div className="form-div">
                             
                                <label htmlFor="company-name">Company Name</label>
                                <input 
                                    type="text" 
                                    id="company-name" 
                                    name="company-name"
                                    placeholder="Enter Company Name" 
                                />
                            </div>
                            <div className="form-div">
                             
                             <label htmlFor="Job-title">Job Title</label>
                             <input 
                                 type="text" 
                                 id="Job-title" 
                                 name="Job-title"
                                 placeholder="Enter Job Name" 
                             />
                         </div>
                         <div className="form-div">
                             
                             <label htmlFor="job-description">Job Description</label>
                             <textarea rows={5} cols={2} placeholder="Enter Job Description" id="job-description" name="job-description"
                             />
                         </div>
                         <div className="form-div">
                             
                             <label htmlFor="uploader">Upload Resume</label>
                            <div><FileUploader onFileSelect={handleFileSelect}/> </div>
                   
                         </div>






                            <div className="form-div">
                                <label htmlFor="resume-file">Upload Resume (PDF)</label>
                                <input 
                                    type="file" 
                                    id="resume-file" 
                                    name="resume-file" 
                                    accept=".pdf"
                                />
                            </div>
                            <button className='primary-button' type="submit"> Analyze Resume</button>
                           
                     
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Upload;