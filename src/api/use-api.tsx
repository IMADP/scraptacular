import axios, { AxiosError } from "axios";
import { useContent } from 'content/content-context';
import CryptoJS from 'crypto-js';
import { useKey } from 'key/key-context';
import pako from 'pako';
import { useCallback, useState } from "react";

export interface GetContentResponse {
  error: AxiosError | null;
  isLoading: boolean;
  getContent: (url: string) => Promise<void>;
}

export const useGetContent = (): GetContentResponse => {
  const keyContext = useKey();
  const contentContext = useContent();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getContent = useCallback(async (url: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await axios.get<string>(url);
      const encrypted = response.data;
      const compressed = decryptText(encrypted, keyContext.key.password);
      const content = decompressText(compressed);
      contentContext.setContent(content);
      setError(null);
    }
    catch (err) {
      setError(err as AxiosError);
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  return { error, isLoading, getContent };
}

export interface SaveContentResponse {
  error: AxiosError | null;
  isLoading: boolean;
  saveContent: () => Promise<void>;
}

export const useSaveContent = (): SaveContentResponse => {
  const keyContext = useKey();
  const contentContext = useContent();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveContent = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const compressed = compressText(contentContext.content);
      const encrypted = encryptText(compressed, keyContext.key.password);
      await axios.post("/s3", encrypted);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, isLoading, saveContent };
}

const compressText = (uncompressed: string) => {
  const textBytes = new TextEncoder().encode(uncompressed);
  const compressed = pako.deflate(textBytes);
  return Buffer.from(compressed).toString('base64');
};

const decompressText = (compressed: string) => {
  const compressedBinary = Uint8Array.from(atob(compressed), (c) => c.charCodeAt(0));
  const decompressedBinary = pako.inflate(compressedBinary);
  const decoder = new TextDecoder();
  return decoder.decode(decompressedBinary);
};

const encryptText = (unencrypted: string, password: string) => {
  return CryptoJS.AES.encrypt(unencrypted, password).toString();
}

const decryptText = (encrypted: string, password: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}
