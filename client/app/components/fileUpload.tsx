// app/components/resume-analyzer/FileUpload.tsx

import { Upload, FileText } from 'lucide-react';
import { FileUploadProps } from '../types/resume';

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  dragActive,
  onDrag,
  onDrop,
  onFileChange,
}) => {
  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={onFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

      {file ? (
        <div className="flex items-center justify-center mb-4">
          <FileText className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">{file.name}</span>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Drag & drop your resume here
          </h3>
          <p className="text-gray-500 mb-4">or click to browse files</p>
        </>
      )}

      <p className="text-sm text-gray-400">
        Supported formats: PDF, DOC, DOCX, TXT
      </p>
    </div>
  );
};