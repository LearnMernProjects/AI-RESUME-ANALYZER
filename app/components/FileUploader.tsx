import React from 'react'
import  {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

/**
 * Formats a number of bytes into a human-readable string
 * @param bytes - The number of bytes to format
 * @returns A human-readable string (e.g., "1.5 MB", "500 KB", "2 GB")
 */
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Handle edge case where bytes is less than 1 KB
  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }
  
  // Format to 1 decimal place for KB, MB, GB
  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(1)} ${sizes[i]}`;
}

interface FileUploaderProps {
     onFileSelect?: (file: File | null) => void;
}
const FileUploader = ({onFileSelect}: FileUploaderProps) => {
     const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
     const [file, setFile] = useState<File | null>(null);
     const onDrop = useCallback((acceptedFiles: File[]) => {
          const selectedFile = acceptedFiles[0] || null;
          setFile(selectedFile);
          onFileSelect?.(selectedFile);
          // Do something with the files
        }, [onFileSelect])
        const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop, multiple: false, accept:{'application/pdf': ['.pdf']}, maxSize: maxFileSize,})
          const currentFile = acceptedFiles[0] || file || null;
        return (
          <div className='w-full gradient-border mr-180'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
          <div className='space-y-4 cursor-pointer align-center '>
         
               {file ?(
                    <div className='uploader-selected file' onClick={(e)=>e.stopPropagation()}>

                    <div className='flex items-center space-x-3'>
                          <img src="/images/pdf.png" className='size-10'/>
                          <div>
                          <p className='text-sm text-gray-700 font-medium truncate max-w-xs'> {file.name}</p>
                        <p className='flex items-center  space-x-3text-sm text-gray-500'>
                        
                         {formatSize(file.size)}
                        </p>
                              </div>
                         
                         </div>
                         <button className='p-2 cursor-pointer' onClick={(e)=>{
                              onFileSelect?.(null)
                         }}>
                              <img src="/icons/cross.svg" className='w-4 h-4'/>
                         </button>
                         </div>) :(
                              <div>
                                         <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
                    <img src="/icons/info.svg" className='size-20'/>
               </div>
                                   <p className='text-lg text-gray-500'>
                                        <span className='font-semibold'> Click to upload</span>
                                   </p>
                                   <p className='text-lg text-gray-500'>
                                        <span className='font-semibold'>PDF (max {formatSize(maxFileSize)})</span>
                                   </p>
                                   </div>
                         )
                    }
               </div>
          </div>
          </div>
  )
}

export default FileUploader
