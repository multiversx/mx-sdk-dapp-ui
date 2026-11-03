import type { IDataHightlight } from '../SignTransactionsAdvancedData';

interface IGetProcessedHighlightedData {
  data: string;
  highlightedData: string;
  occurrence?: number;
}

const getOccurrenceIndex = (data: string, text: string, occurrence: number) => {
  let index = data.indexOf(text);

  for (let found = 0; found < occurrence && index !== -1; found++) {
    index = data.indexOf(text, index + 1);
  }

  return index === -1 ? data.indexOf(text) : index;
};

export const getProcessedHighlightedData = ({
  data,
  highlightedData,
  occurrence = 0,
}: IGetProcessedHighlightedData): IDataHightlight => {
  const highlightIndex = getOccurrenceIndex(data, highlightedData, occurrence);
  const beforeHighlight = data.slice(0, highlightIndex);
  const highlight = data.slice(highlightIndex, highlightIndex + highlightedData.length);
  const afterHighlight = data.slice(highlightIndex + highlight.length);

  return {
    beforeHighlight,
    highlight,
    afterHighlight,
  };
};
