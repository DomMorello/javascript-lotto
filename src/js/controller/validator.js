import { MONEY_INPUT } from './constants';

export const isThousandMultiple = money => money % MONEY_INPUT.MIN_PRICE === 0;

export const isOverThouand = money => money >= MONEY_INPUT.MIN_PRICE;

export const isUnderTenThousand = money => money <= MONEY_INPUT.MAX_PRICE;

export const isValidMoneyRange = money => isOverThouand(money) && isUnderTenThousand(money);

export const isValidMoneyInput = money => {
  return isThousandMultiple(money) && 
         isValidMoneyRange(money);
}