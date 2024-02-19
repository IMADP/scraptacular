import axios, { AxiosError } from "axios";
import { useContent } from 'content/content-context';
import CryptoJS from 'crypto-js';
import { useKey } from 'key/key-context';
import pako from 'pako';
import { useCallback, useState } from "react";

const VITE_S3_GET_URL = "https://hgw77fedca.execute-api.us-east-1.amazonaws.com/default/getS3File";
const VITE_S3_PUT_URL = "https://uuyfng1frf.execute-api.us-east-1.amazonaws.com/default/putS3File";

export interface GetContentType {
  error: AxiosError | null;
  isLoading: boolean;
  getContent: () => Promise<void>;
}

export const useGetContent = (): GetContentType => {
  const keyContext = useKey();
  const contentContext = useContent();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getContent = useCallback(async (): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      const name = encryptTextDeterministic(keyContext.key.name, keyContext.key.password);
      const response = await axios.post(VITE_S3_GET_URL, { name });
      const getS3Url = response.data.url;

      const s3Response = await axios.get(getS3Url);
      const encrypted = s3Response.data;
      const compressed = decryptText(encrypted, keyContext.key.password);
      const content = decompressText(compressed);
      contentContext.setContent(content);
      setError(null);
    }
    catch (err) {
      console.log(err);
      setError(err as AxiosError);
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
    setError(null);
    setIsLoading(true);

    try {
      const name = encryptTextDeterministic(keyContext.key.name, keyContext.key.password);
      const response = await axios.post(VITE_S3_PUT_URL, { name });
      const addS3Url = response.data.url;

      const compressed = compressText(contentContext.content);
      const encrypted = encryptText(compressed, keyContext.key.password);

      await axios.put(addS3Url, encrypted, {
        headers: {
          'Content-Type': 'text/plain'
        },
      });

      setError(null);
    } catch (err) {
      console.log(err);
      setError(err as AxiosError);
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

const encryptTextDeterministic = (unencrypted: string, password: string) => {
  // this isn't really secure but we just want to encrypt the name deterministically
  const fixedIv = CryptoJS.enc.Utf8.parse('hH05^8OTbyL');
  const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Utf8.parse('y26a6jh!JML'), { keySize: 256 / 32, iterations: 1000 });
  return CryptoJS.AES.encrypt(unencrypted, key, { iv: fixedIv, mode: CryptoJS.mode.CBC }).toString();
}

const decryptText = (encrypted: string, password: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}
