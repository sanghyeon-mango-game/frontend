import { MANGO_TYPES } from '../data/MangoData';

export const MANGO_DROP_RATE = 0.05; 

export const checkMangoDropAndGet = () => {
  const shouldDropMango = Math.random() < MANGO_DROP_RATE;
  
  if (!shouldDropMango) return null;
  
  const rand = Math.random();
  let probabilitySum = 0;
  
  for (const mango of Object.values(MANGO_TYPES)) {
    probabilitySum += mango.probability;
    if (rand <= probabilitySum) {
      return mango;
    }
  }
  
  return MANGO_TYPES.GREEN;
};