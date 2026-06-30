"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { assetUrl, uploadImage } from "@/lib/api";
import { Icon } from "@/components/ui/Icon";

interface ImageUploadFieldProps {
  label: string;
  value: string; // stored path/url
  onChange: (url: string) => void;
}

/**
 * Upload an image (or paste a URL). On file select it uploads to the backend
 * and stores the returned path; a live preview is shown.
 */
export function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="mb-2 block text-label-md font-medium text-on-surface">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-outline-variant/40 bg-surface-container">
          {value ? (
            <Image
              src={assetUrl(value)}
              alt="preview"
              fill
              sizes="64px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-on-surface-variant">
              <Icon name="person" className="text-2xl" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-primary px-4 py-2 text-label-md font-bold text-primary hover:bg-surface-container disabled:opacity-60"
          >
            <Icon name={uploading ? "progress_activity" : "upload"} className={uploading ? "animate-spin text-lg" : "text-lg"} />
            {uploading ? "Uploading..." : value ? "Replace photo" : "Upload photo"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="w-fit text-label-sm font-medium text-error hover:underline"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {error && <p className="mt-2 text-label-sm text-error">{error}</p>}
    </div>
  );
}
