import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useQueryClient } from '@tanstack/react-query';
import { initUpload, completeUpload, uploadToSignedUrl } from '../services/uploadService';

export default function UploadZone({ folderId }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const queryClient = useQueryClient();

  const uploadFile = async (file) => {
    setUploading(true);
    setProgress(0);
    setFileName(file.name);
    try {
      const initRes = await initUpload(file.name, file.type);
      const { uploadUrl, storageKey } = initRes.data;

      await uploadToSignedUrl(uploadUrl, file, setProgress);

      await completeUpload(file.name, storageKey, file.type, file.size, folderId ?? null);

      queryClient.invalidateQueries({ queryKey: ['folder', folderId ?? 'root'] });
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed. Check the console for details.');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition mb-4 ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div>
          <p className="text-sm text-slate-600 mb-2">Uploading {fileName}...</p>
          <div className="w-full bg-slate-200 rounded-full h-2 max-w-xs mx-auto">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">{progress}%</p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          {isDragActive ? 'Drop the file here...' : 'Drag & drop a file here, or click to select'}
        </p>
      )}
    </div>
  );
}