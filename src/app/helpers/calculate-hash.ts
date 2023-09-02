import crypto from 'crypto';

export const calculateHash = (data: any): string => {
  const md5 = crypto.createHash('md5');
  return md5.update(JSON.stringify(data)).digest('hex');
};
