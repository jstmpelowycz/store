import {genSalt, hash, compare} from 'bcrypt';

const SALT_ROUNDS = 10;

const generateSalt = async () => {
  return genSalt(SALT_ROUNDS);
};

const encode = async (value: string): Promise<string> => {
  const salt = await generateSalt();

  return hash(value, salt);
};

const comparePasswords = async (
  attemptPassword: string,
  validPasswordHash: string,
): Promise<boolean> => {
  return compare(attemptPassword, validPasswordHash);
}

export const bcryptClient = {
  encode,
  comparePasswords,
};
