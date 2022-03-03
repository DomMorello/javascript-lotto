import LottoController from '../controller/lottoController';
import {
  isThousandMultiple,
  isValidMoneyRange,
  isDuplicatedLottos,
} from '../controller/validator';
import Lotto from '../model/Lotto';
import { LOTTO_DIGIT } from '../model/constants';
import { $ } from '../utils/dom';

describe("금액 테스트", () => {
  const MIN_MONEY = 1000;
  const MAX_MONEY = 10000;

  it("입력된 금액은 1000원으로 나누어 떨어져야 한다.", () => {
    expect(isThousandMultiple(1000)).toBeTruthy();
  });

  it("입력된 금액은 1000원 이상 10000원 이하여야 한다.", () => {
    expect(isValidMoneyRange(9000)).toBeTruthy();
  });
});

describe('랜덤 숫자 테스트', () => {
  it('랜덤 숫자는 중복되지 않는 6개의 숫자이다', () => {
    const lotto = new Lotto();

    expect(new Set([...lotto.lottoNumbers]).size).toBe(LOTTO_DIGIT);
  });
});

describe('당첨 번호 입력값 테스트', () => {
  it('당첨 번호 입력값은 값이 중복되어서는 안 된다', () => {
    const duplicatedLotto = [3,13,16,36,25,41,41];

    expect(isDuplicatedLottos(duplicatedLotto)).toBeTruthy();
  });
});

describe('결과 확인 테스트', () => {  
  it('나의 로또와 당첨 로또의 숫자가 몇 개 일치하는지 확인할 수 있다', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const controller = new LottoController();
      controller.winningLottos = [4,15,25,36,41,27,33];
      const fourMatchedLotto = [4,15,25,36,42,43];
  
      expect(controller.getHowManyMatched(fourMatchedLotto)).toBe(4);
    });
  });

  it('3등에 당첨된 로또의 개수를 구할 수 있어야 한다', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const controller = new LottoController();
      controller.winningLottos = [4,15,25,36,41,27,33];

      const thirdPlaceLotto = new Lotto();
      thirdPlaceLotto.lottoNumbers = [4,15,25,36,41,1,2];
      controller.lottos = thirdPlaceLotto;
  
      controller.saveMatchedCount();
      expect(controller.getWinnerStatistic()).toBe([0,0,1,0,0]);
    });
  });

  it('1등과 2등에 당첨된 로또의 개수를 구할 수 있어야 한다', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const controller = new LottoController();
      controller.winningLottos = [4,15,25,36,41,27,33];

      const secondPlaceLotto = new Lotto();
      secondPlaceLotto.lottoNumbers = [4,15,25,36,41,33];

      const firstPlaceLotto = new Lotto();
      firstPlaceLotto.lottoNumbers = [4,15,25,36,41,27];

      controller.lottos = [firstPlaceLotto, secondPlaceLotto];
      controller.saveMatchedCount();

      expect(controller.getWinnerStatistic()).toBe([0,0,0,1,1]);
    });
  });

  it('수익률을 구할 수 있어야 한다', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const controller = new LottoController();
      controller.winningLottos = [4,15,25,36,41,27,33];

      const fifthPlaceLotto = new Lotto();
      fifthPlaceLotto.lottoNumbers = [4,15,25,1,2,3];

      const fourthPlaceLotto = new Lotto();
      fourthPlaceLotto.lottoNumbers = [4,15,25,36,1,2];

      controller.lottos = [fifthPlaceLotto, fourthPlaceLotto];
      controller.saveMatchedCount();
      
      $('.money-input').value = 1000;
      const winnerStatistic = controller.getWinnerStatistic();

      expect(controller.getEarningsRate(winnerStatistic)).toBe(540);
    });
  });
});
