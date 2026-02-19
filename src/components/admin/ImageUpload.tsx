"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  bucket = "uploads",
  folder = "team",
  label = "Photo",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    setUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    onChange(urlData.publicUrl);
    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{label}</h3>

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-maxx-700"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            dragOver
              ? "border-maxx-accent bg-maxx-accent/5"
              : "border-maxx-700 hover:border-maxx-accent/50 bg-maxx-800/50"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-maxx-accent animate-spin mb-2" />
              <p className="text-maxx-300 text-sm">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-maxx-400 mb-2" />
              <p className="text-maxx-300 text-sm">Click or drag to upload</p>
              <p className="text-maxx-500 text-xs mt-1">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="mt-3 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-maxx-800 border border-maxx-700 hover:border-maxx-accent/50 rounded-lg text-maxx-300 text-sm transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          <span>{uploading ? "Uploading..." : "Replace image"}</span>
        </button>
      )}
    </div>
  );
}
