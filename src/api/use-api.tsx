import axios, { AxiosError } from "axios";
import { useContent } from 'content/content-context';
import CryptoJS from 'crypto-js';
import { useKey } from 'key/key-context';
import pako from 'pako';
import { useCallback, useState } from "react";

export interface GetContentType {
  error: AxiosError | null;
  isLoading: boolean;
  getContent: (url: string) => Promise<void>;
}

export const useGetContent = (): GetContentType => {
  const keyContext = useKey();
  const contentContext = useContent();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getContent = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await axios.get<string>("/s3");
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
  }, [keyContext, contentContext]);

  return { error, isLoading, getContent };
}

export interface SaveContentType {
  error: AxiosError | null;
  isLoading: boolean;
  saveContent: () => Promise<void>;
}

export const useSaveContent = (): SaveContentType => {
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
  }, [keyContext, contentContext]);

  return { error, isLoading, saveContent };
}

const compressText = (uncompressed: string) => {
  const textBytes = new TextEncoder().encode(uncompressed);
  const compressed = pako.deflate(textBytes);
  const binaryString = compressed.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
  return btoa(binaryString);
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
