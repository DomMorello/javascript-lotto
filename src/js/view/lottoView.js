import { $$, $ } from '../utils/dom';
import { closeModal } from './modalView';

const hideResultElements = () => {
  const lottoGrid = $('.lotto-grid');
  lottoGrid.innerHTML = '';
  lottoGrid.classList.remove('lotto-grid-detail');
  $$('.result').forEach(element => element.classList.add('d-none'));
  $('.inform-text').remove();
  $('.cm-toggle').checked = false;
}

const activateForm = () => {
  $('.money-input').removeAttribute('disabled');
  $('.purchase-button').removeAttribute('disabled');
};

const resetInputValue = () => {
  $('.money-input').value = '';
  $$('.winning-numbers').forEach(element => element.value = '');
}

export const resetView = () => {
  closeModal();
  hideResultElements();
  activateForm();
  resetInputValue();
};

const showNumberOfLottos = (length) => {
  const template = `<span class="inform-text">총 ${length}개를 구매하였습니다.</span>`;
  $('.purchase-status-container').insertAdjacentHTML('afterbegin', template);
}

const showResultElements = () => {
  $$('.result').forEach(element => element.classList.remove('d-none'));
}

const showLottoImage = (lottos) => {
  const template = lottos.map(lotto => 
    `<div class="lotto-img">
      🎟️<span class="lotto-number-detail d-none">${lotto.lottoNumbers.join(', ')}</span>
    </div>`).join('');
  $('.lotto-grid').insertAdjacentHTML('beforeend', template);                        
}

export const toggleNumberDetail = () => {
  const lottoGrid = $('.lotto-grid');

  lottoGrid.classList.toggle('lotto-grid-detail');
  $$('.lotto-number-detail').forEach(element => {
    element.classList.toggle('d-none');
  });
}

const deactivateForm = () => {
  $('.money-input').setAttribute('disabled', true);
  $('.purchase-button').setAttribute('disabled', true);
}

export const showResult = (lottos) => {
  deactivateForm();
  showResultElements();
  showNumberOfLottos(lottos.length);
  showLottoImage(lottos);
}
